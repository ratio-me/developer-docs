---
description: >-
  The Ratio React Native SDK allows partners to embed and connect to Ratio’s
  application from their React Native application.
---

# React Native

The React Native SDK provides a `RatioComponent` component that requires a few parameters (listed below). This component allows for a few customizations so that it can be placed anywhere within your app.

The `RatioComponent` takes a child view that is wrapped using a `<TouchableOpacity/>` component. This means that whatever view is passed into the `RatioComponent` will be clickable. Our suggestion is to use the view as a custom "button" to allow users access Ratio services.

## Requirements

To use the SDK you must first acquire a `clientId` and `clientSecret` from the Ratio team. Learn how to request API keys [here](../white-label/quick-start.md#get-your-api-keys).

Ratio will provide an API that you will be required to wrap in your own back end (see example below)

## Installation

<figure><img src="https://img.shields.io/npm/v/@ratio.me/ratio-react-native-library?color=blue&#x26;style=flat-square" alt="Library version"><figcaption></figcaption></figure>

`npm install @ratio.me/ratio-react-native-library`

or

`yarn add @ratio.me/ratio-react-native-library`

#### Peer Dependencies

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

`or`

```
yarn add react-native-webview
yarn add react-native-svg
yarn add react-native-plaid-link-sdk
```

**NOTE**: it is important to make sure you use the `--save` flag, this will make sure the native code is autolinked. Read more about React Native Auto linking [here](https://reactnative.dev/docs/linking-libraries-ios)

Read more about `react-native-webview` [here](https://github.com/react-native-webview/react-native-webview)

Read more about `react-native-svg` [here](https://github.com/software-mansion/react-native-svg)

Read more about `react-native-plaid-link-sdk` [here](https://plaid.com/docs/link/react-native/)

### Integrating Plaid OAuth

**NOTE:** In order to support OAuth with different banks (e.g. Chase) you must follow the instructions in Plaid's documentation to be able to accept Universal Links on iOS and an Android Package Name on Android. This documentation is provided [here](https://plaid.com/docs/link/oauth/). Below is a high level description of a few of the steps.

#### iOS

For iOS: Follow the instructions for adding Universal Links to your app ([here](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content?language=objc)) and how to create and Apple App Site Association file that will be hosted at `https://<your-domain>/.well-known/apple-app-site-association`. This will allow the Plaid SDK to return back to your application after OAuth authentication has been complete.

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

You will also need to add Associated Domains Entitlement to your app and the associated domains feature to your app ID. Follow the documentation [here](https://developer.apple.com/documentation/Xcode/supporting-associated-domains?language=objc) to learn how.

Here is an example entitlements file for iOS which should be called `<your-app>.entitlements`

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

**NOTE**: You must provide your redirect URI to the Ratio team so that we can add it to our configuration.

#### Android

To support OAuth with Plaid, you will need to provide your Android Package Name to the `RatioComponent`. This is described below.

**NOTE**: You must provide your app's Android Package Name to the Ratio team so that we can add it to our configuration

#### Expo

If you are using Expo, the above still applies, but also look at the documentation for handling Deep Linking [here](https://docs.expo.dev/guides/deep-linking/)



## Usage

{% code lineNumbers="true" %}
```tsx
import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Web3 from 'web3';
import {
  RatioComponent,
  RatioOrderStatus,
} from '@ratio.me/ratio-react-native-library';

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  buyCryptoButton: {
    backgroundColor: 'black',
    width: 185,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  buyText: {
    color: 'white',
  },
});

const provider ='WEB3_PROVIDER_URL';
const privateKey =
  'WALLET_PRIVATE_KEY';
const walletSigningAddress = 'SIGNING_ADDRESS';
const walletNetwork = 'WALLET_NETWORK';
const walletDepositAddress = 'DEPOSIT_ADDRESS';

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [ratioUser, setRatioUser] = useState(null)
  
  const fetchSessionToken = async () => {
    try {
      let sessionTokenResponse = await fetch(
        'https://your.api.com/clients/session',
        {
          method: 'POST',
          body: JSON.stringify({
            signingAddress: walletAddress,
            depositAddress: walletAddress,
            signingNetwork: walletNetwork,
          }),
        }
      );

      let data = await sessionTokenResponse.json();
      return data.id;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const redirectUri = () => {
    if(Platform.OS === 'ios') {
        return 'https://<YOUR-DOMAIN>/plaid/oauth'
    }
    return null
  }

  const androidPackageName = () => {
      if(Platform.OS === 'android') {
          return 'me.ratio.sampleapp'
      }
      return null
  }
    
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {loading ? <ActivityIndicator /> : null}
      <View style={styles.buttonWrapper}>
        <RatioComponent
          fetchSessionToken={async () => {
            return await fetchSessionToken();
          }}
          signingCallback={async (challenge: string) => {
            // if you would like to perform a biometric check, this is where you can place it
            let sign = web3.eth.accounts.sign(challenge, privateKey);
            return Promise.resolve({
              signature: sign.signature,
            });
          }}
          onPress={() => {
            setLoading(true);
          }}
          onOpen={() => setLoading(false)}
          onTransactionComplete={(orderStatus: RatioOrderStatus) => {
            Alert.alert(orderStatus.status);
          }}
          onHelp={() => {
            Alert.alert('Help button pressed');
          }}
          onAccountRecovery={() => {
            Alert.alert('Account recovery button pressed');
          }}
          onError={(errorMessage: string) => {
            setLoading(false);
            Alert.alert(errorMessage);
          }}
          onClose={() => {}}
          onLogin={(user: RatioUser)=> { setRatioUser(user) }}
          redirectUri={redirectUri()}
          androidPackageName={androidPackageName()}
        >
         {/* view used as visible 'button' to press */}
          <View style={styles.buyCryptoButton}>
            <Text style={styles.buyText}>Buy Crypto</Text>
          </View>
        </RatioComponent>
      </View>
    </SafeAreaView>
  );
}
```
{% endcode %}



## Reference

### Props

#### **`fetchSessionToken`**&#x20;

A function that is used to fetch session token that is generated from the API that is used to wrap the ratio `/v1/clients/session` (documentation [here](../../reference/api/#client))

This is an `async` function.

The Ratio API uses client authentication which requires a `client_id` and `client_secret`. It is highly recommended to implement this call in a secure API backend. This will prevent the need of shipping the `clientSecret` with the client application.

```tsx
const fetchSessionToken = async () => {
  try {
    let sessionTokenResponse = await fetch(
      'https://your.api.com/clients/session',
      {
        method: 'POST',
        body: JSON.stringify({
          signingAddress: walletAddress,
          depositAddress: walletAddress,
          signingNetwork: walletNetwork,
        }),
      }
    );

    let data = await sessionTokenResponse.json();
    return data.id;
  } catch (e) {
    console.error(e);
  }
  return null;
};
  
<RatioComponent 
  fetchSessionToken={async () => {
            return await fetchSessionToken();
          }}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | Yes      |



#### **`signingCallback`**&#x20;

Function that accepts a string which contains the `challenge` that is returned from the Ratio `/v1/auth/cryptoWallet:start` call (documentation [here](../../reference/api/#auth))

This is an `async` function that should return a promise. This will allow such asynchronous activities such as a biometrics check to happen during signing.&#x20;

The return value from this function is of type `RatioKitSigningResult`. See the [Models](./#models) section below.

Example using Web3.js library

```tsx
<RatioComponent 
  signingCallback={async (challenge: string) => {
    let sign = web3.eth.accounts.sign(challenge, privateKey);

    return Promise.resolve({
      signature: sign.signature,
    });
  }}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | Yes      |



#### **`onPress`**

A function that is called when the child view is pressed. This function is called before the SDK starts the authentication flow. Suggested uses include setting an ActivityIndicator or loading spinner to be visible.

Example

```tsx
const [loading, setLoading] = useState(false)

<RatioComponent onPress={()=> {
    setLoading(true)
}}/>

```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### **`onOpen`**

A function that is called once the SDK has completed its authentication flow and before the modal is displayed. Suggested uses include setting an ActivityIndicator or loading spinner to be hidden

Example

```tsx
const [loading, setLoading] = useState(false)

<RatioComponent onOpen={()=> {
    setLoading(false)
}}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### **`onTransactionComplete`**

A function that is called whenever a transaction is completed even if there was a failure.\
As part of the data in the `RatioOrderStatus` object, you will receive the userId for the user that completed the transaction and the ActivityItem detailing the transaction. The userId and activityItem will not be returned if there was an error in processing the order.

Example

```tsx
<RatioComponent onTransactionComplete={(orderStatus: RatioOrderStatus)=> {
    Alert.alert(orderStatus.status)
}}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### **`onHelp`**

A function that is called whenever a help button is pressed from within the RatioComponent Modal WebView. This callback allows for custom handling for when the user needs help.

If not provided, the default behaviour is to open the default email client and draft an email to `support@ratio.me`

Example

```tsx
<RatioComponent onHelp={()=> {
    Alert.alert(orderStatus.status)
}}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### **`onAccountRecovery`**

A function that is called whenever the account recovery button is pressed from within the RatioComponent Modal WebView. This callback allows for custom handling for when the user needs help recovering their account.

If not provided, the default behaviour is to open the default email client and draft an email to `support@ratio.me`

Example

```tsx
<RatioComponent onAccountRecovery={()=> {
    Alert.alert(orderStatus.status)
}}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### **`onError`**

A function that is called whenever an error occurs within the Ratio component's authorization flow.

If not provided, the default behaviour is to show an Alert dialog with an error message

Example

```tsx
<RatioComponent onError={(errorMessage: string)=> {
    Alert.alert(errorMessage)
}}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### **`onClose`**

A function that is called after the Ratio Modal WebView. There is no default behaviour if not provided. As of writing this documentation this function will be called when the user presses "Return to wallet" in the application. It will then close the React Native modal and then call "onClose"

| TYPE     | REQUIRED |
| -------- | -------- |
| function | No       |



#### `onLogin`

A function that is called when the a user is fully authenticated. It is also called when the user's account has been created. The callback returns a `RatioUser` object that is described below.

Example

```tsx
<RatioComponent onLogin={(user: RatioUser)=> {
    Alert.alert(user.firstName)
}}/>
```

#### `redirectUri`

**iOS Only**\
\
A nullable string that points to a universal link. This is used for Plaid OAuth Authentication. For example `http://ratio.me/plaid/oauth`\
This route should be set up as a Universal link as described [above](./#integrating-plaid-oauth) \
\
**NOTE**: You must provide this URI to the Ratio team so that we can add it to our configuration

If your application is running on Android, pass in `null` as described in the code example

#### `androidPackageName`

**Android Only**

A nullable string that contains your Android package name. This is used for Plaid OAuth Authentication.\
\
**NOTE**: You must provide this package to the Ratio team so that we can add it to our configuration

If your application is running on iOS, pass in `null` as described in the code example

### Models

#### **`RatioKitSigningResult`**

```typescript
export interface RatioKitSigningResult {
  signature: string;
}
```

#### **`RatioOrderStatus`**

```typescript
export interface RatioOrderStatus {
  data: {userId: string, activity: ActivityItem};
  status: 'success' | 'failure';
  error: OrderError;
}
```

#### **`OrderError`**

```typescript
export interface OrderError {
  errorId: string;
  message: string;
  statusCode: number;
}
```

#### **`ActivityItem`**

```typescript
export interface ActivityItem {
  id: string;
  createTime: string;
  updateTime: string;
  fiat: ActivityItemFiat;
  crypto: ActivityItemCrypto;
  metadata: any;
}
```

#### **`ActivityItemFiat`**

```typescript
export interface ActivityItemFiat {
  status: ActivityItemStatus;
  currency: FiatCurrency;
  amount: string;
  direction: Direction;
  fundingMethod: FundingMethod;
  bankAccount: BankAccount;
}
```

#### **`ActivityItemStatus`**

```typescript
export enum ActivityItemStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}
```

#### **`FiatCurrency`**

```typescript
export enum FiatCurrency {
  USD = 'USD'
}
```

#### **`Direction`**

```typescript
export enum Direction {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT'
}
```

#### **`FundingMethod`**

```typescript
export enum FundingMethod {
  ACH_ORIGINATED_STANDARD = 'ACH_ORIGINATED_STANDARD',
  ACH_ORIGINATED_INSTANT = 'ACH_ORIGINATED_INSTANT',
  ACH_RECEIVED = 'ACH_RECEIVED'
}
```

#### **`BankAccount`**

```typescript
export interface BankAccount {
  id: string;
  createTime: string;
  updateTime: string;
  name: string;
  mask: string;
  linkStatus: LinkStatus;
  verificationStatus: VerificationStatus;
}
```

#### **`LinkStatus`**

```typescript
export enum LinkStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  LOGIN_REQUIRED = 'LOGIN_REQUIRED'
}
```

#### **`VerificationStatus`**

```typescript
export enum VerificationStatus {
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED'
}
```

#### **`ActivityItemCrypto`**

```typescript
export interface ActivityItemCrypto {
  status: ActivityItemStatus;
  currency: string;
  wallet: Wallet;
  direction: Direction;
  amount: string;
  price: string;
  fee: string;
  transactionHash: string;
}
```

#### **`Wallet`**

```typescript
export interface Wallet {
  id: string;
  address: string;
  createTime: string;
  name: string;
  network: string;
  updateTime: string;
}
```

#### `RatioUser`

```typescript
export interface RatioUser {
  id: string;
  createTime: string;
  updateTime: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  preferredMfaMethod: TwoFactorMethod;
  nationality: string;
  occupation: string;
  kyc: Kyc;
  connectedBankAccounts: BankAccount[];
}
```

#### TwoFactorMethod

```typescript
export enum TwoFactorMethod {
  OTP_SMS = 'OTP_SMS',
  TOTP = 'TOTP'
}
```

#### `BankAccount`

```typescript
export interface BankAccount {
  id: string;
  createTime: string;
  updateTime: string;
  name: string;
  mask: string;
  linkStatus: LinkStatus;
  verificationStatus: VerificationStatus;
}
```

#### `LinkStatus`

```typescript
export enum LinkStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  LOGIN_REQUIRED = 'LOGIN_REQUIRED'
}
```

#### `VerificationStatus`

```typescript
export enum VerificationStatus {
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED'
}
```

#### `Kyc`

```typescript
export type Kyc = {
  createTime: string;
  updateTime: string;
  addressResult: KycResult;
  dobResult: KycResult;
  fraudResult: KycResult;
  idvResult: KycResult;
};

```

#### `KycResult`

```typescript
export enum KycResult {
  UNKNOWN = 'UNKNOWN',
  NOT_STARTED = 'NOT_STARTED',
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED'
}
```

## Appendix

### Sequence diagram

<figure><img src="../../.gitbook/assets/Untitled (2).png" alt=""><figcaption></figcaption></figure>
