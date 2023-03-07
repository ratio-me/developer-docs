# Browser Based

## Overview

The easiest way to get started with Ratio is using our browser-based integration method. This can be deployed anywhere you can embed HTML, such as an iframe or a mobile web view. All you need to get started is a Client ID and a signing wallet.



If you are integrating Ratio into a mobile app we strongly recommend using our [react-native](react-native/ "mention")SDK instead.  The React Native SDK manages the session token and wallet authentication on your behalf.  It is also handles redirects and provides a series of callbacks you can use to streamline communication between Ratio and your app.&#x20;

## Wallet Signing

The first step to integrating our embedded partner flow is to have the user sign in with their crypto wallet, this allows a user to use their wallet as a primary and familiar means of authentication with Ratio, regardless of from where they access it.&#x20;

{% hint style="info" %}
If you want to provide a different deposit address to be used in the embed than the one used for the signing transaction, you can set that here.
{% endhint %}

For more information on the APIs themselves, look at our partner auth endpoints:&#x20;

{% content-ref url="../reference/api/client.md" %}
[client.md](../reference/api/client.md)
{% endcontent-ref %}

## Bridge to Embed

Once you have called the `authenticate` endpoint and have received a URL, you'll note it has a unique session ID in the path. That is a securely generated unique URL for that user's session, you may embed and navigate to that URL to allow the user to continue to use Ratio, completing the bridging between your native experience and Ratio's embedded flow.

{% hint style="info" %}
The user will have to provide a second authentication factor to ensure their security within the Ratio embed.
{% endhint %}

## Example

{% @figma/embed fileId="w05Slr69znyhMUSh6XNsJl" nodeId="0:1" url="https://www.figma.com/file/w05Slr69znyhMUSh6XNsJl/Ratio-Experience-Flows?node-id=0:1&t=l091gifm0Uv1HJhU-1" %}
