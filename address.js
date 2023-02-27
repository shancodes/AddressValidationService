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

  var searchBox = document.getElementById('search_address');
  var address2 = document.getElementById('address2');
  var city = document.getElementById('city');
  var state = document.getElementById('state');
  var country = document.getElementById('country');
  var postalcode = document.getElementById('postalcode');
  var searchBoxResults = document.getElementById('search_address_results');

  searchBox.addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    var matchingAddresses = addresses.filter(function(address) {
      return address.state.toLowerCase().includes(searchTerm) || 
      address.city.toLowerCase().includes(searchTerm) || 
      address.country.toLowerCase().includes(searchTerm);
    });

    searchBoxResults.innerHTML = '';

    matchingAddresses.forEach(function(address) {
      var li = document.createElement('li');
      li.textContent = address.search_address + ', ' + address.city + ', ' + address.state + ', ' + address.postalcode + ', ' + address.country;
      li.addEventListener('click', function() {
        search_address.value = address.search_address;
        city.value = address.city;
        state.value = address.state;
        postalcode.value = address.postalcode;
        country.value = address.country;
        address2.focus();

        searchBoxResults.innerHTML = '';

      });
      searchBoxResults.appendChild(li);
    });
  });