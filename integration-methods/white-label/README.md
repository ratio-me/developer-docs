# White Label

If you wish to build a fully white-labeled solution using Ratio, you may do so by obtaining a `Client Id` and then integrating our [RESTful APIs](../../reference/api/).&#x20;

Most of our APIs rely on user authentication; you should start by getting to know our [Auth](../../reference/api/auth/) APIs. We use JWTs and Bearer token authentication for our APIs; you will get this back upon successful authentication. Additionally, any of our `write` APIs require two auth factors; to add another auth factor to your current session, you should include the JWT in that request. If you're making `read` calls, we do not require a second auth factor.

Once you have your JWT, include that in a standard `Authorization: Bearer <jwt>` header for further API calls.

You can use our [User](../../reference/api/users.md) endpoints to create a user account with Ratio or our [Wallet](../../reference/api/wallets.md) APIs to add deposit wallets to a user's account.

If you want to use our [Bank](../../reference/api/bank.md) APIs to purchase crypto from fiat in a user's bank account, you need to request a bank link token, which you need to [provide to Plaid](../../guides/plaid-bank-linking.md) to perform a token exchange flow with Ratio.
