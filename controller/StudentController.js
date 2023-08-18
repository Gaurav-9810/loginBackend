// const { decode } = require('jsonwebtoken');
const { verifyToken } = require('../Hooks/jwtToken');
const Student= require('../models/Student');

const isAdmin = async(req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log("hello");
    const decoded = verifyToken(token);
    console.log(decoded);
    if(decoded==null){
     return res.redirect('/'); 

    }
    console.log("heelo");
    const id =decoded.studentId;
    console.log(id);
    const studentData = await Student.findById(id).exec();
    const role=studentData.role;   
    console.log(role);
    if (role === 'admin') {
      // User is an admin, allow access to the route
      next();
    } else {
      // User is not an admin, redirect to registration page
      return res.redirect('/'); // Replace with your registration page URL
    }
  } catch (error) {
    return res.status(500).json({ message: 'some error' });
  }
};





const getAllStudent=async(req,res)=>{

     
  
      try {
             
            const studentData = await Student.find().exec(); // Make sure the .exec() is used for the query execution
        
            // console.log(studentData);
        
            res.status(200).json(studentData);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while fetching student data." });
          }
       

}




const getOneStudent = async (req, res) => {

  const token = req.headers.authorization;
  const decoded = verifyToken(token);
  const id=decoded.studentId;
  const Sdata=await Student.findById(id).exec();
 const role=Sdata.role;
  if(id!=req.params.id&&role!='admin'){
    return res.status(401).json({ error: "unauthorized user" });
  }

      try {
        const studentId = req.params.id; // Get student ID from request parameters
        const studentData = await Student.findById(studentId).exec();
         
        if (!studentData) {
          return res.status(404).json({ error: "Student not found." });
        }
    
        res.status(200).json(studentData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching student data." });
      }
 };


 const getByEmail=async(req,res)=>{
   try{
       const studentEmail=req.params.email;
       const studentData=await Student.findOne({studentEmail});

       if (!studentData) {
        return res.status(404).json({ error: "Student not found." });
      }
  
      res.status(200).json(studentData);

   }
   catch(err){
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching student data." });
   }
 }

module.exports= {isAdmin,getAllStudent ,getOneStudent , getByEmail};