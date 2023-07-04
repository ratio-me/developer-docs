# Crypto Wallet

### Overview

Authenticating with a crypto wallet requires two steps to authenticate a user. The first step is to retrieve a challenge phrase to be signed with the user's wallet, and then a second call provides that signature with that wallet address. This will return you an authenticated JWT.

#### Start Crypto Wallet Challenge

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:start" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="warning" %}
If you're calling either of the Crypto Wallet endpoints for the purposes of starting a **Client Session**, make sure you send the `ratio-client-session-id` header, rather than the `ratio-client-id` and `ratio-client-secret` headers.
{% endhint %}

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

#### Authenticate Crypto Wallet

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

#### Add New Signing Wallet

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:addToUser" method="post" %}
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
    "walletType": "EVM"
}'
```
{% endtab %}
{% endtabs %}
