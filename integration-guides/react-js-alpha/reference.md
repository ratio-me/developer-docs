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



#### `text`

An optional string that allows you to change the text that is displayed on the `RatioButton`

Default value: "Buy Crypto"

| TYPE   | REQUIRED |
| ------ | -------- |
| string | No       |

#### `loadingText`

An option string that allows you to change the text that is displayed when the `RatioButton` is loading during log in

Default value: "Connecting..."

| TYPE   | REQUIRED |
| ------ | -------- |
| string | No       |

### Models

#### `RatioUser`

```tsx
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
  nationality: string;
  occupation: string;
  kyc: Kyc;
  connectedBankAccounts: BankAccount[];
}
```

#### `OrderStatus`

```tsx
export interface OrderStatus {
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
