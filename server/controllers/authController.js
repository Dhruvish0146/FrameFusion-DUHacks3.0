const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const _ = require("lodash");
const Joi = require("joi");
const { Artist, validateArtist } = require("../models/ArtistModel");
const {User, validateUser} = require("../models/UserModel");

require("dotenv").config();


// Register User
const registerUser = async (req,res) => {
    const {error} = validateUser(req.body);
    if(error)   return res.status(400).send(error.message[0].details); 

    let user = await User.findOne({email:req.body.email});
    if(user)    return res.status(400).send("User alreay registered.");

    let artist = await Artist.findOne({email: req.body.email});
    if (artist) return res.status(400).send("Artist is registered with same email")

    const {
        name,
        email,
        password,
        phoneNumber,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);

    const newUser = new User({
        name,
        email,
        password: passwordHash,
        phoneNumber,
    })
    await newUser.save();
    res.send(_.pick(newUser,['_id','name','email']));
} 


const registerArtist = async (req,res) => {
    const {error} = validateArtist(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //validating whether artist is already registered or no
    let artist = await Artist.findOne({email: req.body.email});
    if (artist) return res.status(400).send("Artist alreay registered.")

    //validating whether some user have this email
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User is registered with same email");

    //if artist is not already registered
    const {
        artistId,
        name,
        email,
        password,
        phoneNumber,
    } = req.body;
     
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password,salt);

    const newArtist = new Artist({
        artistId,
        name,
        email,
        password: passwordHash,
        phoneNumber,
    })

    await newArtist.save();

    
    // res.send(newArtist);
    res.send(_.pick(newArtist,['_id','artistId','email']));

    // const token = artist.generateAuthToken();
    // res.header('x-auth-token',token).send(_.pick(newArtist,['_id','artistId','email']));
} 

// logging in 
const loginArtist = async (req, res) =>{
    try{
        const {error} = validateLogin(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        const artist = await Artist.findOne({ email: req.body.email }).select('+password');
        if (!artist) return res.status(400).json({ msg: "Invalid email or password"});
    
        const isMatch = await bcrypt.compare(req.body.password , artist.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid email or password"});

        const token = artist.generateAuthToken();

        const sanitizedArtist = {
            _id: artist._id,
            artistId: artist.artistId,
            name: artist.name,
            email: artist.email,
            phoneNumber: artist.phoneNumber,
            bio: artist.bio,
            picturePath: artist.picturePath,
            arts: artist.artIds,
            registeredAt: artist.registeredAt,
        };
        // console.log(artist)

        res.status(200).json({ token, user: sanitizedArtist });

        
    }catch(err){
        console.log(err);
    }
}

const loginUser = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ msg: "Invalid email or password" });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

        let token;
        if (user.isAdmin === false) {
            token = jwt.sign({ _id: user._id, actor: false }, process.env.JWT_SECERT);
        } else if (user.isAdmin === true) {
            token = jwt.sign({ _id: user._id, actor: true }, process.env.JWT_SECERT);
        } else {
            return res.status(400).json({ msg: "Invalid user role" }); // Handle unknown user roles
        }

        const sanitizedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            orders: user.orders,
            address: user.address
        };

        res.status(200).json({ token, user:sanitizedUser });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server Error" }); // Handle server errors
    }
}


const resetPassword = async (req,res) => {
    try{
        const {_id , currentPassword, newPassword} = req.body;
        // console.log(_id);
        const user = await User.findById(_id);
        if(user){
            const isMatch = await comparePass(currentPassword,user.password);
            if(!isMatch) return res.status(400).json({msg: "Invalid password"});

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newPassword,salt);

            user.password = passwordHash;
            await user.save();

            return res.status(200).json({ message: 'Password reset for user.' });
        }

        const artist = await Artist.findById(_id);
        if(artist){
            const isMatch = await comparePass(currentPassword,artist.password);
            if(!isMatch) return res.status(400).json({msg: "Invalid email or password"});

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newPassword,salt);

            artist.password = passwordHash;
            await artist.save();

            return res.status(200).json({ message: 'Password reset for artist.' });
        }

        return res.status(404).json({ message: ' not found.' });
    }
    catch(err){
        console.log(err);
    }
}

function validateLogin(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req);
}
async function comparePass(pass,encrptedPass){
    const isMatch = await bcrypt.compare(pass , encrptedPass);
    console.log(isMatch);
    return isMatch;
    
}

module.exports = {
    registerArtist,
    registerUser,
    loginArtist,
    loginUser,
    resetPassword,
  };