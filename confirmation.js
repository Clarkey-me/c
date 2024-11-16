document.addEventListener("DOMContentLoaded", () => {
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Populate payment details in the confirmation page
    if (paymentDetails) {
        document.getElementById("confirmName").textContent = paymentDetails.name;
        document.getElementById("confirmContact").textContent = paymentDetails.contact;
        document.getElementById("confirmAddress").textContent = paymentDetails.address;
        document.getElementById("confirmLandmark").textContent = paymentDetails.landmark || "N/A";
        document.getElementById("confirmPostalCode").textContent = paymentDetails.postalCode;
        document.getElementById("confirmPaymentMethod").textContent = paymentDetails.paymentMethod;
    }

    // Populate cart items in the confirmation page
    const cartItemsTableBody = document.getElementById("cartItems");
    let totalAmount = 0;

    cartItems.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₱${item.price}</td>
            <td>${item.quantity}</td>
            <td>₱${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsTableBody.appendChild(row);
        totalAmount += item.price * item.quantity;
    });

    // Display total amount
    document.getElementById("totalAmount").textContent = `₱${totalAmount.toFixed(2)}`;

    // Back to Shop button functionality
    const backToShopButton = document.getElementById("backToShop");

    backToShopButton.addEventListener("click", () => {
        if (paymentDetails && cartItems.length > 0) {
            // Save approval data for the admin page
            const approvalData = { buyer: paymentDetails, products: cartItems };
            localStorage.setItem("approvalData", JSON.stringify(approvalData));

            // Redirect to the admin approval page
            window.location.href = "shop.html";
        } else {
            alert("No data available to process.");
        }
    });
});
