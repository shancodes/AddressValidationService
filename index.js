const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const formatMap = require('./formats');
const fs = require("fs");


const app = express()
const port = 3001
const data = readFromCSV();
app.use(express.static('public'));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/form.html'));
});

app.get(`/:country/format`, (req, res) => {
    res.send("TODO Implementation - country format");
});

app.get(`/:country/search`, (req, res) => {
    const requestedCountry = req.params.country.toLowerCase();
  const matchingAddresses = [];
  
  for (let i = 0; i < data.length; i++) {
    const address = data[i];
    if (address.country.toLowerCase() === requestedCountry) {
      matchingAddresses.push(address);
    }
  }
  
  res.send(matchingAddresses);
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
    // define search query
    const body = req.body;
    const country = body.country;
    const name = body.name;
    const address1 = body.address1;
    const address2 = body.address2;
    const city = body.city;
    const state = body.state;
    const postalCode = body.postalCode;
    const searchTerms = {
        name : getValueFromBody(body,'name'),
        country : getValueFromBody(body, 'country'),
        address1 : getValueFromBody(body,'address1'),
        address2 : getValueFromBody(body,'address2'),
        city : getValueFromBody(body,'city'),
        state : getValueFromBody(body,'state'),
        postalCode: getValueFromBody(body,'postalCode')
    };

    const matchingAddresses = [];

    for (let i = 0; i < data.length; i++) {
      let address = data[i];
        console.log(address);
      if (
        (searchTerms['country'] != "" && address.country.toLowerCase().includes(searchTerms['country'])) ||
        (searchTerms['address1'] != "" && address.address.toLowerCase().includes(searchTerms['address1'])) ||
        (searchTerms['city'] != "" && address.city.toLowerCase().includes(searchTerms['city'])) ||
        (searchTerms['state'] != "" && address.state.toLowerCase().includes(searchTerms['state'])) ||
        (searchTerms['postalCode'] != "" && address.zipcode.toLowerCase().includes(searchTerms['postalCode']))
      )
      {
        matchingAddresses.push(address);
      }
    }
    res.send(matchingAddresses);
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function readFromCSV() {
    const data = [];
    const contents = fs.readFileSync("./address.csv", {encoding:'utf8', flag:'r'});
    const lines = contents.split("\n");
    for(let i = 1; i < lines.length; i++) {
        const address = {};
        const objects = lines[i].split(',');
        address['country'] = objects[4];
        address['address'] = objects[0];
        address['city'] = objects[1];
        address['state'] = objects[2];
        address['zipcode'] = objects[3];
        data.push(address);
    }
    return data;
   
}

function getValueFromBody(body, value){
    if(body[value]) {
        return body[value].toLowerCase();
    }
    else {
        return undefined;
    }
}


 