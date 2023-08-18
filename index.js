const express = require('express');

const bodyParser=require('body-parser')
const dotenv=require('dotenv');
const mongoose =require('mongoose');
const cors = require('cors');

// const db = require('./db');
const router =require('./Routes/route');
// import router from './Routes/route';


dotenv.config(); // Load variables from .env into process.env


const app = express();
const port = process.env.PORT ;

app.use(cors())
app.use(bodyParser.json());


try {
  const connectionString = process.env.MONGO; // Use your environment variable here
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
   console.log('Connected to MongoDB');
} catch (error) {
     console.error('Error connecting to MongoDB:', error.message);
}

// app.use('/login',Login);
app.use('/api',router);


app.listen(port, () => {
     
      console.log(`Server is running on port ${port}`);
    });