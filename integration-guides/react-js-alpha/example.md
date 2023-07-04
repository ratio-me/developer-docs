# Example

Below is a full example which uses [RainbowKit](https://www.rainbowkit.com/) for the wallet connection and [Wagmi](https://wagmi.sh/) for the wallet signing. However you can use which ever wallet connection library you would like.

```tsx
import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {RatioButton, RatioPresetOrder} from "@ratio.me/ratiokit-react";
import '@rainbow-me/rainbowkit/styles.css';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount, useNetwork, useSignMessage} from 'wagmi';


export const clientId = "YOUR-CLIENT-ID";
export const clientSecret = "YOUR_CLIENT_SECRET";

function App() {
    const {address, isConnected} = useAccount()
    const {chain} = useNetwork()
    const {signMessageAsync} = useSignMessage()

    const fetchSessionToken = useCallback(async (): Promise<string | null> => {
        try {
            const requestHeaders: HeadersInit = new Headers();
            requestHeaders.set('Content-Type', 'application/json');
            requestHeaders.set('your-client-id',    clientId || '');
            requestHeaders.set('your-client-secret', clientSecret || '');
            let sessionTokenResponse = await fetch(
                'https://api.yourdomain.com/ratio/client/sessions',
                {
                    method: 'POST',
                    headers: requestHeaders,
                    body: JSON.stringify({
                        signingAddress: address,
                        depositAddress: address,
                        signingNetwork: chain?.name.toUpperCase(),
                    }),
                }
            );

            let data = await sessionTokenResponse.json();
            return data.id;
        } catch (e) {
            console.error(e);
        }
        return null;
    },[address, isConnected, chain])

    return (
      <div>
          {isConnected ? (
              <RatioButton 
                  text={'Buy with Ratio'}
                  fetchSessionToken={async () => {
                       if(isConnected){
                           return await fetchSessionToken()
                       }
                       return null
                  }}
                  signingCallback={async (challenge:string) => {
                       return await signMessageAsync({
                           message: challenge,
                       })
                   }}
                  presetOrder={{
                    fiatAmount: fiatAmount,
                    cryptoCurrency: selectedCurrency,
                 } as RatioPresetOrder}
              />): null }
              <ConnectButton/>
      </div>
  );
}

export default App;

```
