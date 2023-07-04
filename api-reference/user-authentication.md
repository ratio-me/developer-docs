---
description: >-
  This page provides information about the three authentication methods we
  support: wallet, sms, email.
---

# User Authentication

{% hint style="info" %}
Ratio user accounts are accessible across a wide variety of applications. You must [implement Account Linking](../guides/link-a-new-signing-wallet-to-an-existing-user.md) so that existing Ratio users can link your application to their account and bypass onboarding
{% endhint %}



## Crypto wallet

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:start" method="post" %}
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
    "walletEvm": "EVM"
}'
```
{% endtab %}
{% endtabs %}

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

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:addToUser" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletType": "EVM",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/auth/cryptoWallet:addToUser' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletType": "EVM",
}'
```
{% endtab %}
{% endtabs %}

## SMS OTP

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:send" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:authenticate" method="post" %}
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

## Email OTP

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/email:send" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/email:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "emailAddress": "ratiouser@example.com"
}
```


{% endtab %}

{% tab title="Response" %}
```json
{
    "emailId": "email-test-01234abc-0000-0000-0000-0123456789",
    "emailMask": "rat...@example.com"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/email:send' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "emailAddress":"ratiouser@example.com"
}'
```


{% endtab %}
{% endtabs %}

