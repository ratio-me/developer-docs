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
  
<RatioComponent 
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

#### `presetOrder`

Since `v0.10.0`

A property that takes a `RatioPresetOrder` object.\
This is used to allow the order flow to have predetermined values rather than having the enter the Cryptocurrency, or Fiat Amount in the flow manually.

If you do not want to provide this value either omit it or pass in `null`.

See [#ratiopresetorder](reference.md#ratiopresetorder "mention")for more details

Make sure to provide a valid combination for currency and network valid combinations are as follows

| Crypto Network | CryptoCurrencySymbol |
| -------------- | -------------------- |
| Ethereum       | ETH                  |
| Ethereum       | USDC\_ETHEREUM       |
| Polygon        | MATIC                |
| Polygon        | USDC\_POLYGON        |
| Polygon        | AMKT\_POLYGON        |

| TYPE             | REQUIRED |
| ---------------- | -------- |
| object or `null` | No       |

Example

```jsx
<RatioComponent presetOrder={
              {
                fiatAmount: 20,
                cryptoCurrency: CryptoCurrencySymbol.ETH
              } as RatioPresetOrder
          }/>
    
```

#### **`onPress`**

A function that is called when the child view is pressed. This function is called before the SDK starts the authentication flow. Suggested uses include setting an ActivityIndicator or loading spinner to be visible.

Example

```tsx
const [loading, setLoading] = useState(false)

<RatioComponent onPress={()=> {
    setLoading(true)
}}/>

```

<table><thead><tr><th width="354">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



#### **`onOpen`**

A function that is called once the SDK has completed its authentication flow and before the modal is displayed. Suggested uses include setting an ActivityIndicator or loading spinner to be hidden

Example

```tsx
const [loading, setLoading] = useState(false)

<RatioComponent onOpen={()=> {
    setLoading(false)
}}/>
```

<table><thead><tr><th width="354">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



#### **`onTransactionComplete`**

A function that is called whenever a transaction is completed even if there was a failure.\
As part of the data in the `RatioOrderStatus` object, you will receive the userId for the user that completed the transaction and the ActivityItem detailing the transaction. The userId and activityItem will not be returned if there was an error in processing the order.

Example

```tsx
<RatioComponent onTransactionComplete={(orderStatus: RatioOrderStatus)=> {
    Alert.alert(orderStatus.status)
}}/>
```

<table><thead><tr><th width="354">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



#### **`onHelp`**

A function that is called whenever a help button is pressed from within the RatioComponent Modal WebView. This callback allows for custom handling for when the user needs help.

If not provided, the default behaviour is to open the default email client and draft an email to `support@ratio.me`

Example

```tsx
<RatioComponent onHelp={()=> {
    Alert.alert(orderStatus.status)
}}/>
```

<table><thead><tr><th width="354">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



#### **`onAccountRecovery`**

A function that is called whenever the account recovery button is pressed from within the RatioComponent Modal WebView. This callback allows for custom handling for when the user needs help recovering their account.

If not provided, the default behaviour is to open the default email client and draft an email to `support@ratio.me`

Example

```tsx
<RatioComponent onAccountRecovery={()=> {
    Alert.alert(orderStatus.status)
}}/>
```

<table><thead><tr><th width="352">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



#### **`onError`**

A function that is called whenever an error occurs within the Ratio component's authorization flow.

If not provided, the default behaviour is to show an Alert dialog with an error message

Example

```tsx
<RatioComponent onError={(errorMessage: string)=> {
    Alert.alert(errorMessage)
}}/>
```

<table><thead><tr><th width="352">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



#### **`onClose`**

A function that is called after the Ratio Modal WebView. There is no default behaviour if not provided. As of writing this documentation this function will be called when the user presses "Return to wallet" in the application. It will then close the React Native modal and then call "onClose"

<table><thead><tr><th width="352">TYPE</th><th>REQUIRED</th></tr></thead><tbody><tr><td>function</td><td>No</td></tr></tbody></table>



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
This route should be set up as a Universal link as described [above](reference.md#integrating-plaid-oauth) \
\
**NOTE**: You must provide this URI to the Ratio team so that we can add it to our configuration

If your application is running on Android, pass in `null` as described in the code example

#### `androidPackageName`

**Android Only**

A nullable string that contains your Android package name. This is used for Plaid OAuth Authentication.\
\
**NOTE**: You must provide this package to the Ratio team so that we can add it to our configuration

If your application is running on iOS, pass in `null` as described in the code example

## Models

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

#### `RatioPresetOrder`

```typescript
export type RatioPresetOrder = {
  fiatAmount: number;
  cryptoCurrency: CryptoCurrencySymbol;
};
```

#### `CryptoCurrencySymbol`

```typescript
export enum CryptoCurrencySymbol {
  ETH = 'ETH',
  MATIC = 'MATIC',
  USDC_ETHEREUM = 'USDC_ETHEREUM',
  USDC_POLYGON = 'USDC_POLYGON',
  AMKT_POLYGON = 'AMKT_POLYGON',
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
