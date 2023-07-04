---
description: Fetch Session Token and Auth with Wallet
---

# Session Token and Wallet Signing

## Fetching a Session&#x20;

In order to start the authentication process with Ratio you must provide the library with a function that will call Ratio's API.

#### **`fetchSessionToken`**&#x20;

An async function that calls your backend to return the session token from the `/v1/clients/session` API.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/client/sessions" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="warning" %}
The Ratio API uses client authentication which requires a `client_id` and `client_secret.` This client secret should be treated securely and should be protected within your backend.
{% endhint %}

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

Ratio uses wallet authentication in order to link your client wallet to a Ratio user's account. To set up this authentication method you must provide the Ratio React Native Library with a `signingCallback.`

The signing callback is an async function that accepts a string that contains the `challenge` that is returned from the Ratio `/v1/auth/cryptoWallet:start` call ([documentation](../../api-reference/endpoints/auth/crypto-wallet.md#start-crypto-wallet-challenge)). This will allow you to perform asynchronous activities, such as a biometrics check, during the signing.

The return value from this function is of type `RatioKitSigningResult`. See the [Models](reference.md#models) section.

For example, using the Web3.js library

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
