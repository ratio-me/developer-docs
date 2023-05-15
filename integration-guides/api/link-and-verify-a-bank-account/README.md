# Link and Verify a Bank Account

{% hint style="warning" %}
#### A [created user](./#create-the-user) is required to link and verify a bank account
{% endhint %}

## Overview

We use Plaid link user's bank account to Ratio.

Our Bank account API has four actions

* [Link bank account](./#link-bank-account)
* [Re-link bank account](re-link-bank-account.md)
* [Replace existing bank account](update-bank-account.md)
* [Remove existing bank account](delete-bank-account.md)

First, [you will need to install the appropriate Plaid SDK ](<../../../README (1).md#below-you-will-find-links-to-the-various-sdks-plaid-provides-to-launch-plaid-link.>)for your target device (iOS, Android, Web).

You do not need a Plaid account in order to use Ratio because your user is forming a direct relationship with Ratio and Ratio is responsible for all payments, compliance, and risk.

{% hint style="warning" %}
#### **Reminder!**

For iOS and Web implementations you will need to provide us with a **redirect URI** so that Plaid can return users to your application. If you are building an Android app, you must provide us with the **Android Package Name.** These values need to match what you send in your _requestLink_ calls.
{% endhint %}

## Link the bank account

Users can only have one bank account linked to Ratio at a time.  We do not support having multiple bank accounts linked at once.

### Fetch a Plaid link token

The first step in connecting a users bank account is to request a link token from our API, then pass it to Plaid's SDK.

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

You now have a link token that looks something like this:&#x20;

```
link-sandbox-ab12c3d4-0000-123a-987f-26e621c2ee51. 
```

This token needs to be provided to Plaid’s SDK.&#x20;



Once you have initiated the Plaid session using the link token, Plaid completely takes over.  You do not need to do anything and Plaid will not emit any events until onSuccess or onExit.

If onSuccess - the user has successfully linked their bank account and you proceed with adding the bank account to the user account

If onExit - the user did not successfully authenticate their account (closed the Plaid SDK, bank connect was down, etc.) and you should bring them back to the screen that you are launching Plaid from&#x20;

### Add the bank account to the user account

Use the public token that Plaid provides to add the bank account to your user

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

### Bank account verification

After the bank account is added to the user, Ratio runs a verification process to ensure that the user identity tied to the bank account is the same user identity that was provided during KYC.&#x20;

At this point you have two options to notify the user the outcome of their bank verification:

#### Poll for status

* Link status = Active, means that you have successfully added the bank account to the user
* Verification status = Approved, means that we have successfully verified the bank account
* Verification status = Declined stop polling and present the user account flag found on the user object.

{% hint style="danger" %}
#### Verification is typically <5s. We suggest polling 10 times, every 2 seconds, and retry if needed
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

#### Webhook

Alternatively, you can listen for the bank verification event "BANK\_UPDATED" by subscribing to [webhooks](../../../integration-methods/webhooks.md).



### Bank Account Linking and Verification Troubleshooting

{% hint style="warning" %}
#### A [created user](./#create-the-user) with [KYC approved](../kyc.md) is required to verify a bank account

You are free to assign the deposit address, KYC the user, and link their bank account in any order.  However the most common user flow is to [assign the deposit address](../assign-a-deposit-address.md), then [KYC the user](../kyc.md), then [link their bank account](./#link-bank-account).
{% endhint %}

In order for a bank account to become verified, the name on the bank account must match the name provided by the user during KYC. &#x20;

There are 3 common reasons a bank account verification will fail:

1. The user has has attempted to link a business bank account
2. The user has linked a joint bank account where they are not the first name on the account
   * Note that joint accounts are acceptable but banks typically only return the first name on the account and therefore our verification will fail if the users name appears second on the joint account
3. The connection between Plaid and the user's bank is down. This used to be a much larger problem than it is today. Today, more than 60% of bank linking via Plaid is done via Oauth, which experiences near-zero downtime. If a bank connection is down, it is typically available again within a day. &#x20;
