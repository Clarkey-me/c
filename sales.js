document.addEventListener("DOMContentLoaded", () => {
    const salesTableBody = document.getElementById("salesTableBody");

    // Get sales data from localStorage
    const salesData = JSON.parse(localStorage.getItem("salesData")) || [];

    // Function to render sales data
    function renderSales() {
        salesTableBody.innerHTML = ""; // Clear any existing rows

        // Loop through each sale and create a table row
        salesData.forEach(sale => {
            const row = document.createElement("tr");

            // Calculate the total amount for this sale
            const productNames = sale.products.map(product => product.name).join(", ");
            let totalAmount = 0;
            
            // Correctly calculate the total by summing up price * quantity for each product
            sale.products.forEach(product => {
                totalAmount += product.price * product.quantity;
            });

            const formattedTotalAmount = `₱${totalAmount.toFixed(2)}`;

            row.innerHTML = `
                <td>${sale.orderId}</td>
                <td>${sale.date}</td>
                <td>${productNames}</td>
                <td>${formattedTotalAmount}</td>
            `;

            salesTableBody.appendChild(row);
        });
    }

    // Render the sales data when the page loads
    renderSales();
});
