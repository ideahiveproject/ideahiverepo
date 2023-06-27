const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const userRoute=require('./routes/userRoute');
const ideaRouter=require('./routes/IdeaRoute')
const errorHandler=require('./middleware/errorMiddleware');
const cookieParser=require('cookie-parser');
const path=require('path');
const dotenv=require('dotenv').config();

const app=express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(cors());


const PORT=process.env.PORT;
const Mong_URI=process.env.MONG_URI;

//Error Middleware
app.use(errorHandler);

//connect to Mongodb
mongoose.connect(Mong_URI)
.then(()=>{
  app.listen(PORT,console.log(`server is running on port ${PORT}`));
}).catch((err)=>{console.log(err);}) 


//route middleware

app.use('/api/users',userRoute);
app.use('/api/ideas',ideaRouter);

app.get('/status',(req,res)=>{
    res.json({status:'OK'});
})
