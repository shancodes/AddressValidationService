  const stateFields = {
    Canada: [
      { label: 'Name:', name: 'name', type: 'text' },
      { label: 'Address Line 1:', name: 'address line 1', type: 'text' },
      { label: 'Address Line 2:', name: 'address line 2', type: 'text' },
      { label: 'City', name: 'city', type: 'text' },
      { label: 'Province', name: 'province', type: 'text' },
      { label: 'Postal Code', name: 'postalCode', type: 'text' }
    ],
    USA: [
      { label: 'Name:', name: 'name', type: 'text' },
      { label: 'Address Line 1:', name: 'address line 1', type: 'text' },
      { label: 'Address Line 2:', name: 'address line 2', type: 'text' },
      { label: 'City', name: 'city', type: 'text' },
      { label: 'State', name: 'state', type: 'text' },
      { label: 'Zip Code', name: 'zipCode', type: 'text' }
    ],
    UK: [
      { label: 'Name:', name: 'name', type: 'text' },
      { label: 'Address Line 1:', name: 'address line 1', type: 'text' },
      { label: 'Address Line 2:', name: 'address line 2', type: 'text' },
      { label: 'City', name: 'city', type: 'text' },
      { label: 'Zip Code', name: 'zipCode', type: 'text' }
    ],
    India: [
      { label: 'Name:', name: 'name', type: 'text' },
      { label: 'Address Line 1:', name: 'address line 1', type: 'text' },
      { label: 'Address Line 2:', name: 'address line 2', type: 'text' },
      { label: 'City', name: 'city', type: 'text' },
      { label: 'State', name: 'state', type: 'text' },
      { label: 'Pin Code', name: 'pinCode', type: 'text' }
    ]
  };
  
  const stateContainer = document.querySelector('#state-container');
  const addressForm = document.querySelector('#address-form');
  const submitButton = document.querySelector('#submit');
  const validateButton = document.querySelector('#validate');
  const clearButton = document.querySelector('#clear');
  
  addressForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
  });
  
  document.querySelector('#country').addEventListener('change', function(event) {
    const country = event.target.value;
    const fields = stateFields[country] || [];
    const html = fields.map(function(field) {
      return `
        <div>
          <label for="${field.name}">${field.label}</label>
          <input type="${field.type}" name="${field.name}" id="${field.name}">
        </div>
      `;
    }).join('');
    stateContainer.innerHTML = html;
    submitButton.removeAttribute('hidden');
    validateButton.removeAttribute('hidden');
    clearButton.removeAttribute('hidden');
  });

  var xhr = new XMLHttpRequest();

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
            search_address: columns[0].trim(),
            city: columns[1].trim(),
            state: columns[2].trim(),
            postalcode: columns[3].trim(),
            country: columns[4].trim()
          };
          addresses.push(address);
        }
      }
    };
    console.log(addresses);
    xhr.send();
    
  // var searchBox = document.getElementById('search_address');
  // var address2 = document.getElementById('address2');
  // var city = document.getElementById('city');
  // var state = document.getElementById('state');
  // var country = document.getElementById('country');
  // var postalcode = document.getElementById('postalcode');
  // var searchBoxResults = document.getElementById('search_address_results');

  // var resultsPerPage = 5;

  // searchBox.addEventListener('input', function() {
  //   var searchTerm = this.value.toLowerCase();
  //   var matchingAddresses = addresses.filter(function(address) {
  //     return address.state.toLowerCase().includes(searchTerm) || 
  //     address.city.toLowerCase().includes(searchTerm) || 
  //     address.country.toLowerCase().includes(searchTerm);
  //   });

  //   var totalPages = Math.ceil(matchingAddresses.length / resultsPerPage);

  //   searchBoxResults.innerHTML = '';
  //   displayPage(0);

  //   function displayPage(pageIndex) {

  //     var startIndex = pageIndex * resultsPerPage;
  //     var endIndex = Math.min(startIndex + resultsPerPage, matchingAddresses.length);

  //     searchBoxResults.innerHTML = '';

  //     for (var i = startIndex; i < endIndex; i++) {
  //       (function(address) {
  //         var li = document.createElement('li');
  //         li.textContent = address.search_address + ', ' + address.city + ', ' + address.state + ', ' + address.postalcode + ', ' + address.country;
  //         li.addEventListener('click', function() {

  //           search_address.value = address.search_address;
  //           city.value = address.city;
  //           state.value = address.state;
  //           postalcode.value = address.postalcode;
  //           country.value = address.country;
  //           address2.focus();
    
  //           searchBoxResults.innerHTML = '';

  //         });
  //         searchBoxResults.appendChild(li);
  //       })(matchingAddresses[i]);
  //     }

  //     var pagination = document.getElementById('pagination');
  //     if (pagination) {
  //       pagination.remove();
  //     }

  //     if (totalPages > 1) {
  //       var pagination = document.createElement('div');
  //       pagination.id = 'pagination';
    
  //       var previousButton = document.createElement('button');
  //       previousButton.textContent = 'Previous';
  //       previousButton.disabled = pageIndex === 0;
  //       previousButton.addEventListener('click', function() {
  //         displayPage(pageIndex - 1);
  //       });
  //       pagination.appendChild(previousButton);
    
  //       var nextPageIndex = pageIndex + 1;
  //       var nextButton = document.createElement('button');
  //       nextButton.textContent = 'Next';
  //       nextButton.disabled = nextPageIndex === totalPages;
  //       nextButton.addEventListener('click', function() {
  //         displayPage(pageIndex + 1);
  //       });
  //       pagination.appendChild(nextButton);
  //       searchBoxResults.appendChild(pagination);
  //     }
  //   }
  // });