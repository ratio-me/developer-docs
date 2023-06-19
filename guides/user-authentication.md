# User Authentication

{% hint style="warning" %}
#### A [created user](user-authentication.md#create-the-user) is required for sign in.
{% endhint %}

## Getting started

To get started we require **two factors of user-authentication\*** to receive a JWT token to be passed in the header.&#x20;

{% hint style="warning" %}
#### For sign in you need to re-use whatever two factors you used to [create a new user](user-authentication.md#create-the-user)

For the purpose of this guide we will use:

1. Wallet auth
2. SMS auth&#x20;

You can see more information on our [authentication methods here](broken-reference)
{% endhint %}

### First factor authentication

{% hint style="danger" %}
#### This wallet auth needs to happen with the same wallet used in the create new user flow

If a user is attempting to sign in with a new wallet, please follow our [account linking guide](account-linking.md)
{% endhint %}

Authenticating with a crypto wallet requires two steps

1. Retrieve a challenge phrase to be signed with the users wallet.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:start" method="post" expanded="false" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletType": "EVM"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "challenge": "Signing in with Ratio: pUQikKqqBq1brTwt1oHhUJwlOTfshzfMEAsJaH7x1MOdN7QMOooFfj-Aujmi7sb0wJnvYqtmZtlszKdH"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/auth/cryptoWallet:start' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletType": "EVM"
}'
```
{% endtab %}
{% endtabs %}

2. Then authenticate that signature with the users wallet.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletType": "EVM",
    "signature": "2djd2cFZ9VU2zDWvUGqeHwvbiJZfTt3BMzDctDsEW7vM2QUTgTHjeM2rpFX9ZULeic3KptUh5ehipXDFcK5ecYiX"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "sessionJwt": "eyJhbG.....",
    "userMask": {
        "id": "00000000-0000-0000-0000-000000000000",
        "createTime": "2022-01-01T00:00:00.000Z",
        "updateTime": "2022-01-01T23:59:59.999Z",
        "phoneMask": "0000",
        "preferredMfaMethod": "OTP_SMS"
    }
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/auth/cryptoWallet:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletType": "EVM",
    "signature": "<SIGNED_CHALLENGE_STRING>"
}'
```
{% endtab %}
{% endtabs %}

Once a successful authentication takes place, you will receive an authenticated JWT that has to be passed into the authorization header as a bearer token for the subsequent request to ensure they are authenticated to the same session.

## Second factor authentication

First we need to send a one-time code to the user using the phone number they provided in sign up.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:send" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "phoneNumber": "+14165551234",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789",
    "phoneMask": "1234"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/sms:send' \
--header 'Authorization: Bearer eyJ......' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber": "+14165551234"
}'
```
{% endtab %}
{% endtabs %}

Once you receive the one-time code send it (with the phone number received in first response) to the sms:authenticate endpoint to obtain a JWT.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789",
    "otp": "123456",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "sessionJwt": "eyJ............"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/sms:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Authorization: Bearer eyJ......' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp": "123456",
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789"
}'
```
{% endtab %}
{% endtabs %}

## Identify the user

At this point you can identify the user via their User ID.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

And return their connected wallets

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/wallets" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## Next steps

### Scenario 1

If a user has not completed onboarding they will need to finish any remaining or all of the following steps:

* [Have a deposit address assigned](../integration-guides/api/assign-a-deposit-address.md)
* [Be KYC approved](../integration-guides/api/kyc.md)
* [Have a verified bank account](../integration-guides/api/link-and-verify-a-bank-account/)

You are free to complete the remaining tasks in any order, however we recommend the sequence mentioned above.

### Scenario 2

If a user has completed onboarding they are able to:

* [Re-link a bank account](../integration-guides/api/link-and-verify-a-bank-account/re-link-bank-account.md)
* [Replace an existing bank account](../integration-guides/api/link-and-verify-a-bank-account/update-bank-account.md)
* [Remove an existing bank account](../integration-guides/api/link-and-verify-a-bank-account/delete-bank-account.md)
* [Buy crypto](../integration-guides/api/buy-crypto-ach.md)
* [View their transaction activity](../reference/api/activity.md)

### Scenario 3

In some cases a user may be flagged in our system and prevented from using the application to buy crypto

* [View their transaction activity](../reference/api/activity.md)
* [Re-link a bank account](../integration-guides/api/link-and-verify-a-bank-account/re-link-bank-account.md)
* [Replace an existing bank account](../integration-guides/api/link-and-verify-a-bank-account/update-bank-account.md)
* [Remove an existing bank account](../integration-guides/api/link-and-verify-a-bank-account/delete-bank-account.md)
