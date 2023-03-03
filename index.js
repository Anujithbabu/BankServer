// server creation 

// 1 import express 

const express = require('express')

// import daraservices
const dataservices = require('./services/data.service')

const cors = require('cors')

// 2 create an application using the express 

const app = express()

// to parse json from request body 
 app. use(express.json())


app.use (cors({
    origin:'http://localhost:4200'
}))

//import jwt

const jwt = require('jsonwebtoken')


// create a port number 

app.listen(3000,()=> {
    console.log('listening on port 3000');
})

//Application Specific Middleware
const appMiddleware =(req,res,next)=>{
    console.log('Application Specific Middleware');
    next();
}
app.use(appMiddleware)

//Router specific Middleware 
const jwtMiddleware = (req,res,next) =>{
try{

    console.log('Router specific Middleware');
    const token = req.headers['x-access-token']; //ritoymyrtuoi;uoiuhiffeeiwoqd3
    const data = jwt.verify(token,'superkey2022')
    console.log(data);
    next();
}
catch{
    //422 - unprocessable entity
    res.status(422).json({
        statusCode:422,
        status:false,
        message:'Please login first'
    })
}
}
// 4 resolving HTTP request 
// get ,post,put, patch,delete 

// resoving get request 

// app.get('/',(req,res) => {
//     res.send('Get request')
// })

// resoving post request 

// app.post('/',(req,res) => {
//     res.send('Post request')
// })

// resoving put request 

// app.put('/',(req,res) => {
//     res.send('Put request')
// })


// resoving patch request 

// app.patch('/',(req,res) => {
//     res.send('Patch request')
// })

// resoving delete request 

// app.delete('/',(req,res) => {
//     res.send('Delete request')
// })

// API Requests

// registration request
app.post('/register',(req,res)=>{
    console.log(req.body);
    dataservices.register(req.body.acno,req.body.username,req.body.password)//data
    .then(result=>{
    res.status(result.statusCode).json(result);
  })

})

// Login Request 
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservices.login(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);

    })
})

// deposit Request 
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})

// withdraw Request 
app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})


// transaction Request 
app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataservices.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})


// delete Request 
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataservices.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
})
