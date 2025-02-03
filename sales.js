let inventory = [];  // Initialize an empty array for inventory
let salesData = [];  // Initialize an empty array for sales data

// Fetch inventory from localStorage (if it was saved from the Inventory page)
if (localStorage.getItem('inventory')) {
    inventory = JSON.parse(localStorage.getItem('inventory'));
}

// Fetch sales data from localStorage (if it was saved previously)
if (localStorage.getItem('salesData')) {
    salesData = JSON.parse(localStorage.getItem('salesData'));
    updateSalesReport(); // Update the sales table on page load
}

// Populate the sales dropdown menu dynamically when the page loads
function populateSalesItems() {
    const saleItemSelect = document.getElementById('sale-item');
    saleItemSelect.innerHTML = '';  // Clear any existing options

    // Add a default "Select Item" option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select an Item';
    saleItemSelect.appendChild(defaultOption);

    // Add each garment as an option in the dropdown
    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        saleItemSelect.appendChild(option);
    });
}

// Event listener for sale form submission
document.getElementById('sale-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const item = document.getElementById('sale-item').value;
    const quantity = document.getElementById('sale-quantity').value;

    // Validate input
    if (!item || !quantity || isNaN(quantity) || quantity <= 0) {
        alert("Please select a valid item and quantity.");
        return;
    }

    // Calculate the total price for the sale
    const sale = {
        item,
        quantity: parseInt(quantity),
        totalPrice: calculateTotalPrice(item, quantity)
    };

    // Add the sale to the salesData array
    salesData.push(sale);

    // Save the updated sales data to localStorage
    localStorage.setItem('salesData', JSON.stringify(salesData));

    // Update the sales report table
    updateSalesReport();
});

// Calculate the total price for a sale
function calculateTotalPrice(item, quantity) {
    const garment = inventory.find(garment => garment.name === item);
    return garment ? garment.price * quantity : 0;
}

// Update the sales report table with the current sales data
function updateSalesReport() {
    const salesTable = document.getElementById('sales-list');
    salesTable.innerHTML = ''; // Clear the table before updating

    salesData.forEach(sale => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sale.item}</td>
            <td>${sale.quantity}</td>
            <td>${sale.totalPrice}</td>
        `;
        salesTable.appendChild(row);
    });
}

// Call populateSalesItems when the page loads
window.onload = function() {
    populateSalesItems();
};
