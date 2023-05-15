---
description: >-
  Users must be able to access their complete Ratio user account transaction
  history from within your application.
---

# Transaction History

## Paginated List of all Transactions

Use the following endpoint to retrieve a paginated list of transaction activity for the user account

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/activity" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="info" %}
Note: This endpoint returns all transaction activity on the user account, regardless of whether the transaction was initiated by your clientID
{% endhint %}

## Transaction Detail View

Refer to the [UI Requirements](../../reference/ui-requirements.md) for the transaction data and customer notices that must be presented to the user when viewing individual transaction records.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/activity/{activityId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}
