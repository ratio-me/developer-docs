# White Label

If you wish to build a fully white-labeled solution using Ratio, you may do so by obtaining a `Client Id` and `Client Secret` and then integrating our [RESTful APIs](../../reference/api/).&#x20;

{% hint style="info" %}
Most of our APIs require a `ratio-client-id` and `ratio-client-secret` in the headers when you make your request.
{% endhint %}

Most of our APIs rely on user authentication; you should start by getting to know our [Auth](../../reference/api/auth/) APIs. We use JWTs and Bearer token authentication for our APIs; you will get this back upon successful authentication. Additionally, any of our `write` APIs require two auth factors; to add another auth factor to your current session, you should include the JWT in that request. If you're making `read` calls, we do not require a second auth factor.

Once you have your JWT, include that in a standard `Authorization: Bearer <jwt>` header for further API calls.

You can use our [User](../../reference/api/users.md) endpoints to create a user account with Ratio or our [Wallet](../../reference/api/wallets.md) APIs to add deposit wallets to a user's account.

In order to make a crypto purchase from a bank account using our [Bank](../../reference/api/bank.md) APIs, you need to first [request a bank link](../../reference/api/bank.md#request-bank-link) token. This token is then used with the [Plaid Link SDK](../../guides/plaid-bank-linking/) to allow a user to sign into Plaid and connect their bank account. At the end of this flow, you can listen to a `success` event from the SDK and obtain a `public token` (see the particular SDK's documentation for specifics). Send this token back to Ratio through the [activate link API](../../reference/api/bank.md#activate-bank-link) and we'll finish connecting a user's bank account.
