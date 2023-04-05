# 🏦 Bank

## Overview

The following endpoints provide APIs to allow you to manage a user's bank connections and perform actions with those bank accounts, for example, ACH transactions.

To understand how we link bank accounts with Plaid, check out our documentation on [Plaid Bank Linking](../../guides/plaid-bank-linking/).

There are three steps to linking a user's bank account:

1. Requesting a Plaid Link token
2. Presenting the Plaid Link modal to the user by passing it the link token (see docs).
3. Capturing the public token from the Plaid Link modal and activating their account with Ratio.

{% hint style="warning" %}
You will need to provide us with a **redirect URI** so that we can add it to Plaid

If you are building an Android app, you also need to provide us with the **Android Package Name**

These values you send to Ratio need to match what you send in your `requestLink` calls.
{% endhint %}

#### Request Bank Link

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
  "redirectUri": "https://your.redirecturi.com",
  "androidPackageName": "com.example"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "linkToken": "link-sandbox-ab12c3d4-0000-123a-987f-26e621c2ee51"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/users/<USER_ID>/banks:requestLink' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
  "redirectUri": "<YOUR_REDIRECT_URI>",
  "androidPackageName": "<YOUR_ANDROID_PACKAGE_NAME>"
}'
```
{% endtab %}
{% endtabs %}

#### Activate Bank Link

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:activateLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
  "publicToken": "public-sandbox-72ffcabb-7eb1-4ac7-b7e4-d2261e3fa78f"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "bankAccount": {
    "id": "string",
    "createTime": "2023-04-05T18:58:07.546Z",
    "updateTime": "2023-04-05T18:58:07.546Z",
    "name": "Account Name",
    "mask": "1234",
    "linkStatus": "INACTIVE",
    "verificationStatus": "IN_REVIEW"
  }
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/users/<USER_ID>/banks:activateLink' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
  "redirectUri": "<YOUR_REDIRECT_URI>",
  "androidPackageName": "<YOUR_ANDROID_PACKAGE_NAME>"
}'
```
{% endtab %}
{% endtabs %}

#### Update Link Token (re-login)

{% hint style="info" %}
Note: Sometimes bank accounts can become disconnected and require the user to log in once more. We provide an update link token endpoint for this exact reason.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

#### Unlink Bank Account

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="delete" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

#### Retrieve Bank Account

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

#### Initiate ACH

Once a bank has been linked and [verified](types-glossary.md#bankverificationstatus), use the following endpoint to make a crypto purchase via ACH. You can obtain the verification status from the `GET /banks/{id}` call above, or by [subscribing](webhook-registrations.md#subscribe-to-a-new-webhook) to the appropriate [webhook](../../integration-methods/webhooks.md).

{% hint style="info" %}
Please see our list of [supported currencies](../supported-currencies.md) or our [Currency enum](types-glossary.md#currency) for reference on formatting and network support.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}/ach" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}
