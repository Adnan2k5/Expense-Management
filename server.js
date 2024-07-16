const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDb');
const bcrypt = require('bcrypt');
const router = require('./routes/userRoutes');
const userRouter = require("./routes/userRoutes");
const bodyParser = require('body-parser');
const TransactionRoutes = require("./routes/transactionRoutes");
const { editTransaction } = require('./controllers/transactionController');
//config

dotenv.config();


const app = express();
const port = process.env.PORT;


app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


//database
connectDb();


//user routes
app.post('/register',userRouter);
app.post('/login', userRouter);

//Transaction routes
app.post('/add', TransactionRoutes);
app.post('/get', TransactionRoutes);
app.post('/edit',TransactionRoutes)


app.listen(port, ()=>{
    console.log(`Server running on Port:${port}`);
})