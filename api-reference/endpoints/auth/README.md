# Auth

### Overview

Most of our APIs require a form of user authentication, for which we have provided several means of obtaining that authentication, any of which can be provided in any order.

Crypto Wallet authentication allows you to have a user sign in with their crypto wallet by performing a signing transaction. Email and SMS OTP will send one-time codes to the method specified.

Once a successful authentication takes place, you will receive a `JWT` that is to be passed into the `Authorization` header as a `Bearer` token for subsequent requests. When adding a second authentication factor, such as SMS after an Email OTP, you must add the initial `JWT` to the headers for the subsequent auth calls to ensure they're authenticated to the same session.

{% hint style="warning" %}
The `JWT` tokens have a lifetime of 5 minutes, and a user session has a lifetime of 10 minutes of inactivity.

When a `JWT` nears expiry, we will refresh it in the background and provide you a new `JWT` in the following response header: `ratio-authentication-refresh`.

If you encounter this header, you should begin using the new `JWT`.
{% endhint %}

{% hint style="info" %}
Making calls to read (`GET`) APIs only require a single form of authentication by a user, whether it be wallet signing, SMS, or Email. However, you will require MFA to make a write call (`POST`,`PUT`, etc.) for things such as adding a wallet or sending a transaction.
{% endhint %}

{% hint style="info" %}
Ratio user accounts are accessible across a wide variety of applications. You must [implement Account Linking](../../../guides/link-a-new-signing-wallet-to-an-existing-user.md) so that existing Ratio users can link your application to their account and bypass onboarding
{% endhint %}

### Auth Factors

{% content-ref url="crypto-wallet.md" %}
[crypto-wallet.md](crypto-wallet.md)
{% endcontent-ref %}

{% content-ref url="email-otp.md" %}
[email-otp.md](email-otp.md)
{% endcontent-ref %}

{% content-ref url="sms-otp.md" %}
[sms-otp.md](sms-otp.md)
{% endcontent-ref %}
