const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const otp = require('./OTP/OTPRequests')
const membership = require('./Membership/createMembership')
const transaction = require('./Transaction/transactionAPI')

const Pool = require('pg').Pool
const pool = new Pool({
  user : 'jkmrpjzdkivszj',
  host: 'ec2-54-221-236-144.compute-1.amazonaws.com',
  database: 'dd827p75n0qn9g',
  password: '803a1969c8d20d6d3a11e140a9f5c86c3f6aba7026fc72ceb4d6c9ef2687f746',
  port: 5432,
  ssl:true
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.post('/requestOTP',otp.generateOTP)
app.post('/validateOTP',otp.validateOTP)
app.post('/membership/create', membership.createMembership)

//Sidhant Start 
app.post('/initiateTransaction',transaction.initiateTransaction)
app.post('/transactionFailure',transaction.transactionFailed)
//app.get('/querytransaction',transaction.querytransaction)
//Sidhant End


  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })