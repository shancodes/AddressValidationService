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
  