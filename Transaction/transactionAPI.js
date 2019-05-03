const Pool = require('pg').Pool
const pool = new Pool({
    user : 'jkmrpjzdkivszj',
    host: 'ec2-54-221-236-144.compute-1.amazonaws.com',
    database: 'dd827p75n0qn9g',
    password: '803a1969c8d20d6d3a11e140a9f5c86c3f6aba7026fc72ceb4d6c9ef2687f746',
    port: 5432,
    ssl:true,
    connectionTimeoutMillis: 20000
})


var initiateTransaction = function(req,response){
    console.clear();
    var transactionId;
    var currentTime  = new Date();
    transactionId = currentTime.getTime();
    console.log('transactionId:: ', transactionId);
    console.log('new Date():: ', new Date());
    pool.query('SELECT nextval(\'tlcsalesforce.transaction_api_request_id_seq\')')
    .then(res=>{
        console.log('API id res', res.rows)
        console.log('Length', res.rows.length)
        console.log('is Array', Array.isArray(res.rows.length))
        console.log('Row', res.rows[0])
        console.log('Val', res.rows[0].nextval)
        transactionId += ''+res.rows[0].nextval;
        console.log('1transactionId:: ', transactionId);
        if(Array.isArray(res.rows) && res.rows.length == 1 && res.rows[0].nextval){
            pool.query('Insert INTO tlcsalesforce.transaction__c (member__c,membership__c,membership_offer__c,promocode__c,transaction_type__c,quantity__c,transaction_id__c) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING Id,transaction_id__c',[req.body.memberId,req.body.membershipNumber,req.body.offerId,req.body.promoCode,req.body.transactionType,req.body.quantitiy,transactionId])
            .then(res => {
                console.log('res', res.rows)
                response.status(200).json(
                    {
                        "statusCode":"200",
                        token: "asdflkj123",
                        "tokenExpiryDateTime": "2019-06-10T00:00:00.000Z",
                        "currency":"INR",
                        "totalPrice":"3186",
                        "transactionId": transactionId,
                    }
                );
            })
            .catch(err => {
                console.log('Error message: ', err.message)
                console.log('Error response: ', err.response)
                response.status(500).send('Error: '+err.message)
            })
        }
    })
    .catch(err=>{
        console.log('Error message: ', err.message)
        console.log('Error response: ', err.response)
        response.status(500).send('Error: '+err.message)
    });

    console.log('2transactionId:: ', transactionId);
    
    
    
};
var transactionFailed = function(req,response){
    console.clear();
    //console.log('app: ', req.app);
    
    // console.log('req.accepts html : ', req.accepts('html'));
    // console.log('req.get Content-Type : ', req.get('Content-Type'));


    // console.log('transactionId:: ', req.body.transactionId);
    // console.log('paymentStatus:: ', req.body.paymentStatus);
    // console.log('paymentGateway:: ', req.body.paymentGateway);
    // console.log('paymentMode:: ', req.body.paymentMode);
    // console.log('paymentTransactionCode:: ', req.body.paymentTransactionCode);
    // console.log('paymentRemarks:: ', req.body.paymentRemarks);

    // console.log('hostname: ', req.hostname);
    // console.log('params: ', req.params);
    // console.log('path: ', req.path);
    // console.log('query: ', req.query);
    // console.log('secure: ', req.secure);
    // console.log('pool waitingCount: ',pool.waitingCount)
    // console.log('pool idleCount: ',pool.idleCount)
    // console.log('pool totalCount: ',pool.totalCount)

    pool.query('UPDATE tlcsalesforce.transaction__c  SET payment_status__c = $1 ,payment_gateway__c = $2, payment_transaction_code__c = $3,payment_mode__c = $4,payment_remarks__c =$5 WHERE transaction_id__c = $6 RETURNING id',[req.body.paymentStatus,req.body.paymentGateway,req.body.paymentTransactionCode,req.body.paymentMode,req.body.paymentRemarks,req.body.transactionId])
    .then(res => {
        console.log('res', res)
        response.status(200).json(
            {
                "statusCode":"200",
                token: "asdflkj123",
                "tokenExpiryDateTime": "2019-06-10T00:00:00.000Z",
            }
        );
    })
    .catch(err => {
        console.log('Error message: ', err.message)
        console.log('Error response: ', err.response)
        response.status(500).send('Error: '+err.message)
    })
    
};
// var querytransaction = function(req,response){
//     console.clear();
//     //console.log('app: ', req.app);
//     console.log('params: ', req.params);
//     console.log('path: ', req.path);
//     console.log('query Id : ', req.query.id);
    
//     pool.query('Select * from tlcsalesforce.transaction__c where id = $1',[req.query.id])
//     .then(res => {
//         response.status(200).send(res.rows);
//     })
//     .catch(err => {
//         console.log('Error message: ', err.message)
//         console.log('Error response: ', err.response)fd
//         response.status(500).send('Error: '+err.message)
//     })
    
// };

module.exports={
    transactionFailed,
    //querytransaction,
    initiateTransaction
}


















