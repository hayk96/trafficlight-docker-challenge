// Init dependencies
const express = require('express');
const ipfilter = require('express-ipfilter-secured').IpFilter;
const IpDeniedError = require('express-ipfilter-secured').IpDeniedError;
var favicon = require('serve-favicon');
var path = require('path');

// Allow the following subnet
const allowed_subnet = ['172.20.0.0/16'];

// Deny the gateway address of the network
const denied_ip = ['172.20.0.1'];

// Initialize App
const app = express();

// Defining variables
let data = {};
let jokes = {
    0: "What do you get when two giraffes collide? A giraffic jam",
    1: "Why was the squirrel late for work? Traffic was NUTS",
    2: "I hate sitting in traffic, because I always get run over",
    3: "What is the difference between blondes and traffic signs? Some traffic signs say stop.",
    4: "What did one traffic light say to the other. Stop looking I am changing",
    5: "What do you call a group of cars playing instruments? A Traffic Jam",
    6: "What do cars eat on their toast? Traffic Jam.",
    7: "I love the sound of traffic. It's my jam",
    8: "Steve Winwood began his solo career in 1977. He would have started sooner, but he was stuck in traffic.",
    9: "I think traffic lights might have a crush on me. They always turn red when I’m around"
};

// Defining functions
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.use(ipfilter(allowed_subnet, { mode: 'allow' }));
app.use(ipfilter(denied_ip, { mode: 'deny' }));

module.exports = app;

app.use(favicon(path.join(__dirname,'views','favicon.ico')));

// Assign route
app.use('/', (req, res) => {
    let joke_number = getRandomInt(10);
    data["joke"] = jokes[joke_number];
    res.render('/app/views/index.pug', data);
});

// Error handler
app.use(function(err, req, res, _next) {
    if (err instanceof IpDeniedError) {
        res.setHeader("Content-Type", "text/html");
        res.write("<p>Access Denied</p>");
        res.end();
    }
});

// Start server
app.listen(80, () => {
    console.log('App listening on port 80');
});