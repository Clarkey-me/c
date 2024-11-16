document.addEventListener("DOMContentLoaded", () => {
    const productDetailsTableBody = document.getElementById("productDetailsTable").querySelector("tbody");

    // Retrieve the approved product details from localStorage
    const approvedProduct = JSON.parse(localStorage.getItem("approvedProduct"));

    if (!approvedProduct) {
        alert("No approved product data found.");
        return;
    }

    // Display the product details on the order page
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${approvedProduct.name}</td>
        <td>${approvedProduct.quantity}</td>
        <td>₱${approvedProduct.price}</td>
        <td>₱${(approvedProduct.price * approvedProduct.quantity).toFixed(2)}</td>
        <td>
            <button class="action-btn received">Order Received</button>
            <button class="action-btn returned">Returned</button>
        </td>
    `;

    productDetailsTableBody.appendChild(row);

    // Event listener for Order Received button
    row.querySelector(".received").addEventListener("click", () => {
        alert("Order marked as received.");

        // Get existing sales data from localStorage or initialize as an empty array
        const salesData = JSON.parse(localStorage.getItem("salesData")) || [];

        // Create a new sale entry
        const sale = {
            orderId: `ORD${Date.now()}`, // Unique order ID based on timestamp
            date: new Date().toLocaleDateString(),
            products: [approvedProduct],
        };

        // Add the sale to the sales data array
        salesData.push(sale);

        // Save the updated sales data back to localStorage
        localStorage.setItem("salesData", JSON.stringify(salesData));

        // Delete the product details from localStorage after marking it as received
        localStorage.removeItem("approvedProduct");

        // Redirect to the purchase history page after saving the order
        window.location.href = "purchaseHistory.html"; // Redirect to the purchase history page
    });

    // Event listener for Order Returned button
    row.querySelector(".returned").addEventListener("click", () => {
        alert("Order marked as returned.");
        // Handle returned logic here (e.g., update order status, etc.)
    });
});
