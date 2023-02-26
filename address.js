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
          ship_address: columns[0].trim(),
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