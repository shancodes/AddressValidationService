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
  const body = req.query;
  const name = body.name;
  const address1 = body.address1;
  const address2 = body.address2;
  const city = body.city;
  const state = body.state;
  const postalCode = body.postalCode;

  const searchTerms = {};

  if(name) {
    searchTerms['name'] = name;
  }

  if(address1) {
    searchTerms['address1'] = address1;
  }

  if(address2) {
    searchTerms['address2'] = address2;
  }

  if(city) {
    searchTerms['city'] = city;
  }

  if(state) {
    searchTerms['state'] = state;
  }

  if(postalCode) {
    searchTerms['postalCode'] = postalCode;
  }

  console.log(searchTerms);
    
  const matchingAddresses = searchFromDB(requestedCountry, searchTerms);
  
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
            res.status(400);
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
        (searchTerms['country'] != "" && address.country.toLowerCase().includes(searchTerms['country'])) && (
        (searchTerms['address1'] != "" && address.address.toLowerCase().includes(searchTerms['address1'])) ||
        (searchTerms['city'] != "" && address.city.toLowerCase().includes(searchTerms['city'])) ||
        (searchTerms['state'] != "" && address.state.toLowerCase().includes(searchTerms['state'])) ||
        (searchTerms['postalCode'] != "" && address.zipcode.toLowerCase().includes(searchTerms['postalCode'])))
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
  // 0 - country, 1 - name, 2, address1, 3 addr2,4 city, 5 state, 6 postal code
  const data = [];
  const contents = fs.readFileSync("./address.csv", {encoding:'utf8', flag:'r'});
  const lines = contents.split("\n");
  for(let i = 0; i < lines.length; i++) {
      const address = {};
      const objects = lines[i].split(',');
      address['country'] = objects[0];
      address['name'] = objects[1];
      address['address1'] = objects[2];
      address['address2'] = objects[3];
      address['city'] = objects[4];
      address['state'] = objects[5];
      address['zipcode'] = objects[6];
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

function searchFromDB(country, filters) {
  let matchingRecords = [];
  const keys = Object.keys(filters);

  if(country) {
    for(let i = 0; i < data.length; i++) {
      if(data[i].country.toLowerCase() === country) {
        matchingRecords.push(data[i]);
      }
    }
  }

  console.log(matchingRecords.length);

  matchingRecords = matchingRecords.filter(item => {
    for(let i = 0; i < keys.length; i++) {
      if(!(keys[i] in item) || !item[keys[i]].toLowerCase().includes(filters[keys[i]])) {
        return false;
      }
    }

    return true;
  });

  return matchingRecords;
}
