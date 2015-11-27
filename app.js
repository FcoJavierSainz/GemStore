/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();


var me,
    password;

if (process && process.env && process.env.VCAP_SERVICES) {
    console.log("Bluemix Enviroment");
    var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
    for (var svcName in vcapServices) {
        if (svcName.match(/^cloudant.*/)) {
            me = vcapServices[svcName][0].credentials.username;
            password = vcapServices[svcName][0].credentials.password;
            break;
        }
    }
} else {
    console.log("Local Enviroment");
    me = "user";
    password = "pass";
}
// Load the Cloudant library.
var Cloudant = require('cloudant');

// Initialize the library with my account.
var cloudant = Cloudant({account: me, password: password});

var store = cloudant.db.use("store");

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/store/items', function (req, res) {
    store.list({include_docs: true, descending: true}, function(err, body) {
        if (!err) {
            res.send(body.rows.map(function (obj) {
                return obj.doc;
            }));
        }
    });
});
app.post('/api/store/item/:id/addReview', function (req, res) {
    store.get(req.params.id, function (error, obj) {
        if(error) throw "Invalid document id";
        obj.reviews = obj.reviews || [];
        obj.reviews.push(req.body);
        store.insert(obj);
    });
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
