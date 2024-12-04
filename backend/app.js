const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
PORT=5000;

const userRoute=require('./Routes/userRoute');
const candidateRoutes = require('./Routes/candidateRoute'); 



require("./DB/connection");


// Create uploads directory if it doesn't exist



const app=new express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/users',userRoute);
app.use('/api/candidates', candidateRoutes);


app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})