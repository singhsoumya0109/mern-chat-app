// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const generateToken = require("../config/generateToken");

// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, pic } = req.body;

//     if (!name || !email || !password) {
//         res.status(400);
//         throw new Error("Please enter all the details");
//     }


//     const userExists = User.findOne({ email });

//     if (userExists) {
//         res.status(400);
//         throw new Error("Email already registered");
//     }

//     const user = User.create({
//         name,
//         email,
//         password,
//         pic,
//     });

//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id),
//         });
//     }
//     else {
//         res.status(400);
//         throw new Error("User can't be created");
//     }

// });


// module.exports = { registerUser };


const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the details");
  }

  // Check if the email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User can't be created");
  }
});


const authUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });


    if (user && (await user.matchPassword(password)))
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    }
    else
    {
         res.status(400);
    throw new Error("Incorrect details");
        }
})

module.exports = { registerUser ,authUser};
