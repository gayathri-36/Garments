let inventory = [];
let editingIndex = null; // To track the item being edited

// Load inventory from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
        inventory = JSON.parse(storedInventory);
        updateInventoryTable();
    }
});

document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('garment-name').value;
    const category = document.getElementById('garment-category').value;
    const price = document.getElementById('garment-price').value;
    const stock = document.getElementById('garment-stock').value;

    if (editingIndex === null) {
        // Create a new garment object
        const newGarment = {
            name,
            category,
            price: parseFloat(price),
            stock: parseInt(stock)
        };

        // Add garment to inventory
        inventory.push(newGarment);
    } else {
        // Update the existing garment object at editingIndex
        inventory[editingIndex] = {
            name,
            category,
            price: parseFloat(price),
            stock: parseInt(stock)
        };
        editingIndex = null; // Reset editing mode after update
    }

    // Save updated inventory to localStorage
    localStorage.setItem('inventory', JSON.stringify(inventory));

    updateInventoryTable();

    // Reset form and button text
    document.getElementById('add-item-form').reset();
    document.getElementById('submit-btn').textContent = 'Add Item';
});

// Function to update the inventory table
function updateInventoryTable() {
    const inventoryTable = document.getElementById('inventory-list');
    inventoryTable.innerHTML = ''; // Clear the table before updating

    if (inventory.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.textContent = 'No items in inventory.';
        row.appendChild(cell);
        inventoryTable.appendChild(row);
    } else {
        inventory.forEach((garment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${garment.name}</td>
                <td>${garment.category}</td>
                <td>${garment.price}</td>
                <td>${garment.stock}</td>
                <td>
                    <button onclick="editItem(${index})">Edit</button>
                    <button onclick="deleteItem(${index})">Delete</button>
                </td>
            `;
            inventoryTable.appendChild(row);
        });
    }
}

// Function to delete an item from the inventory
function deleteItem(index) {
    inventory.splice(index, 1); // Remove the item from the inventory array
    localStorage.setItem('inventory', JSON.stringify(inventory)); // Update localStorage
    updateInventoryTable(); // Update the table display
}

// Function to edit an item
function editItem(index) {
    const garment = inventory[index];

    // Fill the form with the selected garment's data
    document.getElementById('garment-name').value = garment.name;
    document.getElementById('garment-category').value = garment.category;
    document.getElementById('garment-price').value = garment.price;
    document.getElementById('garment-stock').value = garment.stock;

    // Set editing mode and track the index
    editingIndex = index;

    // Change the form button text to "Update Item"
    document.getElementById('submit-btn').textContent = 'Update Item';
}
