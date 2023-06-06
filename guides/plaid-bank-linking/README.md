# Plaid Bank Linking

Users will link their bank account to Ratio using Plaid. You do not need to set up an account with Plaid.

{% hint style="info" %}
Note: For detailed examples of the API calls below, check out our [API documentation](broken-reference).
{% endhint %}

{% hint style="warning" %}
If you are building an iOS or Web application you need to provide us with a **redirect URI** so that we can configure Plaid to properly redirect users to your application. If you are building an Android app, you need to provide us with the **Android Package Name.** These values need to match what you send in your`requestLink` calls
{% endhint %}

## Requesting a Plaid Link Token

The first step in connecting a user's bank account is to request a [Link Token](../../api-reference/types-glossary.md#requestbanklinkresponse) from our API, then pass that Link Token into Plaid's SDK.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

You now have a link token that looks something like this: `link-sandbox-ab12c3d4-0000-123a-987f-26e621c2ee51`. This token needs to be provided to Plaid through one of several methods:

### SDKs

Below you will find links to the Plaid SDKs used to launch the Plaid bank account authentication flow.

{% hint style="info" %}
Note: You do not need to sign up for a Plaid account.  You will use the link token provided by Ratio in order to initiate the Plaid SDK from within your application.
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

## Activate the Plaid Link SDK

Now that you have a public token, you can proceed with the next step, which is to open Plaid Link SDK using the public token you requested from Ratio above.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:activateLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

Once you open the Plaid Link SDK, monitor for onSuccess and onExit events.

If onSuccess - the user has successfully linked their bank account and you proceed with adding the bank account to the user account

If onExit - the user did not successfully authenticate their account (closed the Plaid SDK, bank connect was down, etc.) and you should bring them back to the screen that you are launching Plaid from&#x20;

### Reconnecting Accounts

Bank account connections can be disconnected from time to time, possibly at the request of the user or the financial institution. If a user wishes to perform a transaction, but the bank link has been disconnected, you will receive a [bankLinkstatus = "LOGIN\_REQUIRED"](https://app.gitbook.com/o/rMOFEmlooWU9OMmsW6eC/s/CUFO0IuHQJVzBX1zbmIL/\~/changes/117/reference/types-glossary#banklinkstatus) . To repair this, request an update token and go through the Plaid flow again.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}
