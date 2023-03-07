---
description: Support Oauth Insitutions and more
---

# Configure Plaid

{% hint style="success" %}
Make sure that you have installed **** [`react-native-plaid-link-sdk`](installation.md)``
{% endhint %}

{% hint style="info" %}
In order to support the Plaid OAuth flow on iOS you must be able to accept Universal Links.  On Android you must provide Android Package Name. See below for instructions.
{% endhint %}

## Tasks

* [ ] iOS: Provide your redirect URI to the Ratio team so that we can add it to our configuration.
* [ ] Android: Provide your app's Android Package Name to the Ratio team so that we can add it to our configuration

## Plaid OAuth Institutions &#x20;

| Chase           |
| --------------- |
| Capital Once    |
| Wells Fargo     |
| Bank of America |
| USAA            |
| US Bank         |
| Robinhood       |
| Charles Schwab  |



## iOS

Follow the [instructions for adding Universal Links to your app](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?language=objc) and how to create and Apple App Site Association file that will be hosted at `https://<your-domain>/.well-known/apple-app-site-association`. This will allow the Plaid SDK to return back to your application after OAuth authentication has been complete.

Here is a sample `apple-app-site-association` file

```
{
   "applinks":{
      "details":[
         {
            "appIDs":[
               "<YOUR APP IDENTIFIER>"
            ],
            "components":[
               {
                  "/":"/plaid/*",
                  "comment":"Matches any URL whose path matches /plaid/*"
               }
            ]
         }
      ]
   }
}

```

You will also need to add Associated Domains Entitlement to your app and the associated domains feature to your app ID, which is documented [here](https://developer.apple.com/documentation/Xcode/supporting-associated-domains?language=objc).

Example entitlements file for iOS which should be called `<your-app>.entitlements`

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>aps-environment</key>
	<string>development</string>
	<key>com.apple.developer.associated-domains</key>
	<array>
		<string>applinks:<YOUR-DOMAIN></string>
	</array>
</dict>
</plist>

```

{% hint style="success" %}
Provide your redirect URI to the Ratio team so that we can add it to our configuration.
{% endhint %}



## Android

Provide your Android Package Name to the [`RatioComponent`](session-and-client-auth.md)``

{% hint style="success" %}
Provide your app's Android Package Name to the Ratio team so that we can add it to our configuration
{% endhint %}

## Expo

If you are using Expo, you still need to go through the steps above, and also review [Expo's documentation for handling Deep Linking](https://docs.expo.dev/guides/deep-linking/).



## OAuth Reference at Plaid

If you want additional information about how Plaid OAuth works, you can refer directly to their documentation [here](https://plaid.com/docs/link/oauth/), or, ask us and we will help to ensure that you have configured Plaid properly

##

