import stateFields from './displayForm.js';

var xhr = new XMLHttpRequest();
const validateRequest = new XMLHttpRequest()

xhr.open('GET', 'address.csv',true);
var addresses = [];
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var rows = xhr.responseText.split('\n');
      
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i].trim();
  
        if (row === '')
          continue;
  
        var columns = row.split(',');
        var address = {
          country: columns[0].trim(),
          name: columns[1].trim(),
          address1: columns[2].trim(),
          city: columns[3].trim(),
          state: columns[4].trim(),
          postalCode: columns[5].trim()
        };
        addresses.push(address);
      }
    }
  };
  console.log("addresses in browser");
  console.log(addresses);
  xhr.send();

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
    var country = document.getElementById('country');
    var name = document.getElementById('name');
    var address1= document.getElementById('address1');
    var address2= document.getElementById('address2');
    var city= document.getElementById('city');
    var state= document.getElementById('state');
    var postalCode= document.getElementById('postalCode');
    var searchTerms = {
      country: country.value.toLowerCase(),
      name: name.value.toLowerCase(),
      address1: address1.value.toLowerCase(),
      address2: address2.value.toLowerCase(),
      city: city.value.toLowerCase(),
      state: state.value.toLowerCase(),
      postalCode: postalCode.value.toLowerCase(),
    };

    let matchingAddresses = [];

    for (let i = 0; i < addresses.length; i++) {
      let address = addresses[i];

      if (
        // (searchTerms['name'] != "" && address.name.toLowerCase().includes(searchTerms['name'])) &&
        (searchTerms['name'] != "" && address.name.toLowerCase() === searchTerms['name']) &&
        (searchTerms['country'] != "" && address.country.toLowerCase().includes(searchTerms['country']) || searchTerms['country'] == "all") ||
        (searchTerms['address1'] != "" && address.address1.toLowerCase().includes(searchTerms['address1'])) ||
        (searchTerms['address2'] != "" && address.address2.toLowerCase().includes(searchTerms['address2'])) ||
        (searchTerms['city'] != "" && address.city.toLowerCase().includes(searchTerms['city'])) ||
        (searchTerms['state'] != "" && address.state.toLowerCase().includes(searchTerms['state'])) ||
        (searchTerms['postalCode'] != "" && address.postalCode.toLowerCase().includes(searchTerms['postalCode']))
      )
      {
        matchingAddresses.push(address);
      }
    }
    searchButton.disabled = true; // disable the button

    if (matchingAddresses.length === 0) {
      searchResults.innerHTML = 'No matching addresses found';
      return;
    }

    searchResults.innerHTML = '';

    matchingAddresses.forEach(function(address) {
      var li = document.createElement('li');
      li.textContent = address.name + ', ' + address.country + ', ' + address.address1 + ', ' + address.city + ', ' + address.state + ', ' + address.postalCode;
      searchResults.appendChild(li);
    });

    const selectedCountry = country.value;
    const fields = stateFields[selectedCountry];
    const headers = fields.map(field => field.label);
    displayResults(searchResults);

    function displayResults(searchResults) {
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
    
      for (var i = 0; i < matchingAddresses.length; i++) {
        var row = document.createElement('tr');
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
        postalCodeCell.textContent = address.postalCode;
        row.appendChild(postalCodeCell);

        var CountryCell = document.createElement('td');
        CountryCell.textContent = address.country;
        row.appendChild(CountryCell);
    
        table.appendChild(row);

        row.addEventListener('click', function() {
          populateFormFields(address);
        });
      }
    
      var resultsContainer = document.getElementById('search_results');
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(table);
    }

    function populateFormFields(address) {
      document.getElementById('name').value = address.name;
      document.getElementById('address1').value = address.address1;
      document.getElementById('address2').value = address.address2;
      document.getElementById('city').value = address.city;
      document.getElementById('state').value = address.state;
      document.getElementById('postalCode').value = address.postalCode;

      if(address2.value == 'undefined')
        document.getElementById('address2').value = '';
      address2.focus();
      searchResults.innerHTML = '';
    }
  });

  clearButton.addEventListener('click', () => {
    searchResults.innerHTML = '';
    searchButton.disabled = false; // enable the button
  });