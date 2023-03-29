# 🤝 Client

## Overview

If you're looking to integrate with our embedded Ratio widget, these are the APIs you need to implement within your app.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/client/sessions" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="info" %}
Note that after creating a **Client Session**, you must still authenticate it with a [**Crypto Wallet**](auth/crypto-wallet.md). The id you receive in the create response will go in the `ratio-client-session-id` headers of those auth calls.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/client/sessions/{sessionId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}
