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
          addressLine1: columns[2].trim(),
          city: columns[3].trim(),
          state: columns[4].trim(),
          postalcode: columns[5].trim()
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