# Buy Crypto (ACH)

{% hint style="warning" %}
#### A [created user](buy-crypto-ach.md#create-the-user) with [KYC approved](kyc.md) and [a verified bank account](link-and-verify-a-bank-account/#bank-account-verification) is required to buy crypto
{% endhint %}

## Check Remaining Limits&#x20;

{% hint style="info" %}
#### For a more detailed explanation of how limits are calculated, please contact us. &#x20;

Users can submit up to 4 transactions per rolling 24-hour period.  Limits in that period are up to $3,000 USD for instant ACH, and up to $5,000 USD for standard ACH
{% endhint %}

The Calculate ACH limits endpoint returns the user's remaining daily and weekly limits by transaction type (Instant ACH or Standard ACH)

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}:calculateAchLimits" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

### Transaction Minimums

Ethereum = $20

Polygon = $1.

We use device biometrics and linked bank account transaction history to determine each user's transaction limits.&#x20;

## Crypto Prices

{% hint style="info" %}
Please see our list of [supported fiat currencies and crypto tokens](../../reference/supported-currencies.md) and[ enum](../../api-reference/types-glossary.md#currency) for formatting and network support.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/crypto/prices" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## Initiate ACH

When initiating a crypto purchase, you must present a transaction confirmation and required customer notices according to the Ratio [UI requirements](../../design-reference/ui-requirements.md).

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}/ach" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

After submitting the request, you will get an activity ID in the response.  Use this to monitor the transaction status.&#x20;
