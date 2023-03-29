# Browser Based

## Overview

Our browser-based integration method is the easiest way to get started with Ratio. This can be deployed anywhere you can embed HTML, such as an iframe or a mobile web view. All you need to get started is a Client ID and a signing wallet.

If you are integrating Ratio into a **mobile app** we strongly recommend using our [react-native](react-native/ "mention")SDK instead.  The React Native SDK manages the session token and wallet authentication on your behalf.  It also handles redirects and provides a series of callbacks you can use to streamline communication between Ratio and your app.&#x20;

{% hint style="warning" %}
The Ratio API uses client authentication which requires a `client_id` and `client_secret.` This client secret should be treated securely and should be protected within your backend.
{% endhint %}

## Creating a Session

The first step to integrating our browser flow is to create a session for that user. You can do that by calling the Create Session endpoint:

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/client/sessions" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="info" %}
You must provide the address and network of the signing wallet, however, the address of the deposit wallet is optional.&#x20;

If you provide it, then it will be set up as the destination for purchased funds, however, if not provided, then we will use the signing wallet.
{% endhint %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "signingAddress": "0x0000000000000000000000000000000000000000",
    "signingNetwork": "ETHEREUM"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "id": "dev-5425a040-9854-4055-a484-cbee1fd8a7d6",
    "createTime": "2023-03-28T21:47:05.095Z",
    "updateTime": "2023-03-28T21:47:05.095Z",
    "signingAddress": "0x0000000000000000000000000000000000000000",
    "signingNetwork": "ETHEREUM",
    "depositAddress": "0x0000000000000000000000000000000000000000",
    "depositNetwork": "ETHEREUM"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/client/sessions' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "signingAddress": "<WALLET_ADDRESS>",
    "signingNetwork": "<ETHEREUM_OR_POLYGON>"
}'
```
{% endtab %}
{% endtabs %}

Note the `id` field for later API calls, this is your user's unique session ID.

## Wallet Signing

The next step to integrating our embedded partner flow is to have the user sign in with their crypto wallet, this allows a user to use their wallet as a primary and familiar means of authentication with Ratio, regardless of from where they access it.&#x20;

For more information on the APIs themselves, you should read our Crypto Wallet authentication docs. Note, this is a two-step process, the first call `cryptoWallet:start` takes in the `walletAddress` to return you a `challenge`. You need to have the signing wallet sign that entire string, then call `cryptoWallet:authenticate` with the signature.

{% content-ref url="../reference/api/auth/crypto-wallet.md" %}
[crypto-wallet.md](../reference/api/auth/crypto-wallet.md)
{% endcontent-ref %}

In this specific case, you should make sure to set the `ratio-client-session-id` header to the session ID value you received when you created the session. This will enable us to bridge our browser embed with your user's wallet. For example:

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
curl --location -g --request POST 'https://api.ratio.me/v1/auth/cryptoWallet:start' \
--header 'ratio-client-session-id: <SESSION_ID>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletNetwork": "<ETHEREUM_OR_POLYGON>"
}'
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
It is important to use the `ratio-client-session-id` header in this instance, this allows us to properly bridge the embedded session with the authenticated user.
{% endhint %}

When you receive a successful authentication, you can proceed to the final bridging step.

## Bridge to Embed

Once you have called the `cryptoWallet:authenticate` endpoint and have successfully authenticated your user, you can construct the URL for that user's session: [`https://app.ratio.me/login/partner?session_id=<session_id>`](https://app.ratio.me/login/partner?session\_id=%3Csession\_id%3E) This is a secure, unique URL for that user's session, you may embed and navigate to that URL to allow the user to continue to use Ratio, completing the bridging between your native experience and Ratio's embedded flow.

{% hint style="info" %}
The user will have to provide a second authentication factor to ensure their security within the Ratio embed.
{% endhint %}

## Example

{% @figma/embed fileId="w05Slr69znyhMUSh6XNsJl" nodeId="0:1" url="https://www.figma.com/file/w05Slr69znyhMUSh6XNsJl/Ratio-Experience-Flows?node-id=0:1&t=l091gifm0Uv1HJhU-1" %}
