const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const formatMap = require('./formats');

console.log(formatMap);

const app = express()
const port = 3001

app.use(express.static('public'));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get(`/:country/format`, (req, res) => {
    res.send("TODO Implementation - country format");
});

app.get(`/:country/search`, (req, res) => {
    res.send("TODO Implementation - country search");
});

app.post(`/:country/validate`, (req, res) => {
    console.log(req.params.country);
    const country = req.params.country;
    const data = req.body;
    const schema = formatMap[country];
    let response;
    if (schema) {
        response = schema.validate(data);
        if(response.error) {
            res.send(response.error.message);
        } else {
            res.send(response);
        }
        
    } else {
        res.json("Country Not Supported");
    }    
});

app.get('/search', (req,res) =>{
    res.send("TODO - Global Address Search");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})