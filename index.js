const express = require('express');
const path = require('path');

const app = express()
const port = 3001

app.use(express.static('public'));

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
    res.send("TODO Implementation - Country address validation");
});

app.get('/search', (req,res) =>{
    res.send("TODO - Global Address Search");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})