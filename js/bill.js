const billContent = document.getElementById('bill-content');
        const billData = JSON.parse(localStorage.getItem('finalBill')) || [];

        if (billData.length > 0) {
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

            billData.forEach(item => {
                const price = item.price || 100; // fallback price
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

            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
                <td colspan="5" style="text-align:right;"><strong>Grand Total:</strong></td>
                <td><strong>₹${grandTotal}</strong></td>
            `;
            table.appendChild(totalRow);

            billContent.appendChild(table);

            // Finalize Order button
            const finishBtn = document.createElement('button');
            finishBtn.className = 'confirm-btn';
            finishBtn.textContent = 'Place Order';
            finishBtn.onclick = () => {
                alert(`Order Placed!\nTotal Amount: ₹${grandTotal}`);
                localStorage.removeItem('cart');
                localStorage.removeItem('finalBill');
                window.location.href = 'index.html'; // or show a thank-you page
            };
            billContent.appendChild(finishBtn);
        } else {
            billContent.innerHTML = '<p>No items to bill.</p>';
        }

        async function downloadBill() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            let y = 10;
            doc.setFontSize(16);
            doc.text("Order Bill", 80, y);
            y += 10;

            const headers = ["Dish", "Restaurant", "City", "Qty", "Price", "Total"];
            const rows = [];

            let grandTotal = 0;

            billCart.forEach(item => {
                const price = item.price || 100;
                const total = price * item.quantity;
                grandTotal += total;

                rows.push([
                    item.name,
                    item.res_name || 'N/A',
                    item.city || 'N/A',
                    item.quantity.toString(),
                    `₹${price}`,
                    `₹${total}`
                ]);
            });

            // Use autoTable for table layout
            doc.autoTable({
                head: [headers],
                body: rows,
                startY: y + 5
            });

            // Add grand total
            let finalY = doc.lastAutoTable.finalY || 50;
            doc.text(`Grand Total: ₹${grandTotal}`, 140, finalY + 10);

            // Save the file
            doc.save('Order_Bill.pdf');
        }