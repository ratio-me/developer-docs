# Partner

## Overview

If you're looking to integrate with our embedded Ratio widget, these are the APIs you need to implement within your app.

There are three steps to beginning an embedded <mark style="color:orange;">partner session</mark>: the first is to obtain a challenge phrase for a given crypto wallet, the second is to _**sign**_ that phrase with your wallet, and the third is to pass that signature back to Ratio to obtain your unique <mark style="color:orange;">session URL</mark>.

{% hint style="info" %}
Our wallet signing APIs currently support either Ethereum or Solana wallets, and require you to provide your Client ID in the header so that the user's session can be appropriately attributed to you.
{% endhint %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/partner/auth/cryptoWallet:start" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/partner/auth/cryptoWallet:authenticate" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}
