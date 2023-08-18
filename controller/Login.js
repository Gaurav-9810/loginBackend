const Student= require('../models/Student');
const bcrypt =require( "bcrypt");
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();


const Register=(req,res)=>{
     const SECRET_KEY=process.env.SECRET_KEY;

     console.log("heelo");

     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(req.body.password, salt);
  
      const {firstName,lastName,userName,email,password}=req.body;
      console.log(req.body)

       const newStudent=new Student({
          
               ...req.body,
               password: hash,
             
       })

       newStudent.save()
       const token = jwt.sign(  newStudent._id , SECRET_KEY, { expiresIn: '1h' });

       res.status(200).json({id : newStudent._id,token: token})
       

}


const login=async(req,res)=>{
     const SECRET_KEY=process.env.SECRET_KEY;
     const{email , password} =req.body;
     const foundStudent=await Student.findOne({email});
     // Student.findOne({ email: email })
     //           .then(foundStudent => {
               if (foundStudent) {
                    const isPasswordCorrect = await bcrypt.compare(
                         req.body.password,
                         foundStudent.password
                         );
                         
                         if(!isPasswordCorrect){
                            return res.status(401).json({error:'password is wrong '});  
                           
                         }
                         const token = jwt.sign({ studentId: foundStudent._id }, SECRET_KEY, { expiresIn: '1h' });
                         return res.status(200).json({id : foundStudent._id,token: token}); 
                      
               } else {
                    // No user found with the given email
                    return res.status(401).json({error:'email not found '}); 
               }
              

}

module.exports= {Register, login};

