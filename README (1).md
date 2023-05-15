# Getting Started

## Step 1: Obtain a ClientID & Secret

All API requests require a clientID and a secret. Email us at [team@ratio.me](mailto:team@ratio.me) to obtain a clientID and secret.

### Base URLs

Production:  [https://api.ratio.me/](https://api.staging.ratio.me/)

Sandbox: _Coming in July. Our React Native SDK is plug and play and does not require testing in lower level environments.  If you ware planning to white label our API we will work with you 1:1 to streamline and test your integration in our production environment._

## Step 2: Select an Implementation Method

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><strong>API</strong></td><td>You own the user experience. We manage user data, compliance, and risk.</td><td></td><td><a href="integration-methods/white-label/">white-label</a></td><td><a href=".gitbook/assets/White Label (5).png">White Label (5).png</a></td></tr><tr><td><strong>React Native SDK</strong></td><td>A drop-in SDK for iOS and Android applications.</td><td></td><td><a href="integration-methods/react-native/">react-native</a></td><td><a href=".gitbook/assets/React Native.png">React Native.png</a></td></tr></tbody></table>

## Step 3: Install the Plaid SDK

### Plaid SDK

Users will link their bank account to Ratio using Plaid. You do not need to set up an account with Plaid.

<details>

<summary>Install one of the Plaid SDKs below</summary>

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

</details>

{% hint style="info" %}
If you are building an iOS or Web application you need to provide us with a **redirect URI** so that we can configure Plaid to properly redirect users to your application. If you are building an Android app, you need to provide us with the **Android Package Name.** These values need to match what you send in your`requestLink` calls
{% endhint %}
