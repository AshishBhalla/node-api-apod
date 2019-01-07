/**getting require modules*/

var request   = require('request');

var retData = (uri , callback) => {

var uri = uri;

/**request takes 3 arguements
* 1. URL
* 2. An object {json: true}- to get JSON as a response(optional, but better to use else 
*    will get a string)
* 3. It returns a call back with (err,res,body)
*/
request(uri, {json: true},(err,res,body) =>{
    if (err)
    {
        callback(err);
    }
    else
    {
        callback(undefined,body);
    }
});
};
module.exports = {
    retData
}