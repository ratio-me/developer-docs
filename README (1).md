# Getting Started

## Step 1: Obtain a ClientID & Secret

All API requests require a clientID and a secret. Email us at [team@ratio.me](mailto:team@ratio.me) to obtain a clientID and secret.

### Base URLs

Production:  [https://api.ratio.me/](https://api.staging.ratio.me/)

Sandbox: _Coming in July. Our React Native SDK is plug and play and does not require testing in lower level environments.  If you ware planning to white label our API we will work with you 1:1 to streamline and test your integration in our production environment._

## Step 2: Select an Implementation Method

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><strong>API</strong></td><td>You own the user experience. We manage user data, compliance, and risk</td><td></td><td><a href="integration-methods/white-label/">white-label</a></td><td><a href=".gitbook/assets/White Label (5).png">White Label (5).png</a></td></tr><tr><td><strong>React Native SDK</strong></td><td>A drop-in SDK for iOS and Android applications</td><td></td><td><a href="integration-guides/react-native/">react-native</a></td><td><a href=".gitbook/assets/React Native.png">React Native.png</a></td></tr><tr><td><strong>React JS - Alpha</strong></td><td>An out of the box fiat on/off ramp for your web app</td><td></td><td><a href="integration-guides/react-alpha/">react-alpha</a></td><td><a href=".gitbook/assets/JS.png">JS.png</a></td></tr></tbody></table>

## Step 3: Provide a Redirect URI and/or Android Package Name

Users will link their bank account to Ratio using Plaid. You do not need to set up an account with Plaid, however, you do need to provide a way for us to redirect users to your application once they have linked their bank account to their Ratio user account.

Please send the redirect URI and/or Android Package Name to team@ratio.me.

### If you are building a Web app, React Native app, or iOS app

Provide a **redirect URI**. This value must match what you send in your `requestLink` calls

### If you are building an Android app

Provide an **Android Package Name** that matches what you send in your`requestLink` calls

## Step 4: Install the Plaid SDK (mobile apps only)

<details>

<summary>Expand for info about Plaid's React Native, iOS, and Android SDKs</summary>

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



</details>
