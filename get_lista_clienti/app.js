// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
let response;
const companyId = "723556";
const accessToken = "a/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWYiOiIzQk9DMXkya3I4Yk9tMnYyV01ZMTBiUTRCZ1NZWWRXayJ9.JDJcQdru7sLnNRj2Tlqel8LOPpi7ZaLfvEy6ha5StjY";
var http = require("https");

exports.lambdaHandler = async (event, context) => {
    try {
        var options = {
            "method": "GET",
            "hostname": "api-v2.fattureincloud.it",
            "port": null,
            "path": "/c/" + companyId + "/entities/clients",
            "headers": {
                "authorization": "Bearer " + accessToken
            }
        };
    
        let clienti = await getLista(options);
        response = JSON.stringify(clienti);

    } catch (err) {
        console.log(err);
        return err;
    }
    const res = {
        statusCode: 200,
        body: response,
    };
    return res;
};


function getLista(options) {
    return new Promise(resolve => {
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                resolve(JSON.parse(body.toString()));
            });
        });

        req.end();
    });
}
