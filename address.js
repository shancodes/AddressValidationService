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
  var city = document.getElementById('city');
  var state = document.getElementById('state');
  var country = document.getElementById('country');
  var postalcode = document.getElementById('postalcode');

  searchBox.addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    var matchingAddresses = addresses.filter(function(address) {
      return address.state.toLowerCase().includes(searchTerm) || address.city.toLowerCase().includes(searchTerm) || address.country.toLowerCase().includes(searchTerm);
    });
    console.log("matching address " + matchingAddresses);

    searchBox.focus();
    // var html = '';
    // matchingAddresses.forEach(function(address) {
    //   html += '<div>' + address.city + ', ' + address.state + ', ' + address.country + ', ' + address.postalcode + '</div>';
    // });
    // var results = document.getElementById('search-box-results');
    // results.innerHTML = html;

    // var searchBoxResults = document.querySelectorAll('#search-box-results div');
    // searchBoxResults.forEach(function(result) {
    //   result.addEventListener('click', function() {
    //     search_address.value = searchBox;
    //     city.value = address.city;
    //     state.value = address.state;
    //   });
    // });
  });