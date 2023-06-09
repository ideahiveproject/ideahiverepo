const asyncHandler=require('express-async-handler')
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const Token=require('../models/tokenModel');
const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');

//passport configuration 
passport.use(
  new LocalStrategy(async(userName,password,done)=>{
    try {
      const user=await User.findOne({userName});
      if(!user){
        return done(null,false,{message:'incorrect username'})
      }
      const isPasswordValid=await bcrypt.compare(passport,user.password);
      if (!isPasswordValid) {
        return done(null,false,{message:'incorrect password'});
      }

      return done(null,user);

    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
  try {
    const user=await User.findById(id);
    done(null,user);
  } catch (err) {
    done(err);
  }
});

//generate token id
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
};

//register user
const registerUser=asyncHandler(async(req,res)=>{
    const {fullName,userName,email,password,phone,role,companyName}=req.body;

    //validation
    if (!fullName||!userName||!email||!password||!phone) {
        res.status(400);
        throw new Error('please fill all required fields');
        
    }
    if(password.length<6){
        res.status(400);
        throw new Error('password must be at least 6 characters');
    }
    //check if user email exists
    const userExist=await User.findOne({email});

    if (userExist) {
        res.status(400);
        throw new Error('Email has already been registered');
    }

    //create new user
    const user=await User.create({
        fullName,
        userName,
        email,
        password,
        phone,
        role,
        companyName:role=== 'investor'?companyName:undefined,
        accountType:role==='investor'?'private':'public',
    });

    //generate Token
    const token=generateToken(user._id);
    
    //send http-only cookie
    res.cookie("token",token,{
        Path:'/',
        httpOnly:true,
        expires:new Date(Date.now()+1000*86400),
        sameSite:'none',
        secure:true
    });
    if(user){
        const {_id,fullName,
        userName,
        email,
        password,
        phone,companyName,role}=user;
        res.status(201).json({_id,fullName,
        userName,
        email,
        password,
        phone,
        token,
        role,
        companyName
    });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//login user
const loginUser=asyncHandler(async(req,res)=>{
    const{userName,password}=req.body;
    if(!userName||!password){
        res.status(400);
        throw new Error('Please add all the required fields');
    }
     const user = await User.findOne({userName });
  if (!user) {
    res.status(400);
    throw new Error("User not found , please sign up");
    
  }
  //check if the password is correct
  const passwordIsCorrect=await bcrypt.compare(password,user.password);

  //generate token
  const token= generateToken(user._id);

  if (passwordIsCorrect) {
    //send http-only cookie
    res.cookie("token",token,{
        path:'/',
        httpOnly:true,
        expires:new Date(Date.now()+1000*86400),
        sameSite:"none",
        secure:true,
    });
  }
  if (user&&passwordIsCorrect) {
    const {_id,fullName, userName,email,password,phone}=user;
        res.status(201).json({
            _id,
            fullName,
            userName,
            email,
            password,
            phone,
            token,
    });

  }else{
    res.status(400);
    throw new Error("invalid email or password");
  }
});

//Logout user
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

//get user data
const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if (user) {
           const {_id,fullName, userName,email,password,phone}=user;
             const token=generateToken(user._id);
        res.status(201).json({
            _id,
            fullName,
            userName,
            email,
            password,
            phone,
            token,
    });

  }else{
    res.status(404);
    throw new Error("user not found");
  }
    }) ;

//login status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

//Update user
const updateUser=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.user._id);

    if (user) {
          const {_id,fullName, userName,email,phone}=user; 
         user.email = email;
         user.fullName = req.body.fullName || fullName;user.userName = req.body.userName || userName;
         user.phone = req.body.phone || phone;

         const updatedUser=await user.save();
         res.status(200).json({
            _id: updatedUser._id,
            fullName:updatedUser.fullName,
            userName:updatedUser.userName,
            email:updatedUser.email,
            phone:updatedUser.phone
         });
        }else{
            res.status(404);
            throw new Error("user not found");
        }
    });

    const changePassword=asyncHandler(async (req,res)=>{
        const user=await User.findById(req.user._id);
        const {oldPassword,password}=req.body;

        if (!user) {
            res.status(400);
            throw new Error("user not found, please sign up");
         }
         
         //validate
         if (!oldPassword||!password) {
            res.status(400);
            throw new Error("please add old and new password");
         }

         //check if old password matches password in db
         const passwordIsCorrect=await bcrypt.compare(oldPassword,user.password);

         //save new password 
         if (user&&passwordIsCorrect) {
            user.password=password;
            await user.save();
            res.status(200).send("password change successful");
         }else{
            res.status(400);
            throw new Error("old password is incorrect");
         }
    });

    //forgot password
    const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>Pinvent Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});
    



module.exports = {
  registerUser,
  loginUser,
  logout,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};