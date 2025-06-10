const cartQuantities = {};

function changeQty(dishId, delta) {
    if (!cartQuantities[dishId]) cartQuantities[dishId] = 0;

    cartQuantities[dishId] += delta;
    if (cartQuantities[dishId] < 0) cartQuantities[dishId] = 0;

    document.getElementById(`qty-${dishId}`).textContent = cartQuantities[dishId];
}

function addToCart(dishId, dishName, restaurentname, city, price) {
    const quantity = cartQuantities[dishId] || 0;
    if (quantity === 0) {
        alert(`Please select quantity for ${dishName}.`);
        return;
    }

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update if item already in cart
    const index = cart.findIndex(item => item.id === dishId);
    if (index !== -1) {
        cart[index].quantity = quantity;
    } else {
        cart.push({
            id: dishId,
            name: dishName,
            quantity,
            restaurent: restaurentname,
            city: city,
            price : price
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} ${dishName}(s) added to cart.`);

    cartQuantities[dishId] = 0;
    document.getElementById(`qty-${dishId}`).textContent = '0';
}

// print cart

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.getElementById('cart-content');

if (cart.length > 0) {
    // Create table
    const table = document.createElement('table');

    table.innerHTML = `
            <tr>
                <th>Dish Name</th>
                <th>Restaurant</th>
                <th>City</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        `;

    let grandTotal = 0;

    cart.forEach(item => {
        // Add dummy price if not already present
        const price = item.price; // default price ₹100 if missing
        const total = price * item.quantity;
        grandTotal += total;

        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.res_name || 'N/A'}</td>
                <td>${item.city || 'N/A'}</td>
                <td>${item.quantity}</td>
                <td>₹${price}</td>
                <td>₹${total}</td>
            `;
        table.appendChild(row);
    });

    // Append grand total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
            <td colspan="5" style="text-align:right;"><strong>Grand Total:</strong></td>
            <td><strong>₹${grandTotal}</strong></td>
        `;
    table.appendChild(totalRow);

    cartContainer.appendChild(table);


    // Confirm Order Button
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-btn';
    confirmBtn.textContent = 'Confirm Order';
    confirmBtn.onclick = () => {
        localStorage.setItem('finalBill', JSON.stringify(cart)); // pass cart to bill page
        window.location.href = 'bill.html';
    };
    cartContainer.appendChild(confirmBtn);


} else {
    cartContainer.innerHTML = '<p class="empty-cart">No dishes added to cart.</p>';
}