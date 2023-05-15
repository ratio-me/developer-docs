---
description: >-
  Once the user has a verified bank account, you can retrieve their ACH
  transaction limits.
---

# Transaction Limits

We recommend polling for the users ACH transaction limits.  The response object for calculateAchlimits is not presenting itself properly below (because Gitbook.. if you know you know). &#x20;

You will receive 422 status until the limits have been calculated, which will be near instant.

Here is the object:

&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}:calculateAchLimits" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

Here is a reference for how we present account limits in our React Native SDK.

![](<../../.gitbook/assets/image (9).png>)

## Next steps

{% hint style="success" %}
#### If you followed our guide, you are now ready to Buy Crypto
{% endhint %}

* [Buy crypto](buy-crypto-ach.md)
* [View transaction activity](../../reference/api/activity.md)
