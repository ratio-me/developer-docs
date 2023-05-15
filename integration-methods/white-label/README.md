# API

{% hint style="warning" %}
#### Reminder, to get started:

* Obtain a clientID & secret
* Install the appropriate Plaid SDK
* Provide us with a redirect URI or Android Package Name to be used alongside Plaid
* Provide us with anonymized device biometrics in the header of each API call

&#x20;Please refer to the [integrating with Ratio](<../../README (1).md#integrating-with-ratio>) section here for more details
{% endhint %}

## Important info

{% hint style="info" %}
#### Our JWTs expire after 5 minutes, and user sessions expire after 10 minutes of inactivity.&#x20;

When a JWT nears expiry, we will refresh it in the background and provide you a new JWT in the following response header: **ratio-authentication-refresh**.&#x20;

If you encounter this header, you should begin using the new JWT.
{% endhint %}

### Base URLs

Production:  [https://api.ratio.me/](https://api.staging.ratio.me/)

Sandbox: _Coming soon_

## API

{% hint style="info" %}
#### We strongly recommend that you follow our API implementation guide in the order it is presented below.&#x20;
{% endhint %}

* [Create new user](../../integration-guides/api/create-a-user.md) <mark style="background-color:green;">**<--Start here**</mark>
* [Assign user deposit address](../../integration-guides/api/assign-a-deposit-address.md)
* [KYC user](../../integration-guides/api/kyc.md)
* [Link a bank account](../../integration-guides/api/link-and-verify-a-bank-account/)
* [Sign in](../../guides/user-authentication.md)
* [Buy crypto](../../integration-guides/api/buy-crypto-ach.md)
* [Transaction activity](../../reference/api/activity.md)

## Resources

* [Authentication methods](../../reference/api/auth/crypto-wallet.md)
* [Custom headers](../../reference/api/custom-headers.md)
* [Webhooks](../webhooks.md)
  * [Webhook registrations](../../reference/api/webhook-registrations.md)
* [Types Glossary](../../reference/api/types-glossary.md)
* [Postman](https://www.postman.com/ratiodotme/workspace/ratio-public-workspace)
* [Specification](https://api.staging.ratio.me/v1/api-docs)
* [UX/UI starter kit](https://www.figma.com/file/89pkvTfqkMkKuTI0Mrzl7l/UX-Starter-Kit-v1.1?type=design\&node-id=0%3A1\&t=PRCLzsAxfRbkVdFA-1)
