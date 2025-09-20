//**Package imports**//
const express = require("express");
const mongoose = require("mongoose");

//**Other file imports**//
const authRouter = require('./routes/auth');
const adminRouter = require("./routes/admin");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
//**init**
//**Port**
const PORT = 3000;
//**Express Intialize**//
const app = express();

const DB = "mongodb+srv://souravmitra93:Sourav123@cluster0.bjm1ctd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


//**middleware**//
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);


//** Database Connection */
mongoose.connect(DB).then(() => {
    console.log('Connection Successfull');
}).catch(e => {
    console.log(e);
});

//**Connection Checker**//
app.listen(PORT, "0.0.0.0" ,function () {
    console.log(`Connected at port: ${PORT}`);
});