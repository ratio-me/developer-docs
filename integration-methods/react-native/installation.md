---
description: Follow the steps below to install the Ratio React Native Library
---

# Installation

<div align="left">

<figure><img src="https://img.shields.io/npm/v/@ratio.me/ratio-react-native-library?color=blue&#x26;style=flat-square" alt="Library version"><figcaption></figcaption></figure>

</div>

```
npm install @ratio.me/ratio-react-native-library
```

or

```
yarn add @ratio.me/ratio-react-native-library
```

## Peer Dependencies

Our library has a peer dependancy on the following\
\
\- `react-native-webview: "11.x"` \
\- `react-native-plaid-link-sdk: "9.x"`\
\- `react-native-svg: "12.x || 13.x"`

This means you must add `react-native-webview,` `react-native-svg` , and `react-native-plaid-link-sdk`as dependancies by running the following

```
npm install react-native-webview --save 
npm install react-native-svg --save
npm install react-native-plaid-link-sdk --save
```

or

```
yarn add react-native-webview
yarn add react-native-svg
yarn add react-native-plaid-link-sdk
```

**NOTE**: it is important to make sure you use the `--save` flag, this will make sure the native code is autolinked. Read more about React Native Auto linking [here](https://reactnative.dev/docs/linking-libraries-ios)

Read more about `react-native-webview` [here](https://github.com/react-native-webview/react-native-webview)

Read more about `react-native-svg` [here](https://github.com/software-mansion/react-native-svg)

Read more about `react-native-plaid-link-sdk` [here](https://plaid.com/docs/link/react-native/)

{% hint style="warning" %}
If your application requires that external traffic is whitelisted, please reach out to us for a list of domains that will need to be whitelisted in your application package.  The list includes OAuth connected banks such as Chase.
{% endhint %}

{% hint style="warning" %}
You must configure the Plaid SDK to work with OAuth. Please follow the steps [here](../../guides/plaid-bank-linking/plaid-oauth-support.md)
{% endhint %}
