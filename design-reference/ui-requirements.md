# UI Requirements

## Consents

You must present the following End User Consents.

### Before Submitting KYC

Before submitting user KYC data (name, address, DoB, SSN), you must present the following statement to the user and they must provide express consent by checking a box. You must include the link to Ratio’s terms exactly as presented below.

Required Copy: I agree to the [Ratio terms of use](https://ratio.me/legal/ratio-labs-usa-inc-terms-of-service)

### Settings

End Users must always be able to access the End User Terms from within your application. Most clients put a link in the settings.

[https://ratio.me/legal/ratio-labs-usa-inc-terms-of-service](https://ratio.me/legal/ratio-labs-usa-inc-terms-of-service)

## Transaction Confirmation and Receipts

The following table outlines the transaction data and customer notices that must be presented to users before you initiate the transaction as well as when viewing transaction detail for a pending or completed purchase.

Font must be no less than 8pt and be clearly legible against any background color or patterns

<table data-full-width="true"><thead><tr><th width="169">Data</th><th width="293">Confirm Purchase (Standard ACH)</th><th width="287">Confirm Purchase (Instant ACH)</th><th>Purchase Completed</th></tr></thead><tbody><tr><td></td><td><p>Presented to the user before you initiate the transaction and when presenting transaction details for a pending transaction where the activity item has status:</p><p>Fiat = PENDING</p><p>Crypto = PENDING</p></td><td><p>Presented to the user before you initiate the transaction and when presenting transaction details for a pending transaction where the activity item has status:</p><p>Fiat = PENDING</p><p>Crypto = PENDING</p></td><td>Used for presenting transaction details where the activity item has status:<br>Crypto = COMPLETE</td></tr><tr><td>Amount, Token Name, and Token Symbol of digital asset the user will receive</td><td>~500.00 USD Coin (USDC)</td><td>~482.50 USD Coin (USDC)</td><td>482.50 USD Coin (USDC)</td></tr><tr><td>Token Price</td><td>~$1.00</td><td>~$1.00</td><td>$1.00</td></tr><tr><td>Payment Method</td><td>USAA Checking (****1234)</td><td>USAA Checking (****1234)</td><td>USAA Checking (****1234)</td></tr><tr><td>Processing Time</td><td>3 Business Days</td><td>Instant</td><td>3 Business Days or Instant</td></tr><tr><td>Purchase Amount in USD</td><td>To be determined</td><td>To be determined</td><td>$500.00</td></tr><tr><td>Ratio Fee in USD</td><td>Free</td><td>$15.00</td><td>Free or $15.00</td></tr><tr><td>Network Fee in USD</td><td>To be determined</td><td>$2.50</td><td>$2.50</td></tr><tr><td>Total Cost in USD</td><td>$500.00</td><td>$500.00</td><td>$500.00</td></tr><tr><td>On the page where users confirm their purchase.</td><td>Standard ACH payments take three business days to settle. Final exchange rate and network fees will be determined when your payment is settled and your purchase transaction is broadcast onchain.</td><td>Final exchange rate and network fees will be determined when your transaction is broadcast onchain.</td><td>Exchange rate and network fees were determined at [crypto activity item timestamp]</td></tr><tr><td>On the page where users confirm their purchase (can be combined with the row above if desired)</td><td>Orders cannot be canceled or reversed once submitted.</td><td>Orders cannot be canceled or reversed once submitted.</td><td>n/a</td></tr><tr><td>Link to Block Explorer</td><td>n/a</td><td>n/a</td><td>Anywhere on the screen</td></tr><tr><td>Support</td><td>n/a</td><td>n/a</td><td>For support please contact Ratio at support@ratio.me</td></tr></tbody></table>

## Transaction History

End Users must be able to access a complete history of the transactions your application has initiated on their behalf. The transaction history list must:

* be in reverse chronological order
* show the date transaction amount
* provide access to the Transaction Details, which is the same information as you presented on the Purchase Complete screen above
