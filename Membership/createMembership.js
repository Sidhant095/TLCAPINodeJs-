/**
 * createMembership.js
 * Contains API for creation of membership
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
const createMembership = (request, response) => {
    
    //const deviceUUid = request.header('deviceUUID')
    const memberId = request.body.memberId
    const membershipTypeId = request.body.membershipTypeId
    const addOnMembership = request.body.addOnMembership
    const primaryMemberId = request.body.primaryMemberId
    const mobileVerified = request.body.mobileVerified
    const emailVerified = request.body.emailVerified
    const termsAccepted  = request.body.termsAccepted 
    //const promoCode =  request.body.promoCode

    if (termsAccepted) {
        
        pool.query('INSERT INTO tlcsalesforce.membership__c ("member__c","customer_set__c","add_on_membership__c","primary_membership__c", "mobile_verified__c", "email_verified__c" , "t_c_accepted__c",  "membership_activated__c") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [memberId, membershipTypeId, addOnMembership, primaryMemberId, mobileVerified, emailVerified, termsAccepted, true], (error, results) => {
            
            if (error) {
                throw error
            }
            //response.status(200)(`User added with ID: ${result.insertId}`)
            response.status(200).json({
                "statusCode":200,
                "token": 'asdflkj123',
                "tokenExpiryDateTime": '2019-06-10T00:00:00.000Z',
                "membershipNumber": 'MR123456',
                "membershipExpiryDate": '2020-06-10'
            });
        })
    }
    else {
        response.status(502).send('Terms & Conditions should be accepted')
    }
}
module.exports = {
    createMembership,
}