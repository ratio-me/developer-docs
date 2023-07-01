---
description: Follow these steps to get started with Ratio
---

# Getting Started

## Step 1: Obtain a ClientID & Secret

Request Sandbox credentials by emailing us at [team@ratio.me](mailto:team@ratio.me)

### Base URLs

Sandbox: [https://api.sandbox.ratio.me/](https://api.sandbox.ratio.me/)

Production:  [https://api.ratio.me/](https://api.ratio.me/)

## Step 2: Select an Integration Method

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><strong>API</strong></td><td>You own the user experience. We manage user data, compliance, and risk</td><td></td><td><a href="integration-methods/white-label/">white-label</a></td><td><a href=".gitbook/assets/White Label.png">White Label.png</a></td></tr><tr><td><strong>React Native SDK</strong></td><td>A drop-in SDK for iOS and Android applications</td><td></td><td><a href="integration-guides/react-native/">react-native</a></td><td><a href=".gitbook/assets/React Native (1).png">React Native (1).png</a></td></tr><tr><td><strong>React JS - Beta</strong></td><td>An out of the box fiat on/off ramp for your web app</td><td></td><td><a href="integration-guides/react-js-alpha/">react-js-alpha</a></td><td><a href=".gitbook/assets/JS (1).png">JS (1).png</a></td></tr></tbody></table>

## Step 3: Review the Sandbox Test Data

Review the [sandbox test data](https://app.gitbook.com/o/rMOFEmlooWU9OMmsW6eC/s/CUFO0IuHQJVzBX1zbmIL/\~/changes/150/guides/sandbox-testing) you will use to product predictable API responses.

## Additional Setup for Mobile Apps&#x20;

### Provide a Redirect URI or Android Package Name

Users will link their bank account to their Ratio account using Plaid. You must provide us with a redirect URI or Android package name.

You do not need to set up an account with Plaid since the user is connecting to Ratio directly. &#x20;

Please send the redirect URI or Android package name to team@ratio.me.

#### iOS apps

Provide a **redirect URI** that matches what you send in your `requestLink` calls

#### Android apps

Provide an **Android Package Name** that matches what you send in your `requestLink` calls

### Install the Plaid SDK

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
