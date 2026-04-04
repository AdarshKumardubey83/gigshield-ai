import User from '../models/User.js';

// @desc    Update user profile (Profile Completion API)
// @route   PUT /api/user/update
// @access  Private
export const updateProfileCompletion = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, platform, location, workerId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update only allowed fields if they are provided in the request body
    if (name) user.name = name;
    if (platform) user.platform = platform;
    if (workerId) user.workerId = workerId;
    
    if (location) {
      // Expecting location to be an object: { city, state, coordinates: { lat, lng } }
      user.location = {
        city: location.city || user.location?.city || '',
        state: location.state || user.location?.state || '',
        coordinates: {
          lat: location.coordinates?.lat || user.location?.coordinates?.lat || null,
          lng: location.coordinates?.lng || user.location?.coordinates?.lng || null,
        }
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
