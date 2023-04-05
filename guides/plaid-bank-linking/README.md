# Plaid Bank Linking

We use Plaid to enable users to [link](https://plaid.com/plaid-link/) their bank accounts to Ratio, which they can use to purchase crypto from fiat in their bank.

{% hint style="info" %}
Note: For detailed examples of the API calls below, check out our [API documentation](../../reference/api/bank.md).
{% endhint %}

## Requesting a Link

The first step in connecting a user's bank account is to request a [Link Token](../../reference/api/types-glossary.md#requestbanklinkresponse) from our API, then pass that Link Token into Plaid's SDK.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

You now have a link token that looks something like this: `link-sandbox-ab12c3d4-0000-123a-987f-26e621c2ee51`. This token needs to be provided to Plaid through one of several methods:

### SDKs

Below you will find links to the various SDKs Plaid provides to launch Plaid Link.

{% hint style="info" %}
Note: You only need to install the UI components into your app and handle events such as onSuccess. You do **not** need to go through any Plaid dashboard or account configuration, simply use the link token provided by Ratio.
{% endhint %}

#### React Native SDK

* To install, run: `npm install --save react-native-plaid-link-sdk`
* Github Repo ([https://github.com/plaid/react-native-plaid-link-sdk](https://github.com/plaid/react-native-plaid-link-sdk))
* Documentation ([https://plaid.com/docs/link/react-native/](https://plaid.com/docs/link/react-native/))

#### Android SDK

* Make sure you share your Android package name with Ratio (ex `com.plaid.example`)
* Add the SDK to your Gradle file ([https://search.maven.org/artifact/com.plaid.link/sdk-core](https://search.maven.org/artifact/com.plaid.link/sdk-core))
* Github Repo ([https://github.com/plaid/plaid-link-android](https://github.com/plaid/plaid-link-android))
* Documentation ([https://plaid.com/docs/link/android/](https://plaid.com/docs/link/android/))

#### iOS SDK

* Make sure you configure a Universal Link and share the redirect URL with Ratio ([https://developer.apple.com/ios/universal-links/](https://developer.apple.com/ios/universal-links/))
* To install with Cocoapods, run: `pod 'Plaid'`, see the documentation for other options.
* Github Repo ([https://github.com/plaid/plaid-link-ios](https://github.com/plaid/plaid-link-ios))
* Documentation ([https://plaid.com/docs/link/ios/](https://plaid.com/docs/link/ios/))

#### Web (React)

* To install, run: `npm install --save react-plaid-link`&#x20;
* Github Repo ([https://github.com/plaid/react-plaid-link](https://github.com/plaid/react-plaid-link))
* Documentation ([https://plaid.com/docs/link/web/](https://plaid.com/docs/link/web/))

#### Webview

You can also launch the Plaid Link flow inside a [webview](https://plaid.com/docs/link/webview/), requiring minimal UI work. To do so,  create a URL like so `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token="GENERATED_LINK_TOKEN"` and open it inside a webview. This will also emit events for you to consume to obtain the public token.

## Activating Link

Now that you have a public token, you can proceed with the next step, which is activating the link between Ratio and Plaid.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:activateLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

If you receive a successful response, the bank account has been linked, and you may proceed to make purchases.

### Reconnecting Accounts

Plaid Links can expire or disconnect from time to time, possibly at the request of the user or the financial institution. If a user wishes to perform a transaction, but the bank link has been disconnected, you will receive a response indicating such. To repair this, request an update token and go through the Plaid flow again.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}
