---
description: >-
  Here is a full example of using the Ratio React Native Library in a React
  Native Application
---

# Example



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
  const [presetOrder, setPresetOrder] = useState<RatioPresetOrder>(null)
  
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
          presetOrder={presetOrder}
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
