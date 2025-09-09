const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const cors = require('cors');

//can also create a separate file for dbConnect and import that here
mongoose.connect('mongodb+srv://manveerdhaliwal033_db_user:hellooGMS502@cluster0.iwrboev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then( () => console.log("DB connected successfully")).catch( (error) => console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods : ['GET' , 'POST' , 'DELETE' , 'PUT'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`));