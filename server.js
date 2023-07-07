//database structure
//username
//Firstname
//Lastname
//password
//email
//exporting the modules
const express = require('express'); //express
const sql = require('mysql2'); //mysql2
const nodemailer = require('nodemailer'); //for sending emails
const path = require('path');//path module
//creating the instances
const app = express(); //express instances
const pool = sql.createPool({  // creating a pool
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'users',
  connectionLimit : 10
});
//using middleware for all routes using app.use()
//using express.urlencode(); to extract data from request urls
app.use(express.urlencoded({extended:false})); //using false because we are not sending complex data
//creating routes
//siginup
app.get('/signup',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'signup.html'));
})
//login
app.get('/login',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'login.html'));
})
//homepage
app.get('/',(req,res)=>{
  res.send('<h1>Homepage!</h1>')
});
//signup
app.post('/signup',(req,res)=>{
  const username = req.body.username;
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const password = req.body.password;
  const email = req.body.email;
  if(username && fname && lname && password && email){
    pool.getConnection((err,connection)=>{
      if(err) throw err;
      const q = `INSERT INTO logininfo VALUES('${username}','${fname}','${lname}','${password}','${email}');`
      connection.query(q,(err,result)=>{
        if(err) throw err;
        //sending email
        //creating a transporter object
        const transporter = nodemailer.createTransport({
          service : 'gmail',
          auth : {
            user : 'mywebsitenoreply0@gmail.com',
            pass : 'mvgswoqtfzupoynt'
          } 
        });
        //defining email options
        const mailOptions = {
          from: 'mywebsitenoreply0@gmail.com',
          to: email,
          subject: 'Thank you for creating an account!',
          html: `<p>Dear ${fname},</p>
                 <p>Thank you for creating an account on our website. We appreciate your support and look forward to serving you!</p>
                 <p>Here are the details you provided:</p>
                 <ul>
                   <li>Username: ${username}</li>
                   <li>First Name: ${fname}</li>
                   <li>Last Name: ${lname}</li>
                   <li>Email: ${email}</li>
                 </ul>
                 <p>Please remember your username and password. You must log in using your username and password. Do not share your credentials with anyone. This is a computer-generated email; please do not reply to this message. If you encounter any issues or have any questions, please contact us at avinashgalanki04@gmail.com.</p>
                 <p>Thank you once again, and have a great day!</p>`
        };                
        //sending mail
        transporter.sendMail(mailOptions,(err,info)=>{
          if(err) {
            console.log('Error : ',err)
          }else{
            console.log('Email sent : ',info.response);
          }
          
        });
        console.log('account created!');
        res.send(`<h1>Account created ${fname} ;)</h1>`);
        connection.release();
      })
    })
  }
});
//login
app.post('/login',(req,res)=>{
  const username = req.body.username;
  var un = username;
  const password = req.body.password;
  if(username && password){
    pool.getConnection((err,connection)=>{
      const q = `SELECT username,password,firstname FROM logininfo WHERE username='${username}';`;
      if(err) {throw err};
      connection.query(q,(err,result1)=>{
        if(err) throw err;
        if(result1.length === 0){
          res.send('<h1>No such user found ;(</h1>');
        }else if(password !== result1[0].password){
          res.send(`<h1>Please enter correct password ${result1[0].firstname}!</h1>`)
        }else if(username === result1[0].username && password === result1[0].password){
          console.log(result1);
          res.send(`<h1>Welcome ${result1[0].firstname}!</h1>`);
        }
      })
    })
  }
})
//setting upthe server using app.listen();
app.listen(7777,()=>{
  console.log('server is coonected!');
})
//
