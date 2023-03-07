---
description: Ratio + Plaid
---

# Installation

<figure><img src="https://img.shields.io/npm/v/@ratio.me/ratio-react-native-library?color=blue&#x26;style=flat-square" alt="Library version"><figcaption></figcaption></figure>

`npm install @ratio.me/ratio-react-native-library`

or

`yarn add @ratio.me/ratio-react-native-library`

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

## Fetch Session Token&#x20;

#### **`fetchSessionToken`**&#x20;

A function that is used to fetch the session token.  that is generated from the API that is used to wrap the ratio `/v1/clients/session` (documentation [here](../../reference/api/#client))

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



#### **``**

## Sequence diagram

<figure><img src="../../.gitbook/assets/Untitled (2).png" alt=""><figcaption></figcaption></figure>
