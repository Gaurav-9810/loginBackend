const mongoose = require('mongoose');

// Define the schema with validation
const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
      type: String,
      required: true,
    },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures that the email is unique in the collection
    // You can add more validation here, like a custom validation function for email format
  },
  password:{
      type:String,
      required:true,

  },
  role: { 
    type: String,
     enum: ['user', 'admin'],
      default: 'user'
     }
  
});

// Create a model based on the schema
module.exports = mongoose.model('Student', StudentSchema);

