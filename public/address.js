import stateFields from './displayForm.js';

const validateRequest = new XMLHttpRequest();
const searchRequest = new XMLHttpRequest();

  const searchButton = document.getElementById('submit');
  const clearButton = document.getElementById('clear');
  const validateButton = document.getElementById('validate');
  var searchResults = document.getElementById('search_results');

  validateButton.addEventListener('click', (event) => {
    event.preventDefault();
    var addressToValidate = {}
    const country = document.getElementById('country').selectedOptions[0].value;
    const name = document.getElementById('name').value;
    const address1= document.getElementById('address1').value;
    const address2= document.getElementById('address2').value;
    const city= document.getElementById('city').value;
    const state= document.getElementById('state').value;
    const postalCode= document.getElementById('postalCode').value;
    if (country) {
      console.log(country);
      addressToValidate['country'] = country.toLowerCase();
    }
    if (state) {
      console.log(state);
      addressToValidate['state'] = state.toLowerCase();
    }
    if (city) {
      console.log(city);
      addressToValidate['city'] = city.toLowerCase();
    }
    if(postalCode) {
      console.log(postalCode);
      addressToValidate['zipCode'] = postalCode.toLowerCase();
    }
    if(address1) {
      console.log(address1);
      addressToValidate['addressLine1'] = address1.toLowerCase();
    }
    if(address2) {
      console.log(address2);
      addressToValidate['addressLine2'] = address2.toLowerCase();
    }
    if(name) {
      console.log(name);
      addressToValidate['name'] = name.toLowerCase();
    }

    console.log(JSON.stringify(addressToValidate));
   
    validateRequest.open('POST', `http://localhost:3001/${addressToValidate['country']}/validate`);
    validateRequest.setRequestHeader('Content-Type', 'application/json');
    validateRequest.send(JSON.stringify(addressToValidate));
  })

  validateRequest.onload = () => {
    // print JSON response
    if (validateRequest.status >= 200 && validateRequest.status < 300) {
      alert("Success!!Address is validated");
    }
    else {
      alert(validateRequest.responseText);
    }
    
  }

  searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    var searchTerms = {}

    const country = document.getElementById('country').selectedOptions[0].value.toLowerCase();
    const name = document.getElementById('name')?.value;
    const address1= document.getElementById('address1')?.value;
    const address2= document.getElementById('address2')?.value;
    const city= document.getElementById('city')?.value;
    const state= document.getElementById('state')?.value;
    const postalCode= document.getElementById('postalCode')?.value;
    if (country) {
      console.log(country);
      searchTerms['country'] = country.toLowerCase();
    }
    if (state) {
      console.log(state);
      searchTerms['state'] = state.toLowerCase();
    }
    if (city) {
      console.log(city);
      searchTerms['city'] = city.toLowerCase();
    }
    if(postalCode) {
      console.log(postalCode);
      searchTerms['zipCode'] = postalCode.toLowerCase();
    }
    if(address1) {
      console.log(address1);
      searchTerms['address1'] = address1.toLowerCase();
    }
    if(address2) {
      console.log(address2);
      searchTerms['address2'] = address2.toLowerCase();
    }
    if(name) {
      console.log(name);
      searchTerms['name'] = name.toLowerCase();
    }

    if(country === 'all') {
      // let matchingAddresses = [];
      const queryParams = buildQueryParams(searchTerms);

      console.log(`Country - ${country}`);
      console.log(queryParams);

      searchRequest.open('GET', `http://localhost:3001/search${queryParams}`);
      searchRequest.send(JSON.stringify(searchTerms));
    } else {
      // let matchingAddresses = [];
      const queryParams = buildQueryParams(searchTerms);
  
      console.log(`Country - ${country}`);
      console.log(queryParams);
  
      searchRequest.open('GET', `http://localhost:3001/${country}/search${queryParams}`);
      searchRequest.send(JSON.stringify(searchTerms));
    }
  });

  searchRequest.onload = () => {

    const matchingAddresses = JSON.parse(searchRequest.responseText);

    if (matchingAddresses.length === 0) {
      searchResults.innerHTML = 'No matching addresses found';
      return;
    }

    displayResults(matchingAddresses);
  }

clearButton.addEventListener('click', () => {
  searchResults.innerHTML = '';
  searchButton.disabled = false; // enable the button
});

function buildQueryParams(object) {
  const objString = '?' + Object.keys(object).map(key => {

    return `${key}=${encodeURIComponent(object[key])}`;

  }).join('&');

  return objString;
}

function displayResults(matchingAddresses) {
  let searchResults = document.getElementById('search_results');

  searchResults.innerHTML = '';

  matchingAddresses.forEach(function(address) {
    var li = document.createElement('li');
    li.textContent = address.name + ', ' + address.country + ', ' + address.address1 + ', ' + address.city + ', ' + address.state + ', ' + address.zipCode;
    searchResults.appendChild(li);
  });

  const selectedCountry = country.value;
  const fields = stateFields[selectedCountry];
  const headers = fields.map(field => field.label);
  

  var table = document.createElement('table');

  var headerRow = document.createElement('tr');
  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement('th');
    headerCell.textContent = headers[i];
    headerRow.appendChild(headerCell);
  }
  var headerCell = document.createElement('th');
  headerCell.textContent = 'Country';
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);

  var selectHeader = document.createElement('th');
  selectHeader.textContent = 'Select';
  headerRow.appendChild(selectHeader);
  table.appendChild(headerRow);

  var buttons = [];

  for (var i = 0; i < matchingAddresses.length; i++) {
    var row = document.createElement('tr');
    row.setAttribute('id', `${address-i}`);
    var address = matchingAddresses[i];

    var nameCell = document.createElement('td');
    nameCell.textContent = address.name;
    row.appendChild(nameCell);

    var address1Cell = document.createElement('td');
    address1Cell.textContent = address.address1;
    row.appendChild(address1Cell);

    var address2Cell = document.createElement('td');
    address2Cell.textContent = address.address2;
    row.appendChild(address2Cell);

    var cityCell = document.createElement('td');
    cityCell.textContent = address.city;
    row.appendChild(cityCell);

    var stateCell = document.createElement('td');
    stateCell.textContent = address.state;
    row.appendChild(stateCell);

    var postalCodeCell = document.createElement('td');
    postalCodeCell.textContent = address.zipcode;
    row.appendChild(postalCodeCell);

    var CountryCell = document.createElement('td');
    CountryCell.textContent = address.country;
    row.appendChild(CountryCell);
    
    var btn = document.createElement('input');
    btn.type = "button";
    btn.setAttribute('id', `address-${i}`);
    btn.value = 'select address';
    row.appendChild(btn);
    table.appendChild(row);

    buttons.push(btn);
  }

  for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      populateFormFields(matchingAddresses[i]);
    })
  }

  searchResults.innerHTML = '';
  searchResults.appendChild(table);
}

function populateFormFields(address) {
  console.log(address);
  let searchResults = document.getElementById('search_results');
  document.getElementById('name').value = address.name;
  document.getElementById('address1').value = address.address1;
  document.getElementById('address2').value = address.address2;
  document.getElementById('city').value = address.city;
  document.getElementById('state').value = address.state;
  document.getElementById('postalCode').value = address.zipcode;

  if(address2.value == 'undefined') {
    document.getElementById('address2').value = '';
  }
  address2.focus();
  searchResults.innerHTML = '';
}