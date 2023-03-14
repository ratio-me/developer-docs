# Webhooks

Subscribe to Ratio's webhooks to get automatic updates on resources such as KYC, bank connections, and transactions. Many of the operations for which we provide webhooks occur asynchronously; our webhooks allow you to take action immediately.

### Subscribing

The first thing you need to do is to create a webhook. You should call our [Webhook APIs](../reference/api/webhook-registrations.md) with your <mark style="color:orange;">Client ID</mark> and <mark style="color:orange;">Client Secret</mark> to do this. This endpoint requires a URL and a list of subscribed events; in return, it will provide you with a <mark style="color:green;">secret</mark>.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/webhooks" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="info" %}
It is recommended to store your webhook secret securely; this unique secret will be used to verify the webhook data. This is _not_ the same value as your <mark style="color:orange;">Client Secret</mark>. Once it has been created, the secret cannot be retrieved again.
{% endhint %}

{% tabs %}
{% tab title="Request" %}
```json
{
  "name": "My Webhook",
  "url": "https://example.com/webhook",
  "events": [
    "ACTIVITY_UPDATED",
    "BANK_UPDATED",
    "KYC_UPDATED"
  ]
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "My Webhook",
  "url": "https://example.com/webhook",
  "events": [
    "ACTIVITY_UPDATED",
    "BANK_UPDATED",
    "KYC_UPDATED"
  ],
  "secret": "secretstring",
  "createdAt": "2022-10-29T12:00:00.000Z",
  "updatedAt": "2022-10-30T12:00:00.000Z"
}
```
{% endtab %}
{% endtabs %}

### Consuming

Now that you've created a webhook and stored your webhook secret, you're ready to begin receiving webhook events.

We will `POST` the webhook events to the URL you've provided for all Ratio users active on your <mark style="color:orange;">Client</mark>. In the webhook, you will receive the webhook data, a timestamp header, and a signature header.

In order to securely validate that the webhook content you receive was sent by Ratio, you will need to use your webhook secret to generate the HMAC signature and compare it to the one you receive. We use a SHA512 HMAC signature from the secret we provided you, with the timestamp and webhook content in the following format: `timestamp.{jsonstring}`. We then hex encode it for transmit and add it to the headers.

{% tabs %}
{% tab title="Typescript" %}
```typescript
const timestamp = request.headers["ratio-webhook-signature-timestamp"];
const signature = request.headers["ratio-webhook-signature"];
const data = request.body;

const hmac = createHmac("sha512", "secretstring")
  .update(timestamp + "." + JSON.stringify(data))
  .digest("hex");

const valid = hmac === signature;
```
{% endtab %}
{% endtabs %}

#### Schema

```
{
  userId: <USER_ID>,
  event: <EVENT_ENUM>,
  id: <UNIQUE_WEBHOOK_EVENT_ID>,
  data: {
    <WEBHOOK_API_DATA_TYPE>
  }
}
```

* The `event` field will be one of the event types that you subscribed to, [found here](../reference/api/types-glossary.md#webhookevent).
* The `data` field will be the API object that corresponds to the specific event type. This will be one of [ActivityItem](../reference/api/types-glossary.md#activityitem), [BankAccount](../reference/api/types-glossary.md#bankaccount), or [KycResult](../reference/api/types-glossary.md#kycresult).
