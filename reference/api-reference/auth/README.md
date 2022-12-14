# 🔐 Auth

## Overview

Most of our APIs require a form of user authentication, for which we have provided several means of obtaining that authentication.

Crypto Wallet authentication allows you to have a user sign in with their crypto wallet by performing a signing transaction. Email and SMS OTP will send one-time codes to the method specified.

Once a successful authentication takes place, you will receive a `JWT` that is to be passed into the `Authorization` header as a `Bearer` token for subsequent requests. When adding a second authentication factor, such as SMS after an Email OTP, you must add the initial `JWT` to the headers for the subsequent auth calls to ensure they're authenticated to the same session.&#x20;

{% hint style="warning" %}
The `JWT` tokens have a lifetime of 5 minutes, and a user session has a lifetime of 10 minutes of inactivity.&#x20;

When a `JWT` nears expiry, we will refresh it in the background and provide you a new `JWT` in the following response header: `ratio-authentication-refresh`.&#x20;

If you encounter this header, you should begin using the new `JWT`.
{% endhint %}

## Primary Auth Factors

{% content-ref url="crypto-wallet.md" %}
[crypto-wallet.md](crypto-wallet.md)
{% endcontent-ref %}

{% content-ref url="email-otp.md" %}
[email-otp.md](email-otp.md)
{% endcontent-ref %}

## Secondary Auth Factors

{% content-ref url="sms-otp.md" %}
[sms-otp.md](sms-otp.md)
{% endcontent-ref %}
