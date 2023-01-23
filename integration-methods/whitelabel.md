# White Label

If you wish to build a fully white-labeled solution using Ratio, you may do so by obtaining a `Client Id` and then integrating our [RESTful APIs](../reference/api-reference/).&#x20;

Most of our APIs rely on user authentication; you should start by getting to know our [Auth](../reference/api-reference/auth/) APIs. We use JWTs and Bearer token authentication for our APIs; you will get this back upon successful authentication. Additionally, many of our APIs require two auth factors; to add another auth factor to your current session, you should include the JWT in that request.

Once you have your JWT, include that in a standard `Authorization: Bearer <jwt>` header for further API calls.

You can use our [User](../reference/api-reference/users.md) endpoints to create a user account with Ratio or our [Wallet](../reference/api-reference/wallets.md) APIs to add deposit wallets to a user's account.

If you want to use our [Bank](../reference/api-reference/bank.md) APIs to purchase crypto from fiat in a user's bank account, you need to request a bank link token, which you need to [provide to Plaid](../guides/plaid-bank-linking.md) to perform a token exchange flow with Ratio.
