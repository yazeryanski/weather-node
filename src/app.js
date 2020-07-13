const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000; 

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

hbs.registerPartials(partialsPath);

app.set("view engine", "hbs")
app.set("views", viewsPath)
app.use( express.static(publicDirectory) );


//Home
app.get("" , (req, res) => {
    res.render('index', {
        title: "Weather",
        author: "Narek Yazeryan",
        name: "Narek Yazeryan"
    })
})


//About
app.get("/about" , (req, res) => {
    res.render('about', {
        title: "About Page",
        author: "Narek Yazeryan",
        name: "Narek Yazeryan"
    })
})


//Help 
app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help page",
        description: "How I can help you?",
        name: "Narek Yazeryan"
    })
})

//Weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must send address"
        })
    }


    forecast(req.query.address, (ferr, fres) => {
        if (ferr) {
            res.send({
                error: ferr,
            })
        } else {
            res.send({
                query: req.query.address,
                forecast: fres.forecast,
                location: fres.location
            });
        }
    })
})

// Help sub page 404
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Narek Yazeryan",
        error: "Help page aricle not found"
    })
})

//  404 pages
app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Narek Yazeryan",
        error: "Page Not Found"
    })
})

//Listening port
app.listen(port, () => {
    console.log("Server started on " + port + "Port");
})
