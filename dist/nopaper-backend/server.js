const express=require("express"),bodyParser=require("body-parser"),config_dorenv=require("dotenv-safe").config(),jwt=require("jsonwebtoken");var cors=require("cors");const routes=require("./routes/routes"),app=express(),mongoose=require("mongoose");let url="mongodb://localhost:27017/smartphones";const uri="mongodb+srv://no-paper-api-dev:exgkhx9eqPxcLTI3@nopapaer.zvop4.mongodb.net/no-paper-dev?retryWrites=true&w=majority";let mongoDB=process.env.MONGODB_URI||uri;mongoose.Promise=global.Promise,mongoose.connect(mongoDB,{useNewUrlParser:!0,useCreateIndex:!0,useUnifiedTopology:!0,useFindAndModify:!1}).then(()=>{console.log("Server is up")}).catch(e=>{console.log(`MongoDB connection error. Problem with ${e.message}`),process.exit(-1)}),app.use(cors()),app.use(bodyParser.json()),app.use(bodyParser.urlencoded({extended:!0})),app.use("/",routes);let porto=process.env.PORT||8e3;app.listen(porto,()=>{});