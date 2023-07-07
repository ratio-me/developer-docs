# Sign up

## Sign in with wallet

...

## Splash

The "Ratio connects your financial accounts" screen only appears when a user triggers the Ratio SDK from your application for the first time.&#x20;

The screen intends to help establish an association between the user and Ratio as the payment facilitator.

Users can navigate to [ratio.me/end-users](https://ratio.me/end-users) for more information

{% hint style="info" %}
We are currently not available in HI, NM, NY, WA
{% endhint %}

![](<../../../.gitbook/assets/image (5).png>)

## Enter phone number

After selecting "continue" users are prompted to enter a phone number and will need to tap the input field to bring up the keyboard.&#x20;

<figure><img src="../../../.gitbook/assets/image (29).png" alt=""><figcaption></figcaption></figure>

Once a valid phone number is entered, the user is automatically directed to the authentication screen

## Authenticate number

<figure><img src="../../../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>

## Accept terms and conditions

The create account splash intends to communicate to users what they can expect in the create account flow. Users are required to accept terms of use to create an account.

![](<../../../.gitbook/assets/image (28).png>)

## Email address

Ratio requires an email address for transaction confirmations as well as support. We do not ask the user to authenticate this email during the signup flow.

<figure><img src="../../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

## KYC information

All users of the Ratio service must provide information so that we can verify their identity. We require the following information to verify the user:

* Personal information
  * Full name
  * Date of birth
* Social Security Number
* Current residential address

<figure><img src="../../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

## Creating a KYC'd user account

Once a users account is created we check their information to verify their identity in real time.

<figure><img src="../../../.gitbook/assets/image (30).png" alt=""><figcaption></figcaption></figure>

## Link a bank account

Once a user has successfully created an account and passed KYC they can link their bank account via Plaid.

![](<../../../.gitbook/assets/image (10).png>)

After a user taps "connect bank account" we launch the Plaid SDK for users to enter their banking details (this user experience is handled by Plaid)

<figure><img src="../../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

## Bank verification

Once a user successfully completes the Plaid flow they are redirected back to Ratio where we verify their information against the KYC data collected earlier in the flow.

<figure><img src="../../../.gitbook/assets/image (26) (1).png" alt=""><figcaption></figcaption></figure>

After a user's bank account is linked, we underwrite the user's ACH limits in the background using their bank account transaction history. We review their transaction history for instances of returned payments, as well as other behaviours that positively or negatively impact the risk score of a given user.

Each user will get standard and ACH limits, each with a daily and weekly limit that will reset on a rolling basis. Additionally, each user is limited to 4 total transactions per day.

{% hint style="info" %}
#### Clients integrating the Ratio network into their application will receive more detailed documentation on limits as part of the implementation process. &#x20;

We do not share details here as they could impact our ability to mitigate risk. However, we can support up to $3,000 USD in instant ACH funding & up to $5,000 USD in standard ACH funding per day.
{% endhint %}

At this point we have a fully authenticated and verified user who can now initiate an ACH and buy crypto
