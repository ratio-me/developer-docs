# Transaction Limits

## Overview

Transaction limits help to reduce the risk of losses from fraud and non-payment. Below is a summary of the types of limits provided in our API and how we calculate those limits. Clients integrating the Ratio network into their application will receive more detailed documentation on limits as part of the implementation process. &#x20;

\
While some details cannot be shared here as they could impact our ability to mitigate risk, we are able to support up to $3,000 USD in instant ACH funding & up to $5,000 USD in standard ACH funding per day.&#x20;

When it comes to minimums, Ethereum mainnet transactions have a minimum limit of $20 while Polygon has a minimum of $1.

## ACH Transaction Limits

When a user links their bank account, we use their transaction history in order to determine their transaction limits.&#x20;

* Each user will get two types of limits; Instant ACH and Standard ACH
* Each user will get a daily and weekly limit for both instant and Standard ACH that reset on a rolling basis
* A user is limited to 4 transactions on a 24 hour rolling basis&#x20;

## How We Determine Limits

We use device biometrics and linked bank account transaction history to determine each user's transaction limits.

### Device Biometrics

When you integrate Ratio's payment network into your app, you will be asked to install a library that includes our _Sign in with Wallet_ service and a service to collect anonymized device biometrics.  Once installed, this will send fraud signals to Ratio to assist in determining each user's transaction limits.  These device signals are also used to detect account takeover fraud and therefore protect users from bad actors.

Here are some of the device signals we collect:

* What is the user's IP Address?
* Is traffic going through a VPN?
* Is the user copying/pasting data?
* Are screenshots being taken?

### User Attributes

We also look for fraud signals in user inputs.  Some examples:

* Is their phone number a VOIP number?
* What is the age of the email they provided?

### Transaction History

When a user connects their bank account to our network, we review their transaction history for instances of returned payments, as well as other behaviors that positively or negatively impact the risk score of a given user.

We also consider Ratio network transaction history when calculating a user's transaction limits.

