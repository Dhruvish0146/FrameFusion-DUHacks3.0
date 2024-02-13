const { Artist } = require("../models/ArtistModel");


const getArtistDetails = async (req, res) => {
  try {
    const artistId = req.params.artistId; // assuming artistId is a string
    const artist = await Artist.findById(artistId).select('-password');

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    
    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateArtist = async (req,res) => {
    try {
        const {artistId , email, phoneNumber, bio , picturePath ,name} = req.body;

        const artist = await Artist.findById(artistId).select('-password');
        if(!artist) return res.status(404).json({message: "Artist not found"});

        if(email) artist.email = email;
        if(phoneNumber) artist.phoneNumber= phoneNumber;
        if(bio) artist.bio = bio;
        if(name) artist.name = name;
        if(picturePath) artist.picturePath=picturePath;

        await artist.save();

        res.status(200).json({artist,message: "Artist updated successfully"});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    getArtistDetails,
    updateArtist
};
