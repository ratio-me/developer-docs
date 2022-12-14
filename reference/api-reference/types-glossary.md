# 🔎 Types Glossary

### Models

#### AchLimit

| Name      | Type                                   | Description                                                                            | Required |
| --------- | -------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| currency  | [Currency](types-glossary.md#currency) | The fiat currency for the limit                                                        | Yes      |
| limit     | string                                 | The maximum allowable sum of ACH transaction amounts                                   | Yes      |
| used      | string                                 | The current sum of ACH transaction amounts by the ACH limit type (e.g. daily)          | Yes      |
| remaining | string                                 | The remaining allowable sum, calculated as the delta between the limit and used values | Yes      |

#### ActivateBankLinkResponse

| Name        | Type                                         | Description                  | Required |
| ----------- | -------------------------------------------- | ---------------------------- | -------- |
| bankAccount | [BankAccount](types-glossary.md#bankaccount) | The bank account of the user | No       |

#### ActivateBankLinkRequest

| Name        | Type   | Description                                 | Required |
| ----------- | ------ | ------------------------------------------- | -------- |
| publicToken | string | The public token from the Plaid integration | Yes      |

#### ActivityItem

| Name       | Type                                                       | Description                                         | Required |
| ---------- | ---------------------------------------------------------- | --------------------------------------------------- | -------- |
| id         | string                                                     | The unique identifier of the allocation             | No       |
| createTime | string                                                     | The time the allocation was created                 | No       |
| updateTime | string                                                     | The time the allocation was last updated            | No       |
| fiat       | [ActivityItemFiat](types-glossary.md#activityitemfiat)     | The fiat component of the activity item             | No       |
| crypto     | [ActivityItemCrypto](types-glossary.md#activityitemcrypto) | The crypto component of the activity item           | No       |
| metadata   | object                                                     | (Optional) Additional metadata of the activity item | No       |

#### ActivityItemCrypto

| Name            | Type                                                       | Description                                                                           | Required |
| --------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------- |
| status          | [ActivityItemStatus](types-glossary.md#activityitemstatus) | The status of the crypto activity item                                                | No       |
| currency        | [Currency](types-glossary.md#currency)                     | The crypto currency acquired for the activity item                                    | No       |
| wallet          | [Wallet](types-glossary.md#wallet)                         | The destination wallet for the crypto currency                                        | No       |
| direction       | [Direction](types-glossary.md#direction)                   | The direction the crypto is moving                                                    | No       |
| amount          | string                                                     | The amount of crypto currency acquired                                                | No       |
| price           | string                                                     | The price of a single unit of the crypto currency; specified in the fiat currency     | No       |
| fee             | string                                                     | The fee to execute the crypto purchase and withdrawal; specified in the fiat currency | No       |
| transactionHash | string                                                     | The on-chain transaction hash of the activity item                                    | No       |

#### ActivityItemFiat

| Name          | Type                                                       | Description                               | Required |
| ------------- | ---------------------------------------------------------- | ----------------------------------------- | -------- |
| status        | [ActivityItemStatus](types-glossary.md#activityitemstatus) | The status of the fiat activity item      | No       |
| currency      | [Currency](types-glossary.md#currency)                     | The fiat currency of the activity item    | No       |
| amount        | string                                                     | The amount of fiat currency exchanged     | No       |
| direction     | [Direction](types-glossary.md#direction)                   | The direction the fiat is moving          | No       |
| fundingMethod | [FundingMethod](types-glossary.md#fundingmethod)           | The method used for fiat, if funded       | No       |
| bankAccount   | [BankAccount](types-glossary.md#bankaccount)               | The Bank Account used for fiat, if funded | No       |

#### ActivityItems

| Name          | Type                                                 | Description                                          | Required |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------- | -------- |
| items         | [\[ ActivityItem \]](types-glossary.md#activityitem) | The activity items of the user                       | Yes      |
| nextPageToken | string                                               | The token for the next page of results, if available | No       |

#### AuthenticateCryptoWalletRequest

| Name          | Type                                 | Description                        | Required |
| ------------- | ------------------------------------ | ---------------------------------- | -------- |
| walletAddress | string                               | The wallet address to authenticate | Yes      |
| walletNetwork | [Network](types-glossary.md#network) | The wallet network to authenticate | Yes      |
| signature     | string                               | The signature of the challenge     | Yes      |

#### AuthenticateCryptoWalletStartResponse

| Name      | Type   | Description                                               | Required |
| --------- | ------ | --------------------------------------------------------- | -------- |
| challenge | string | The challenge string to be signed by the requested wallet | Yes      |

#### AuthenticateCryptoWalletStartRequest

| Name          | Type                                 | Description                        | Required |
| ------------- | ------------------------------------ | ---------------------------------- | -------- |
| walletAddress | string                               | The wallet address to authenticate | Yes      |
| walletNetwork | [Network](types-glossary.md#network) | The wallet network to authenticate | Yes      |

#### AuthenticateEmailOtpRequest

| Name    | Type   | Description                          | Required |
| ------- | ------ | ------------------------------------ | -------- |
| otp     | string | The OTP to authenticate              | Yes      |
| emailId | string | The phone identifier to authenticate | Yes      |

#### AuthenticateSmsOtpRequest

| Name    | Type   | Description                          | Required |
| ------- | ------ | ------------------------------------ | -------- |
| otp     | string | The OTP to authenticate              | Yes      |
| phoneId | string | The phone identifier to authenticate | Yes      |

#### BankAccount

| Name               | Type                                                               | Description                                               | Required |
| ------------------ | ------------------------------------------------------------------ | --------------------------------------------------------- | -------- |
| id                 | string                                                             | The unique identifier of the bank account                 | No       |
| createTime         | string                                                             | The time the bank account connection was created          | No       |
| updateTime         | string                                                             | The time the bank account connection was last updated     | No       |
| name               | string                                                             | The name of the bank account                              | No       |
| mask               | string                                                             | The account number mask                                   | No       |
| linkStatus         | [BankLinkStatus](types-glossary.md#banklinkstatus)                 | The status of the bank account link to the user           | No       |
| verificationStatus | [BankVerificationStatus](types-glossary.md#bankverificationstatus) | The status of the bank account user identity verification | No       |

#### CalculatedAchLimitsResponse

| Name    | Type                                   | Description                                                 | Required |
| ------- | -------------------------------------- | ----------------------------------------------------------- | -------- |
| instant | [AchLimit](types-glossary.md#achlimit) | The ACH limit for transactions processed instantly          | Yes      |
| daily   | [AchLimit](types-glossary.md#achlimit) | The ACH limit for transactions processed in the last day    | Yes      |
| weekly  | [AchLimit](types-glossary.md#achlimit) | The ACH limit for transactions processed in the last 7 days | Yes      |

#### ConnectWalletRequest

| Name    | Type                                 | Description                        | Required |
| ------- | ------------------------------------ | ---------------------------------- | -------- |
| address | string                               | The network address of the wallet  | Yes      |
| network | [Network](types-glossary.md#network) | The network this wallet belongs to | Yes      |
| name    | string                               | A name for the wallet              | No       |

#### CreateUserRequest

| Name          | Type   | Description                                          | Required |
| ------------- | ------ | ---------------------------------------------------- | -------- |
| firstName     | string | The first name of the user                           | Yes      |
| middleName    | string | The middle name of the user                          | No       |
| lastName      | string | The last name of the user                            | Yes      |
| email         | string | The email of the user                                | Yes      |
| country       | string | The country of the user (Format: ISO 3166 alpha-2)   | Yes      |
| phone         | string | The phone number of the user (Format: E-164)         | Yes      |
| acceptedTerms | string | A boolean indicating the user has accepted the terms | Yes      |

#### CreateWebhookRequest

| Name   | Type                                                 | Description                               | Required |
| ------ | ---------------------------------------------------- | ----------------------------------------- | -------- |
| url    | string                                               | The url for the client's webhook endpoint | Yes      |
| events | [\[ WebhookEvent \]](types-glossary.md#webhookevent) | The events to subscribe to                | Yes      |
| name   | string                                               | A name for the webhook                    | No       |

#### Error

| Name       | Type   | Description         | Required |
| ---------- | ------ | ------------------- | -------- |
| message    | string | Error message       | No       |
| createTime | string | Error creation time | No       |
| code       | string | Error code          | No       |
| data       | object | Error data          | No       |

#### FirstFactorAuthResponse

| Name       | Type                                   | Description                    | Required |
| ---------- | -------------------------------------- | ------------------------------ | -------- |
| sessionJwt | string                                 | The authenticated Bearer token | Yes      |
| userMask   | [UserMask](types-glossary.md#usermask) | The user mask object           | No       |

#### GetCryptoPricesResponse

| Name        | Type                                             | Description              | Required |
| ----------- | ------------------------------------------------ | ------------------------ | -------- |
| prices      | [\[ Price \]](types-glossary.md#price)           | The quoted prices        | Yes      |
| networkFees | [\[ NetworkFee \]](types-glossary.md#networkfee) | The current network fees | Yes      |

#### IdvResponse

| Name   | Type                                     | Description                                                   | Required |
| ------ | ---------------------------------------- | ------------------------------------------------------------- | -------- |
| status | [KycResult](types-glossary.md#kycresult) | The status of the user's identity verification                | No       |
| url    | string                                   | The URL to provide the user to complete identity verification | No       |

#### InitiateAchResponse

| Name         | Type                                           | Description               | Required |
| ------------ | ---------------------------------------------- | ------------------------- | -------- |
| activityItem | [ActivityItem](types-glossary.md#activityitem) | The pending activity item | No       |

#### InitiateAchRequest

| Name           | Type                                   | Description                                | Required |
| -------------- | -------------------------------------- | ------------------------------------------ | -------- |
| fiatAmount     | string                                 | The amount in fiat to be exchanged         | Yes      |
| cryptoCurrency | [Currency](types-glossary.md#currency) | The crypto currency to be purchased        | Yes      |
| walletId       | string                                 | The ID of the wallet to receive the crypto | Yes      |
| type           | [AchType](types-glossary.md#achtype)   | The type of ACH request                    | Yes      |

#### Kyc

| Name          | Type                                     | Description                                               | Required |
| ------------- | ---------------------------------------- | --------------------------------------------------------- | -------- |
| createTime    | string                                   | The time the KYC was created                              | No       |
| updateTime    | string                                   | The time the KYC was last updated                         | No       |
| addressResult | [KycResult](types-glossary.md#kycresult) | The result of the KYC address verification                | No       |
| dobResult     | [KycResult](types-glossary.md#kycresult) | The result of the KYC date of birth verification          | No       |
| fraudResult   | [KycResult](types-glossary.md#kycresult) | The result of the KYC fraud verification                  | No       |
| idvResult     | [KycResult](types-glossary.md#kycresult) | The result of the KYC identity documentation verification | No       |

#### NetworkFee

| Name           | Type                                   | Description                   | Required |
| -------------- | -------------------------------------- | ----------------------------- | -------- |
| cryptoCurrency | [Currency](types-glossary.md#currency) | Crypto currency               | No       |
| cryptoFee      | string                                 | Fee amount in crypto currency | No       |
| fiatCurrency   | [Currency](types-glossary.md#currency) | Quoted fiat currency          | No       |
| fiatFee        | string                                 | Fee amount in fiat currency   | No       |

#### CreateClientSessionRequest

| Name           | Type                                 | Description                                                                                                   | Required |
| -------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- | -------- |
| signingAddress | string                               | The wallet address that will be used to authenticate                                                          | Yes      |
| signingNetwork | [Network](types-glossary.md#network) | The wallet network that will be used to authenticate                                                          | Yes      |
| depositAddress | string                               | The wallet address that will be used as the deposit target. If not provided, the signing address will be used | No       |

#### ClientSession

| Name           | Type                                   | Description                              | Required |
| -------------- | -------------------------------------- | ---------------------------------------- | -------- |
| id             | string                                 | The session ID                           | No       |
| createTime     | string                                 | The time the session was created         | No       |
| updateTime     | string                                 | The time the session was last updated    | No       |
| depositAddress | string                                 | The address of the deposit wallet        | No       |
| depositNetwork | [Network](types-glossary.md#network)   | The crypto network of the deposit wallet | No       |
| userMask       | [UserMask](types-glossary.md#usermask) | The user mask object                     | No       |

#### Payroll

| Name         | Type                                                 | Description                                      | Required |
| ------------ | ---------------------------------------------------- | ------------------------------------------------ | -------- |
| createTime   | string                                               | The time the payroll connection was created      | No       |
| updateTime   | string                                               | The time the payroll connection was last updated | No       |
| provider     | [PayrollProvider](types-glossary.md#payrollprovider) | The provider for the payroll                     | No       |
| distribution | string                                               | The amount being distributed from this payroll   | No       |

#### Price

| Name           | Type                                   | Description          | Required |
| -------------- | -------------------------------------- | -------------------- | -------- |
| cryptoCurrency | [Currency](types-glossary.md#currency) | Crypto currency      | No       |
| fiatCurrency   | [Currency](types-glossary.md#currency) | Quoted fiat currency | No       |
| price          | string                                 | Price                | No       |

#### RequestBankLinkResponse

| Name      | Type   | Description                              | Required |
| --------- | ------ | ---------------------------------------- | -------- |
| linkToken | string | The link token for the Plaid integration | Yes      |

#### SecondFactorAuthResponse

| Name       | Type   | Description                    | Required |
| ---------- | ------ | ------------------------------ | -------- |
| sessionJwt | string | The authenticated Bearer token | Yes      |
| user       | User   | The user object                | No       |

#### SendEmailOtpResponse

| Name    | Type   | Description                 | Required |
| ------- | ------ | --------------------------- | -------- |
| emailId | string | The ID of the email address | Yes      |

#### SendEmailOtpRequest

| Name         | Type   | Description                                | Required |
| ------------ | ------ | ------------------------------------------ | -------- |
| emailAddress | string | The Email Address to send the Email OTP to | Yes      |

#### SendSmsOtpResponse

| Name      | Type   | Description                           | Required |
| --------- | ------ | ------------------------------------- | -------- |
| phoneId   | string | The ID of the phone number            | Yes      |
| phoneMask | string | The last 4 digits of the phone number | No       |

#### SendSmsOtpRequest

| Name        | Type   | Description                             | Required |
| ----------- | ------ | --------------------------------------- | -------- |
| phoneNumber | string | The phone number to send the SMS OTP to | Yes      |

#### SubmitKycRequest

| Name        | Type                               | Description                                        | Required |
| ----------- | ---------------------------------- | -------------------------------------------------- | -------- |
| dateOfBirth | string                             | The date of birth of the user (Format: YYYY-MM-DD) | Yes      |
| idType      | [IdType](types-glossary.md#idtype) | The type of ID                                     | Yes      |
| idNumber    | string                             | The number of ID                                   | Yes      |
| line1       | string                             | The first address line of the user                 | Yes      |
| line2       | string                             | The second address line of the user                | No       |
| city        | string                             | The city of the user's address                     | Yes      |
| state       | string                             | The state of the user's address                    | Yes      |
| postalCode  | string                             | The postal code of the user's address              | Yes      |
| nationality | string                             | The nationality of the user                        | Yes      |
| occupation  | string                             | The occupation of the user                         | Yes      |

#### UpdateWalletRequest

| Name | Type   | Description           | Required |
| ---- | ------ | --------------------- | -------- |
| name | string | A name for the wallet | Yes      |

#### UpdateWebhookRequest

| Name   | Type                                                 | Description                               | Required |
| ------ | ---------------------------------------------------- | ----------------------------------------- | -------- |
| url    | string                                               | The url for the client's webhook endpoint | No       |
| events | [\[ WebhookEvent \]](types-glossary.md#webhookevent) | The events to subscribe to                | No       |
| name   | string                                               | A name for the webhook                    | No       |

#### User

| Name                  | Type                                               | Description                                       | Required |
| --------------------- | -------------------------------------------------- | ------------------------------------------------- | -------- |
| id                    | string                                             | The unique identifier of the user                 | No       |
| createTime            | string                                             | The time the user was created                     | No       |
| updateTime            | string                                             | The time the user was last updated                | No       |
| firstName             | string                                             | The first name of the user                        | No       |
| middleName            | string                                             | The middle name of the user                       | No       |
| lastName              | string                                             | The last name of the user                         | No       |
| email                 | string                                             | The email of the user                             | No       |
| country               | string                                             | The country of the user                           | No       |
| phone                 | string                                             | The phone number of the user                      | No       |
| nationality           | string                                             | The nationality of the user                       | No       |
| occupation            | string                                             | The occupation of the user                        | No       |
| kyc                   | [Kyc](types-glossary.md#kyc)                       | The KYC information of the user                   | No       |
| connectedBankAccounts | [\[ BankAccount \]](types-glossary.md#bankaccount) | The array of connected bank accounts for the user | No       |

#### UserMask

| Name       | Type   | Description                                  | Required |
| ---------- | ------ | -------------------------------------------- | -------- |
| id         | string | The unique identifier of the user            | No       |
| createTime | string | The time the user was created                | No       |
| updateTime | string | The time the user was last updated           | No       |
| phoneMask  | string | The last 4 digits of the user's phone number | No       |

#### Wallet

| Name       | Type                                 | Description                          | Required |
| ---------- | ------------------------------------ | ------------------------------------ | -------- |
| id         | string                               | The unique identifier of the wallet  | Yes      |
| createTime | string                               | The time the wallet was created      | Yes      |
| updateTime | string                               | The time the wallet was last updated | Yes      |
| address    | string                               | The address of the wallet            | Yes      |
| name       | string                               | The nickname of the wallet           | No       |
| network    | [Network](types-glossary.md#network) | The crypto network of the wallet     | Yes      |

#### Wallets

| Name          | Type                                     | Description                                          | Required |
| ------------- | ---------------------------------------- | ---------------------------------------------------- | -------- |
| items         | [\[ Wallet \]](types-glossary.md#wallet) | The wallets of the user                              | Yes      |
| nextPageToken | string                                   | The token for the next page of results, if available | No       |

#### Webhook

| Name       | Type                                                 | Description                                                                    | Required |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ | -------- |
| id         | string                                               | The unique identifier of the webhook                                           | Yes      |
| createTime | string                                               | The time the webhook was created                                               | Yes      |
| updateTime | string                                               | The time the webhook was last updated                                          | Yes      |
| name       | string                                               | The name of the webhook                                                        | No       |
| events     | [\[ WebhookEvent \]](types-glossary.md#webhookevent) |                                                                                | Yes      |
| secret     | string                                               | The secret of the webhook. This is only returned here when creating a webhook. | No       |

#### WebhookEvents

| Name  | Type                                                 | Description                  | Required |
| ----- | ---------------------------------------------------- | ---------------------------- | -------- |
| items | [\[ WebhookEvent \]](types-glossary.md#webhookevent) | The available webhook events | Yes      |

#### Webhooks

| Name  | Type                                 | Description           | Required |
| ----- | ------------------------------------ | --------------------- | -------- |
| items | [Webhook](types-glossary.md#webhook) | The client's webhooks | Yes      |

### Enums

#### AchType

| Value    | Description             |
| -------- | ----------------------- |
| STANDARD | Standard ACH settlement |
| INSTANT  | Instant ACH settlement  |

#### ActivityItemStatus

| Value     | Description                       |
| --------- | --------------------------------- |
| PENDING   | Activity is pending processing    |
| COMPLETED | Activity has completed processing |
| FAILED    | Activity failed to process        |

#### BankLinkStatus

| Value           | Description                                      |
| --------------- | ------------------------------------------------ |
| ACTIVE          |                                                  |
| INACTIVE        |                                                  |
| LOGIN\_REQUIRED | User's bank link requires them to reauthenticate |

#### BankVerificationStatus

| Value      | Description |
| ---------- | ----------- |
| APPROVED   |             |
| DECLINED   |             |
| IN\_REVIEW |             |

#### Currency

| Value | Description |
| ----- | ----------- |
| USD   | US Dollars  |
| BTC   | Bitcoin     |
| ETH   | Ether       |
| MATIC | Polygon     |
| SOL   | Solana      |

#### Direction

| Value  | Description                     |
| ------ | ------------------------------- |
| CREDIT | Activity is credit transaction  |
| DEBIT  | Activity is a debit transaction |

#### FundingMethod

| Value                     | Description               |
| ------------------------- | ------------------------- |
| ACH\_ORIGINATED\_STANDARD | Standard ACH Pull request |
| ACH\_ORIGINATED\_INSTANT  | Instant ACH Pull request  |
| ACH\_RECEIVED             | ACH directly deposited    |

#### IdType

| Value | Description            |
| ----- | ---------------------- |
| SSN   | Social Security Number |

#### KycResult

| Value        | Description                                   |
| ------------ | --------------------------------------------- |
| APPROVED     | KYC is approved for this check                |
| DECLINED     | KYC is declined for this check                |
| IN\_REVIEW   | This check is currently undergoing KYC review |
| NOT\_STARTED | This check has not started KYC review         |
| SUBMITTED    | This check has been submitted for KYC review  |
| UNKNOWN      | Unknown status                                |

#### Network

| Value    | Description |
| -------- | ----------- |
| BITCOIN  |             |
| ETHEREUM |             |
| POLYGON  |             |
| SOLANA   |             |

#### PayrollProvider

| Value   | Description                  |
| ------- | ---------------------------- |
| ADP     |                              |
| GUSTO   |                              |
| PAYCHEX |                              |
| WORKDAY |                              |
| MANUAL  | Manually configured deposits |
| OTHER   | Other payroll configuration  |

#### WebhookEvent

| Value             | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| ACTIVITY\_UPDATED | Published whenever a user's transaction activity changes.                    |
| BANK\_UPDATED     | Published whenever a user's bank accounts or authentication statuses change. |
| KYC\_UPDATED      | Published whenever a user's KYC status changes.                              |
