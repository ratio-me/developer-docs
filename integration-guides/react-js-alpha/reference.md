# Reference

## Props

#### **`fetchSessionToken`**&#x20;

A function that is used to fetch session token that is generated from the API that is used to wrap the ratio `/v1/clients/session` (documentation [here](broken-reference))

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
  
<RatioButton 
  fetchSessionToken={async () => {
            return await fetchSessionToken();
          }}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | Yes      |



#### **`signingCallback`**&#x20;

Function that accepts a string which contains the `challenge` that is returned from the Ratio `/v1/auth/cryptoWallet:start` call (documentation [here](broken-reference))

This is an `async` function that should return a promise. This will allow such asynchronous activities such as a biometrics check to happen during signing.&#x20;

The return value from this function is of type `RatioKitSigningResult`. See the [Models](reference.md#models) section below.

Example using Web3.js library

```tsx
<RatioButton 
  signingCallback={async (challenge: string) => {
    let sign = web3.eth.accounts.sign(challenge, privateKey);

    return Promise.resolve(sign.signature);
  }}/>
```

| TYPE     | REQUIRED |
| -------- | -------- |
| function | Yes      |

#### `redirectUri`

A  string that points to a URI. This is used for Plaid OAuth Authentication. For example `http://ratio.me/plaid/oauth`

{% hint style="info" %}
You must provide this URI to the Ratio team so that we can add it to our configuration
{% endhint %}

| TYPE   | REQUIRED |
| ------ | -------- |
| string | Yes      |

#### `text`

An optional string that allows you to change the text that is displayed on the `RatioButton`

Default value: "Buy Crypto"

| TYPE   | REQUIRED |
| ------ | -------- |
| string | No       |

