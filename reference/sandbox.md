---
description: Use the Sandbox to quickly develop and test your app
---

# Sandbox

## Account Creation

All user account creation requires:

1. A unique wallet address for authentication
2. A unique email
   1. Please use standard email providers. If you use an email provider that is commonly associated with testing/throw away emails you will likely get flagged by our risk system
   2. We recommend Gmail because you can generate many unique addresses for the same normalized address. Reference [here](https://gmail.googleblog.com/2008/03/2-hidden-ways-to-get-more-from-your.html?sjid=16264266597320595453-NA)
3. A unique phone number that can receive SMS codes. We recommend [https://smsreceivefree.com/](https://smsreceivefree.com/)

## User Information

You can use any combination of first name, last name, address, and DOB

## KYC

### Approved

* SSN must start with 2 through 9 to be approved. One of the systems that underlies our compliance process requires that SSNs be unique in their Sandbox environment. While unlikely, it is possible to get an error that says the SSN is already taken. If this happens you will need to use a different SSN.

### Declined

* SSN must start with 0

### In Review

* SSN must start with a 1

## Bank Account Linking and Verification

In order to purchase crypto using a bank account, the user must link their bank account to Ratio and Ratio will verify that the bank account belongs to the user.

For clarity, you must:

1. Link the Bank Account `“linkStatus”: “ACTIVE”`
2. Check the verification status of the Bank Account: `"verificationStatus": "APPROVED"`

### Link and Approve a Bank Account

In the Plaid flow the following scenarios will result in an approved and verified bank account:

1. **Non-Oauth Institution (\~40% of your users will go through this flow)**
   * bank: Tartan Bank
   * user name: custom\_ratio\_good
   * password: pass\_good
   * select either checking or savings account
2. **Oauth Institution (\~55% of your users will go through this flow)**
   * bank: Platypus OAuth Bank
   * user name: custom\_ratio\_good
   * password: pass\_good
   * select either checking or savings account
   * If asked for a 2FA code, enter any number
3.  **Oauth App2App Flow (Only used by Chase Bank at the moment)**

    For Chase Bank customers that have the Chase Bank app on their phone, this will open the app and the user will be able to use biometric auth if they have it set up. Very slick.

    * bank: First Platypus OAuth App2App Bank
    * user name: custom\_ratio\_good
    * password: pass\_good
    * select either checking or savings account
    * If asked for a 2FA code, enter any number

    Note that when testing the App2App flow, the test bank uses the browser as the “bank app” so it will feel like the standard Oauth institution.

### If the user does not complete the Plaid flow

You can simply ask the user to re-enter the flow.

### Unhappy Path

#### Bank Verification Failed

* Use the same institutions above, but replace the user name and password with:
  * user name: custom\_ratio\_bad
  * password: pass\_bad

#### Bank Experience is Degraded

* Bank: Unhealthy Platypus Bank - Degraded
* user name: custom\_ratio\_good
* password: pass\_good
* select either checking or savings account

#### Bank Connection is Down

* Bank: Unhealthy Platypus Bank - Down
* user name: custom\_ratio\_good
* password: pass\_good
* select either checking or savings account

## ACH

### Initiate a Successful Transaction

* type: STANDARD or INSTANT
* fiatAmount: less than $50
* cryptoCurrency: [Any supported Crypto](supported-currencies.md)
* walletId: \<Wallet Resource Id>

### Unhappy Paths

#### Risk Assessment Rejection

* Using valid type, cryptoCurrency and walletId
* fiatAmount: $123.45
* User will be flagged with F1004

#### Failed Payment

* Using valid cryptoCurrency and walletId
* type: STANDARD
* fiatAmount: greater than $50
* User will be flagged with F1001

#### Payment Delinquency

* Using valid cryptoCurrency and walletId
* type: INSTANT
* fiatAmount: greater than $50
* User will be flagged with F1000
