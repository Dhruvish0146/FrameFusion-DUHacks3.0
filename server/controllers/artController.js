const Art = require("../models/ArtModel");
const { Artist } = require("../models/ArtistModel");
const moment = require("moment");

//create
const createArt = async (req, res) => {
    try {
        const { artistId, name, artPath, price, size, category } = req.body;
        const artist = await Artist.findOne({ artistId });
        if(!artist) return res.status(404).json({message: "Artist not found"});

        const newArt = new Art({
            artistId,
            name,
            category,
            price,
            size,
            artPath,
        });
        const date = new Date();
        newArt.createdAt = moment(date).format("LL");
        await newArt.save();
        
        artist.arts.push(newArt._id);
        await artist.save();

        res.status(201).json(newArt);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};
const getArts = async (req, res) => {
    try {
        const arts = await Art.find();
        res.status(200).json(arts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getArt = async (req, res) => {
    try {
        const artId = req.params.artId;
        console.log(artId)
        const art = await Art.findById({_id: artId});
        if(!art)    return res.status(404).json({message:"Art not found"});

        res.status(200).json(art);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteArt = async (req,res) => {
    try {
        const artId = req.params.artId;
        // const art = await Art.findById({_id: artId});
        // if(!art)    return res.status(404).json({message: "Art not found"});

        await Artist.updateMany({ arts: artId }, { $pull: { arts: artId } });
        await Art.deleteOne({ _id: artId });

        res.status(200).json({ message: "Artwork deleted successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    createArt,
    getArts,
    getArt,
    deleteArt,
};
