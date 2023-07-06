# Create a User

## Required user data

To create a new user we require the following user data:

* First name
* Last name
* Email
* Country
* Mobile Phone number&#x20;

{% hint style="warning" %}
Country needs to be in ISO 3166 alpha-2 format, ie. US.
{% endhint %}

{% hint style="warning" %}
Phone numbers need to be in E.164 format, ie. +14165551234. If they are not, you will receive a 400 error when making an SMS Send call.
{% endhint %}

{% hint style="warning" %}
We only support US mobile phone numbers. Number associated to any other country or line type will be rejected and you will receive a 400 error.&#x20;
{% endhint %}

* We also require that each user agree to our terms of use.  The user must explicitly select a checkbox with the following label and link:  “I agree to the [Ratio terms of use](https://ratio.me/legal/ratio-labs-usa-inc-terms-of-service).”

{% hint style="info" %}
While we do not recommend capturing additional data before creating a user, there are additional user data fields required to submit a request for KYC approval. In most cases, KYC will be the next step in your user journey after creating the user, and in most cases, you will want to collect this information after the user account is created. The required fields for submitting a request for KYC approval are:

* Date of Birth&#x20;
* ID type: **\*SSN**&#x20;
* ID Number&#x20;
* Address Line 1&#x20;
* Address Line 2&#x20;
* City&#x20;
* State&#x20;
* Postal Code
{% endhint %}

## Create a user session

User authentication is required to create a session. A JWT will be provided after the user authenticates, and must be included in the header of all API calls.

Any one of the three authentication factors below can be used to obtain a session token:

* Wallet (aka. Sign in With Ethereum / Connect Wallet)
* **SMS One-time Passcode\***
* Email One-time Passcode

{% hint style="warning" %}
#### \*SMS OTP must be included as one of the two authentication factors when creating a user

You can use any combination of SMS + Email or SMS + Wallet to provide multi-factor authentication. **You cannot use Email + Wallet in this scenario.** Go [here](broken-reference) for more information. If you would like to propose additional authentication methods please contact us.
{% endhint %}

### First authentication factor

{% hint style="success" %}
#### For the best user experience use Wallet as the first user authentication factor

If you already let users connect a wallet to your application, you will be able to obtain a user session token within the scope of that same user experience. This will be especially useful for returning users; wallet auth would allow you to retrieve information about the user's account, such as their linked bank account or transaction limits, so that you can delay the second authentication factor (SMS OTP) until the moment of transaction.
{% endhint %}

Wallet authentication includes two steps:

1. Retrieve a challenge to be signed by the user's wallet&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:start" method="post" expanded="false" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletType": "EVM"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "challenge": "Signing in with Ratio: pUQikKqqBq1brTwt1oHhUJwlOTfshzfMEAsJaH7x1MOdN7QMOooFfj-Aujmi7sb0wJnvYqtmZtlszKdH"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/auth/cryptoWallet:start' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletType": "EVM"
}'
```
{% endtab %}
{% endtabs %}

2. Then pass back the signature alongside the wallet address

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "walletAddress": "0x0000000000000000000000000000000000000000",
    "walletType": "EVM",
    "signature": "2djd2cFZ9VU2zDWvUGqeHwvbiJZfTt3BMzDctDsEW7vM2QUTgTHjeM2rpFX9ZULeic3KptUh5ehipXDFcK5ecYiX"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "sessionJwt": "eyJhbG.....",
    "userMask": {
        "id": "00000000-0000-0000-0000-000000000000",
        "createTime": "2022-01-01T00:00:00.000Z",
        "updateTime": "2022-01-01T23:59:59.999Z",
        "phoneMask": "0000",
        "preferredMfaMethod": "OTP_SMS"
    }
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/auth/cryptoWallet:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "walletAddress": "<WALLET_ADDRESS>",
    "walletType": "EVM",
    "signature": "<SIGNED_CHALLENGE_STRING>"
}'
```
{% endtab %}
{% endtabs %}

After authenticating the user, you will receive a JWT that must be provided in the Authorization header for all subsequent requests within that user session.

## Second authentication factor

{% hint style="warning" %}
#### Reminder: SMS must be one of your authentication factors to create a user
{% endhint %}

First, we need to send a one-time code to the user using the phone number they provided during sign-up.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:send" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "phoneNumber": "+14165551234",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789",
    "phoneMask": "1234"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/sms:send' \
--header 'Authorization: Bearer eyJ......' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber": "+14165551234"
}'
```
{% endtab %}
{% endtabs %}

Once you receive the one-time code send it (with the phone id received in the first response) to the sms:authenticate endpoint to obtain a JWT.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789",
    "otp": "123456",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "sessionJwt": "eyJ............"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```bash
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/sms:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Authorization: Bearer eyJ......' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp": "123456",
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789"
}'
```
{% endtab %}
{% endtabs %}

## Create the user

At this point, you can create a user

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## Next steps

After creating a user there are three additional requirements before you can initiate payments:

* [Assign at least one deposit address to the user](assign-a-deposit-address.md)
* [The user must be KYC approved](kyc.md)&#x20;
* [The user must have a verified bank account](link-and-verify-a-bank-account/)

You are free to complete the remaining tasks in any order, however, we recommend the sequence above.

Our recommended next step is to [assign a deposit address](assign-a-deposit-address.md)



