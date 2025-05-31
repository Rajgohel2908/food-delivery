// Object to track quantities
const cartQuantities = {};

function changeQty(dishId, delta) {
    if (!cartQuantities[dishId]) cartQuantities[dishId] = 0;

    cartQuantities[dishId] += delta;
    if (cartQuantities[dishId] < 0) cartQuantities[dishId] = 0;

    document.getElementById(`qty-${dishId}`).textContent = cartQuantities[dishId];
}

function addToCart(dishId, dishName) {
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
        cart.push({ id: dishId, name: dishName, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} ${dishName}(s) added to cart.`);

     cartQuantities[dishId] = 0;
    document.getElementById(`qty-${dishId}`).textContent = '0';
}
