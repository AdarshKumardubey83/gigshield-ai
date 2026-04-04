import User from '../models/User.js';

export const verifyOrCreateUser = async (firebaseUid, phoneNumber) => {
  // Check if user exists by either firebaseUid or phoneNumber
  let user = await User.findOne({ 
    $or: [{ firebaseUid }, { phoneNumber }] 
  });

  // If new user, create them
  if (!user) {
    user = await User.create({
      firebaseUid,
      phoneNumber,
    });
  } else if (user.firebaseUid !== firebaseUid) {
    // If user exists but with different firebaseUid (e.g. switching between mock and real), update it
    user.firebaseUid = firebaseUid;
    await user.save();
  }

  return user;
};

export const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};
