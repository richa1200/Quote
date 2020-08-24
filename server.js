const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/quotes/random', (req,res,next) => {
   const quote = getRandomElement(quotes);
   res.status(200).send(quote);
});

app.get('/quotes/all', (req,res,next) => {
    res.status(200).send(quotes);
 });

 app.get('/quotes/author/:name', (req,res,next) => {
    const auth = req.params.name;
    let thisQuote = undefined;
    quotes.forEach((quote) => {
        if(quote.person === auth) {thisQuote = quote;}
    });

        if(thisQuote){
            res.status(200).send(thisQuote);
        } else {
            res.status(404).send("Author Not Found");
        }
 });

app.post('/quotes/new', (req,res,next) => {
    let newQuote = req.query;
    if(req.query.person && req.query.quote){
    quotes.push(newQuote);
    res.status(201).send('new Quote added');
    console.log(quotes);
    } else {
        res.status(400).send('Bad Request');
    }
 });

app.listen(PORT, ()=> {console.log(`Server running at ${PORT}`);});

