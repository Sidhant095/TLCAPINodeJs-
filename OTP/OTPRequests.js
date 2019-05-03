/**
 * OTPRequests.js
 * Contains API for request and validation of OTP
 * Written by Krishna 
 * April 27,2019
 */
const Pool = require('pg').Pool
const pool = new Pool({
    user : 'jkmrpjzdkivszj',
    host: 'ec2-54-221-236-144.compute-1.amazonaws.com',
    database: 'dd827p75n0qn9g',
    password: '803a1969c8d20d6d3a11e140a9f5c86c3f6aba7026fc72ceb4d6c9ef2687f746',
    port: 5432,
    ssl:true
})
var rn = require('random-number');
var moment = require('moment');
var options = {
    min:  100000,
    max:  999999,
    integer: true
}
// INSERT INTO tlcsalesforce.otp_log ("Email","Mobile","OTP For","OTP Request Date/Time", "OTP Expiration Date/Time", "OTP Validated" , "OTP Validated Date/Time","OTP Number",  "Device UUID", "Member Id")
// VALUES ('gupta.krishna71@gmail.com', '9660669487', 'Verify Mobile','2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07',true,  '2016-06-22 19:10:25-07', '566566', 'asjasudhbjha', 'MMhjb' );

// request OTP with mobile or email 
const generateOTP = (request, response) => {
    
    //const deviceUUid = request.header('deviceUUID')
    const otpNumber = rn(options)
    const memberId = request.body.memberId 
    const mobile = request.body.mobile
    const email = request.body.email
    const otpFor = request.body.otpFor

    if ( (otpFor == "Verify Mobile" && mobile) || (otpFor == "Verify Email" && email) || (otpFor) ) {
        const otpGeneratedTimeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss Z')
        const otpExpirationTimeStamp = moment().utc().add(5, 'm').format('YYYY-MM-DD HH:mm:ss Z')
        pool.query('INSERT INTO tlcsalesforce.otp_log ("Email","Mobile","OTP For","OTP Request Date/Time", "OTP Expiration Date/Time", "OTP Validated" , "OTP Number",  "Device UUID", "Member Id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[email, mobile, otpFor, otpGeneratedTimeStamp, otpExpirationTimeStamp, false, otpNumber,'564' , memberId], (error, results) => {
            
            if (error) {
                throw error
            }
            //response.status(200)(`User added with ID: ${result.insertId}`)
            response.status(200).json({
                "statusCode" : 200,
                "otp" : otpNumber,
                "otpValidTill" : otpExpirationTimeStamp,
                "token" : 'demoToken',
                "tokenExpiryDateTime" : otpExpirationTimeStamp
            });
        })
    }
    else {
        response.status(400).send('Required fields are missing')
    }
}
//api for validation OTP
const validateOTP = (request, response) => {
    
    //const deviceUUid = request.header('deviceUUID')
    const memberId = request.body.memberId 
    const mobile = request.body.mobile
    const email = request.body.email
    const otpFor = request.body.otpFor
    const otpNumber = request.body.otp
    const currentTimeStamp = moment().utc().format('YYYY-MM-DD HH:mm:ss Z')
    
    if (otpFor == "Verify Mobile" && moblie) {

        pool.query('SELECT "OTP Number", "OTP For", "OTP Expiration Date/Time", "Email", "Mobile" FROM tlcsalesforce.otp_log WHERE "OTP Number" = $1 AND "OTP For" = $2 AND "OTP Validated" = $3 AND "OTP Expiration Date/Time" > $4 AND "Mobile" = $5 ',[otpNumber, otpFor, false, currentTimeStamp, mobile], (error, results) => {
            if (error) {
                throw error
            }
            //response.status(200)(`User added with ID: ${result.insertId}`)
            var demo = results.rows[0];
            if (demo) {
                response.status(200).json({
                    "statusCode" : 200,
                    "token" : 'demoToken',
                    "tokenExpiryDateTime" : currentTimeStamp
                });
            }
            else{
                response.status(200).json({
                    "statusCode" : 502,
                    "token" : 'demoToken',
                    "tokenExpiryDateTime" : currentTimeStamp
                });
            }
            
        })
    }
    else if (otpFor == "Verify Email" && email) {

        pool.query('SELECT "OTP Number", "OTP For", "OTP Expiration Date/Time", "Email", "Mobile" FROM tlcsalesforce.otp_log WHERE "OTP Number" = $1 AND "OTP For" = $2 AND "OTP Validated" = $3 AND "OTP Expiration Date/Time" > $4 AND "Email" = $5 ',[otpNumber, otpFor, false, currentTimeStamp, email], (error, results) => {
            if (error) {
                throw error
            }
            //response.status(200)(`User added with ID: ${result.insertId}`)
            var demo = results.rows[0];
            if (demo) {
                response.status(200).json({
                    "statusCode" : 200,
                    "token" : 'demoToken',
                    "tokenExpiryDateTime" : currentTimeStamp
                });
            }
            else{
                response.status(200).json({
                    "statusCode" : 502,
                    "token" : 'demoToken',
                    "tokenExpiryDateTime" : currentTimeStamp
                });
            }
            
        })
    }
    else if (otpFor) {

        pool.query('SELECT "OTP Number", "OTP For", "OTP Expiration Date/Time", "Email", "Mobile" FROM tlcsalesforce.otp_log WHERE "OTP Number" = $1 AND "OTP For" = $2 AND "OTP Validated" = $3 AND "OTP Expiration Date/Time" > $4',[otpNumber, otpFor, false, currentTimeStamp], (error, results) => {
            if (error) {
                throw error
            }
            //response.status(200)(`User added with ID: ${result.insertId}`)
            var demo = results.rows[0];
            if (demo) {
                response.status(200).json({
                    "statusCode" : 200,
                    "token" : 'demoToken',
                    "tokenExpiryDateTime" : currentTimeStamp
                });
            }
            else{
                response.status(200).json({
                    "statusCode" : 502,
                    "token" : 'demoToken',
                    "tokenExpiryDateTime" : currentTimeStamp
                });
            }
            
        })
    }
    else {
        response.status(400).send('Required fields are missing')
    }

    
}
module.exports = {
    generateOTP,
    validateOTP
}