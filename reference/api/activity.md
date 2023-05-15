---
description: >-
  Once you have successfully submitted a crypto purchase transaction, you should
  monitor the transaction status.
---

# Transaction Monitoring

You will monitor the transaction status using the activity ID returned by the /ach endpoint.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/activity/{activityId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## Crypto Status

The crypto status will always start as PENDING. Then will go to COMPLETE or FAILED.&#x20;

The crypto status will be marked as COMPLETE when the transaction has been successfully executed onchain. This can take 20 seconds (Polygon) to minutes (Ethereum) depending on the chain and network congestion.

We recommend that you exit the user from the purchase flow as soon as the transaction is accepted and crypto status = PENDING.

We recommend polling the crypto status or subscribing to activity item events via [webhooks](https://app.gitbook.com/o/rMOFEmlooWU9OMmsW6eC/s/CUFO0IuHQJVzBX1zbmIL/\~/changes/117/reference/webhooks), so that you can present the transaction hash to the user once the transaction is marked COMPLETE.

{% hint style="info" %}
If you are going to poll for the crypto status update we recommend every 2 seconds, for 10 times, and then polling every 10 seconds thereafter until the status changes
{% endhint %}

### If COMPLETE

You can retrieve the `transactionHash`

### If FAILED

you should GET /user and review the flags. There will be a Transaction Processing flag on the account

## Fiat Status

You do not need to monitor the fiat status of an activity item. If the fiat status fails you will be able to handle the error by looking at the user account flags.
