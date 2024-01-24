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

module.exports = {
    getUserDetails,
}