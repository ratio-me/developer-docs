# 👛 Wallets

## Overview

The following endpoints provide APIs to allow you to manage a user's <mark style="color:green;">wallets</mark>. A connected <mark style="color:green;">wallet</mark> is required in order for a user to begin making crypto purchases.&#x20;

Additionally, a <mark style="color:green;">wallet</mark> can be given a nickname, for example `Ratio Wallet`, to help with differentiation. This can be done when the <mark style="color:green;">wallet</mark> is connected, or by calling our update endpoint.

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/wallets" method="get" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/wallets" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/wallets/{walletId}" method="get" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/wallets/{walletId}" method="patch" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}
