document.addEventListener('DOMContentLoaded', function () {
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    const cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productContainer = event.target.closest('.card');
        const productId = productContainer.querySelector('.add-to-cart').getAttribute('data-product-id');
        const productName = productContainer.querySelector('.card-title').innerText;
        const productPrice = parseInt(productContainer.querySelector('.card-text:last-child').innerText.replace('Rp ', '').replace(',', ''));

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerText = `${item.name} x${item.quantity} - Rp ${item.price * item.quantity}`;
            cartItemsList.appendChild(listItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerText = `Rp ${totalPrice}`;
    }

    window.checkout = function () {
        alert('Checkout successful!'); // Replace with your actual checkout logic
        cart.length = 0; // Clear the cart after checkout
        updateCart();
    };
});
