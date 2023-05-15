# Transaction Processing

<table data-full-width="true"><thead><tr><th>Flag Code</th><th>Description</th><th>Required Error Message</th><th>Account Restrictions</th><th>User Remedy</th><th>Ratio Support Action</th></tr></thead><tbody><tr><td>Insufficient balance for payment (F1003)</td><td>The user has initiated a purchase, but our asynchronous risk check has determined that the user does not have sufficient funds in their account to settle the payment.</td><td>H1: Payment failed Body: Ratio did not receive your payment.</td><td>All POST, PATCH, DELETE endpoints return a 403.</td><td>The user attempted to initiate a transaction but did not have the funds to cover the selected amount.</td><td>We will flag the user and reach out before allowing them to submit another transaction</td></tr><tr><td>Signal evaluation failed (F1004)</td><td>The user has initiated a purchase, but our asynchronous risk check has determined that the order has a high likelihood of being a returned payment.</td><td>H1: Your account is under review. Body: Ratio will contact you within 24 hours</td><td>All POST, PATCH, DELETE endpoints return a 403.</td><td>The user attempted to initiate a transaction but did not satisfy our risk requirements based on various signals related to the users bank account &#x26; transaction amount</td><td>We will flag the user and reach out before allowing them to submit another transaction</td></tr></tbody></table>