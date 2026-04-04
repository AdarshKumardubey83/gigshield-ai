import Subscription from '../models/Subscription.js';

// @desc    Khareedi hui Subscription ko save karna (Dummy Test)
// @route   POST /api/subscription/add
// @access  Private (Sirf wahi kar sakte hain jo login hain)
export const addDummySubscription = async (req, res, next) => {
  try {
    const userId = req.user.id; // Yeh auth middleware se aayega
    const { planType, premiumAmount, coverageAmount } = req.body;

    // Plan sirf 7 din ke liye valid hota hai
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    // Database (Subscription Model) mein ticket banakar save karo
    const newPlan = await Subscription.create({
      user: userId,
      planType,
      premiumAmount,
      coverageAmount,
      status: 'active', // Razorpay nahi hai isliye default active maan rahe hain
      paymentStatus: 'paid', 
      startDate,
      endDate
    });

    res.status(201).json({
      success: true,
      message: 'Aapka Weekly Insurance Plan successful activate ho gaya hai!',
      data: newPlan
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Apni purani / active subscription check karna
// @route   GET /api/subscription/my-plan
// @access  Private
export const getMySubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Database mein check karo ki kya is user ka koi ACTIVE plan pichle 7 din me bana hai?
    const myPlan = await Subscription.findOne({
      user: userId,
      status: 'active',
      endDate: { $gt: new Date() } // Matlab: plan abhi expire nahi hua hai
    });

    if (!myPlan) {
      return res.status(404).json({
        success: false,
        message: 'Aapke paas filhal koi active insurance plan nahi hai.'
      });
    }

    res.status(200).json({
      success: true,
      data: myPlan
    });

  } catch (err) {
    next(err);
  }
};
