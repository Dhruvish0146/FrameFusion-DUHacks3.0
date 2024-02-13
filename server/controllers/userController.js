const { User } = require("../models/UserModel");

const getUserDetails = async(req,res) => {
    try {
        const userId = req.params.userId;
        console.log(req.params.userId)
        const user = await User.findById({_id : userId}).select('-password');
        if (!user) return res.status(404).json({ message: "Artist not found" });

        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { email, phoneNumber, address, name } = req.body;

        const user = await User.findOne({ email }).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (address) user.address = address; // corrected typo
        if (name) user.name = name;

        await user.save();

        res.status(200).json({ message: "User details updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getUserDetails,
    updateUserDetails,
    
}