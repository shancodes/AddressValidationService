const stateFields = {
  Canada: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' },
    { label: 'Province', id: 'state', name: 'state', type: 'text' },
    { label: 'Postal Code', id: 'postalCode', name: 'postalCode', type: 'text' }
  ],
  USA: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' },
    { label: 'State', id: 'state', name: 'state', type: 'text' },
    { label: 'Zip Code', id: 'postalCode', name: 'postalCode', type: 'text' }
  ],
  UK: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' },
    { label: 'Zip Code', id: 'postalCode', name: 'postalCode', type: 'text' }
  ],
  India: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' },
    { label: 'State', id: 'state', name: 'state', type: 'text' },
    { label: 'Pin Code', id: 'postalCode', name: 'postalCode', type: 'text' }
  ],
  Brazil: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Province Code ', id: 'provincecode', name: 'provincecode', type: 'text' },
    { label: 'Post Code', id: 'postalCode', name: 'postalCode', type: 'text' }
  ],
  Denmark: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Zip Code', id: 'postalCode', name: 'postalCode', type: 'text' },
    { label: 'Postal District ', id: 'postaldistrict', name: 'postaldistrict', type: 'text' }
  ],
  Italy: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Postal Code', id: 'postalCode', name: 'postalCode', type: 'text' },
    { label: 'City ', id: 'city', name: 'city', type: 'text' },
    { label: 'Province Code ', id: 'provincecode', name: 'provincecode', type: 'text' }
  ],
  Japan: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Postal Code', id: 'postalCode', name: 'postalCode', type: 'text' },
    { label: 'City/Locality', id: 'city', name: 'city', type: 'text' }
  ],
  Mexico: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'Post Code', id: 'postalCode', name: 'postalCode', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' },
    { label: 'State', id: 'state', name: 'state', type: 'text' }
  ],
  Spain: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'Post Code', id: 'postalCode', name: 'postalCode', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' }
  ],
  All: [
    { label: 'Name', id: 'name', name: 'name', type: 'text' },
    { label: 'Address Line 1', id: 'address1', name: 'address1', type: 'text' },
    { label: 'Address Line 2', id: 'address2', name: 'address2', type: 'text' },
    { label: 'City', id: 'city', name: 'city', type: 'text' },
    { label: 'State', id: 'state', name: 'state', type: 'text' },
    { label: 'Zip Code', id: 'postalCode', name: 'postalCode', type: 'text' }
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
  
  export default stateFields;