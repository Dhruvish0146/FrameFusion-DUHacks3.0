const { Artist } = require("../models/ArtistModel");


const getArtistDetails = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        console.log(req.params.artistId)
        const artist = await Artist.findOne({ artistId: artistId }).select('-password');
        if (!artist) return res.status(404).json({ message: "Artist not found" });

        res.status(200).json(artist);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateArtist = async (req,res) => {
    try {
        const {artistId , email, phoneNumber, bio } = req.body;

        const artist = await Artist.findOne({artistId});
        if(!artist) return res.status(404).json({message: "Artist not found"});

        if(email) artist.email = email;
        if(phoneNumber) artist.phoneNumber= phoneNumber;
        if(bio) artist.bio = bio;

        await artist.save();

        res.status(200).json({message: "Artist updated successfully"});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    getArtistDetails,
    updateArtist
};
