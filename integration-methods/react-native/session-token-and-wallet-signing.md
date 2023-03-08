---
description: Fetch Session Token and Auth with Wallet
---

# Session Token and Wallet Signing

## Fetching a Session&#x20;

In order to start the authentication process with Ratio you must provide the library a function that will call Ratio's API.

#### **`fetchSessionToken`**&#x20;

A function that is used to fetch the session token.  that is generated from the API that is used to wrap the ratio `/v1/clients/session` (documentation [here](../../reference/api/client.md))

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



## Wallet Signing

Ratio uses wallet authentication in order to link your client wallet to our Ratio account. This is used as a factor of authentication for Ratio user's accounts. To set up this authentication method you must provide the Ratio React Native Library with `signingCallback.`

The signing callback is a function that accepts a string which contains the `challenge` that is returned from the Ratio `/v1/auth/cryptoWallet:start` call (documentation [here](../../reference/api/auth/crypto-wallet.md#overview))

This is an `async` function that should return a promise. This will allow such asynchronous activities such as a biometrics check to happen during signing.&#x20;

The return value from this function is of type `RatioKitSigningResult`. See the [Models](reference.md#models) section.

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

## Sequence diagram

<figure><img src="../../.gitbook/assets/Untitled (2).png" alt=""><figcaption></figcaption></figure>
