# 🏦 Bank

## Overview

The following endpoints provide APIs to allow you to manage a user's bank connections and perform actions with those bank accounts, for example, ACH transactions.

To understand how we link bank accounts with Plaid, check out our documentation on [Plaid Bank Linking](../../guides/plaid-bank-linking.md).

There are three steps to linking a user's bank account:

1. Requesting a Plaid Link token
2. Presenting the Plaid Link modal to the user by passing it the link token (see docs).
3. Capturing the public token from the Plaid Link modal and activating their account with Ratio.

{% hint style="info" %}
Note: Sometimes bank accounts can become disconnected and require the user to log in once more. We provide an update link token endpoint for this exact reason.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:activateLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="delete" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

Once a bank has been linked, use the following endpoint to make a crypto purchase via ACH.&#x20;

{% hint style="info" %}
Please see our list of [supported currencies](../supported-currencies.md) or our [Currency enum](types-glossary.md#currency) for reference on formatting and network support.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}/ach" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}
