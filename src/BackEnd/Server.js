// Require all the packages needed.
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Create the instances.
const app = express();
const PORT = 3000;

// Creating the middlewares
app.use(cors())
app.use(bodyParser.json())

// Creating the database connection 
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root12',
    database: 'userdetails'
})

// After creating the connection now connecting
database.connect((error)=>{
    if(error)
    {
       console.error("Database connection Failed" , error)
       return;
    }
    else
    {
        console.log("MySQL Databse is Successfully Connected");   
    }
})

// Creating the required routings for both the login and Signup
// Creating the routing for signup page
app.post('/Signup' , (req , res)=>{

    const{username , employeeId , email , password , department , role} = req.body;

    // Hashing the password field
    bcrypt.hash(password ,8 , (error , hash)=>{
        if(error)
        {
            return res.status(500).send("Error Occured")
        }
        const sql = `INSERT INTO users (username , employeeId , email , password , department , role) VALUES (?, ?, ? ,? ,?, ?)`;
        database.query(sql , [username , employeeId , email ,hash , department , role],(error,re)=>{
            if(error)
                {
                    console.error(error);
                    return res.status(500).send("Database have some error")
                }
                else
                {
                    res.send({
                        message: "User Registered successfully",
                    })
                }
        });
       
    });
});

// Creatintg the Login Route for the users
app.post('/Login' , (req,res)=>{
    const {email , password} = req.body;
    database.query('SELECT * FROM users WHERE email =?',[email] ,(error , result)=>{
        if(error)
        {
            return res.status(500).send('Error Occured in the Database');
        }
        if(result.length === 0 )
        {
            return res.status(401).send('User not Found')
        }

        const user = result[0];
        console.log(user);
        
        bcrypt.compare(password ,user.password , (error,isMatch)=>{
            if(error)
            {
                return res.status(500).send("Error Occured")
            }
            if(!isMatch)
            {
                return res.status(401).send("Incorrect Password")
            }

            res.send({
                message:"Login Successful", 
                role :user.role
            })
        })
    })
})

// Starting the server using .listen
app.listen(PORT , ()=>{
    console.log(`The BackEnd Server is running at ${PORT} `);
    
})