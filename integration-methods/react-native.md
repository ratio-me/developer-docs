---
description: >-
  The Ratio React Native SDK allows partners to embed and connect to Ratio’s
  application from their React Native application.
---

# React Native

The React Native SDK provides a `RatioComponent` component that requires a few parameters (listed below). This component allows for a few customizations so that it can be placed anywhere within your app.

The `RatioComponent` takes a child view that is wrapped using a `<TouchableOpacity/>` component. This means that whatever view is passed into the `RatioComponent` will be clickable. Our suggestion is to use the view as a custom "button" to allow users access Ratio services.

## Requirements

To use the SDK you must first acquire a `clientId` and `clientSecret` from the Ratio team. Learn how to request API keys [here](white-label/quick-start.md#get-your-api-keys).

Ratio will provide an API that you will be required to wrap in your own back end (see example below)

## Installation

`npm install @ratio.me/ratio-react-native-library`

or

`yarn add @ratio.me/ratio-react-native-library`

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
import * as LocalAuthentication from 'expo-local-authentication';
import type { LocalAuthenticationResult } from 'expo-local-authentication';

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
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });
  
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

  const fallBackToDefaultAuth = () => {};
  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert(
        'Biometric record not found',
        'Please verify your identity with your password',
        [{ text: 'OK' }],
        { onDismiss: () => fallBackToDefaultAuth() }
      );
      return {
        success: false,
        error: 'no saved biometrics',
      } as LocalAuthenticationResult;
    }
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      disableDeviceFallback: true,
      cancelLabel: 'Cancel',
    });

    return biometricAuth;
  };

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      {loading ? <ActivityIndicator /> : null}
      <Text>
        {isBiometricSupported
          ? 'Your device is compatible with Biometrics'
          : 'Face or Fingerprint scanner is available on this device'}
      </Text>
      <View style={styles.buttonWrapper}>
        <RatioComponent
          fetchSessionToken={async () => {
            return await fetchSessionToken();
          }}
          signingCallback={async (challenge: string) => {
            let result = await handleBiometricAuth();
            if (result.success) {
              let sign = web3.eth.accounts.sign(challenge, privateKey);

              return Promise.resolve({
                signature: sign.signature,
              });
            } else {
              return Promise.reject('failed biometrics');
            }
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

A function that is used to fetch session token that is generated from the API that is used to wrap the ratio `/v1/clients/session` (documentation [here](../reference/api-reference/#client))

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

Function that accepts a string which contains the `challenge` that is returned from the Ratio `/v1/auth/cryptoWallet:start` call (documentation [here](../reference/api-reference/#auth))

This is an `async` function that should return a promise. This will allow such asynchronous activities such as a biometrics check to happen during signing.&#x20;

The return value from this function is of type `RatioKitSigningResult`. See the [Models](react-native.md#models) section below.

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

A function that is called whenever a transaction is completed even if the there was a failure.

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
  data: ActivityItem;
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

## Appendix

### Sequence diagram

<figure><img src="../.gitbook/assets/Untitled (2).png" alt=""><figcaption></figcaption></figure>
