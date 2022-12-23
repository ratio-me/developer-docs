# 🪙 Crypto Wallet

## Overview

Authenticating with a crypto wallet requires two steps to authenticate a user. The first step is to retrieve a challenge phrase to be signed with the user's wallet, and then a second call provides that signature with that wallet address. This will return you an authenticated JWT.

{% hint style="info" %}
Our wallet-signing APIs currently support either <mark style="color:blue;">`ETHEREUM`</mark> or <mark style="color:purple;">`SOLANA`</mark> wallets, and require you to provide your Client ID in the header so that the user's session can be appropriately attributed to you.
{% endhint %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="undefined" method="undefined" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletNetwork": "ETHEREUM"
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
curl --location -g --request POST 'https://<RATIO_API_URL>/v1/auth/cryptoWallet:start' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletNetwork": "<ETHEREUM_OR_SOLANA>"
}'
```
{% endtab %}
{% endtabs %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:authenticate" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletNetwork": "ETHEREUM",
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
curl --location -g --request POST 'https://<RATIO_API_URL>/v1/auth/cryptoWallet:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletNetwork": "<ETHEREUM_OR_SOLANA>",
    "signature": "<SIGNED_CHALLENGE_STRING>"
}'
```
{% endtab %}
{% endtabs %}
