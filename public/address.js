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
  var searchResults = document.getElementById('search_results');

  var resultsPerPage = 20;

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

    console.log("searchterms");
    console.log(searchTerms);

    let matchingAddresses = [];

    for (let i = 0; i < addresses.length; i++) {
      let address = addresses[i];

      if (
        (searchTerms['name'] != "" && address.name.toLowerCase().includes(searchTerms['name'])) &&
        (searchTerms['country'] != "" && address.country.toLowerCase().includes(searchTerms['country'])) ||
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

    if (matchingAddresses.length === 0) {
      searchResults.innerHTML = 'No matching addresses found';
      return;
    }
    var totalPages = Math.ceil(matchingAddresses.length / resultsPerPage);

    searchResults.innerHTML = '';

    matchingAddresses.forEach(function(address) {
      var li = document.createElement('li');
      li.textContent = address.name + ', ' + address.country + ', ' + address.address1 + ', ' + address.city + ', ' + address.state + ', ' + address.postalCode;
      searchResults.appendChild(li);
    });

    displayPage(0);
    function displayPage(pageIndex) {

      var startIndex = pageIndex * resultsPerPage;
      var endIndex = Math.min(startIndex + resultsPerPage, matchingAddresses.length);

      searchResults.innerHTML = '';

      for (var i = startIndex; i < endIndex; i++) {
        (function(address) {
          var li = document.createElement('li');
          li.textContent = address.name + ', ' + address.country + ', ' + address.address1 + ', ' + address.city + ', ' + address.state + ', ' + address.postalCode;
          li.addEventListener('click', function() {

            country.value = address.country;
            name.value = address.name;
            address1.value = address.address1;
            city.value = address.city;
            state.value = address.state;
            postalCode.value = address.postalCode;
            
            address2.focus();
    
            searchResults.innerHTML = '';

          });
          searchResults.appendChild(li);
        })(matchingAddresses[i]);
      }

      var pagination = document.getElementById('pagination');
      if (pagination) {
        pagination.remove();
      }

      if (totalPages > 1) {
        var pagination = document.createElement('div');
        pagination.id = 'pagination';
    
        var previousButton = document.createElement('button');
        previousButton.textContent = 'Previous';
        previousButton.disabled = pageIndex === 0;
        previousButton.addEventListener('click', function() {
          displayPage(pageIndex - 1);
        });
        pagination.appendChild(previousButton);
    
        var nextPageIndex = pageIndex + 1;
        var nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = nextPageIndex === totalPages;
        nextButton.addEventListener('click', function() {
          displayPage(pageIndex + 1);
        });
        pagination.appendChild(nextButton);
        searchResults.appendChild(pagination);
      }
    }
  });

  clearButton.addEventListener('click', () => {
    searchResults.innerHTML = '';
  });