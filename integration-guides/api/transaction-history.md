# Transaction History

## Retrieve a Specific Transaction

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/activity/{activityId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## Retrieve a Paginated List of all Transactions

Use the following endpoint to retrieve a paginated list of transaction activity for the user account

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/activity" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="info" %}
Note: This endpoint returns all transaction activity on the user account, regardless of whether the transaction was initiated by your clientID
{% endhint %}

For more information on transaction activity see our [user activity matrix here](broken-reference)
