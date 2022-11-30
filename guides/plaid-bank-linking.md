# Plaid Bank Linking

We use Plaid to enable users to [link](https://plaid.com/plaid-link/) their bank accounts to Ratio, which they can use to purchase crypto from fiat in their bank.

There are several steps involved in linking a bank account with Plaid, the first of which requires you to request a Link Token on behalf of the user.

{% hint style="info" %}
Note: For detailed examples, check out our [API documentation](../reference/api-reference/bank.md).
{% endhint %}

### Plaid Link

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:requestLink" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

You now have a link token that looks something like this: `link-sandbox-ab12c3d4-0000-123a-987f-26e621c2ee51`. This token needs to be provided to Plaid through one of several methods:

#### React Native SDK

Using [Plaid's React Native SDK](https://plaid.com/docs/link/react-native/) provides a component that will take your link token and returns a public token on success.

#### Android & iOS Native SDKs

Similar to the React Native SDK, these provide UI components for launching the Plaid Link flow. [https://plaid.com/docs/link/ios/](https://plaid.com/docs/link/ios/) - [https://plaid.com/docs/link/android/](https://plaid.com/docs/link/android/)

#### Webview

You can also launch the Plaid Link flow inside a [webview](https://plaid.com/docs/link/webview/), requiring minimal UI work. To do so,  create a URL like so `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token="GENERATED_LINK_TOKEN"` and open it inside a webview. This will also emit events for you to consume to obtain the public token.

### Activating Link

Now that you have a public token, you can proceed with the next step, which is activating the link between Ratio and Plaid.&#x20;

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:activateLink" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

If you receive a successful response, the bank account has been linked, and you may proceed to make purchases.

### Reconnecting Accounts

Plaid Links can expire or disconnect from time to time, possibly at the request of the user or the financial institution. If a user wishes to perform a transaction, but the bank link has been disconnected, you will receive a response indicating such. To repair this, request an update token and go through the Plaid flow again.&#x20;

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}
