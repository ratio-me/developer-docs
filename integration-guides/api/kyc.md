# KYC

{% hint style="warning" %}
#### You must [create the user](kyc.md#create-the-user) before to submitting customer data for KYC approval
{% endhint %}

## Required user data

You must submit the following user data:

* Date of Birth
* ID type (SSN)&#x20;
* ID Number&#x20;
* Address Line 1&#x20;
* Address Line 2&#x20;
* City&#x20;
* State&#x20;
* Postal Code

You should not store this information.  It should be sent directly to Ratio from your front-end application.

## Initiate KYC&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/kyc" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## KYC results

You have two options to notify the user the outcome of their KYC:

1. Poll for status:
   * Approved
   * Declined
   * In Review
2. Listen for the KYC event "KYC\_UPDATED" in our [webhooks](../../api-reference/webhooks/)

{% hint style="danger" %}
#### You should limit the amount of times you poll. Suggested (10 times, every 2 seconds) and retry if needed
{% endhint %}

There are 3 common reasons why KYC status could = In Review:

1. The user has mistyped their Date of Birth
2. The user has recently moved, and therefore the address provided does not match the addresses available from our underlying data providers
3. The user has created an account using a phone number that is not under their name

If we cannot match any customer-provided information with their SSN you will receive a status of Declined. In most cases, when no customer information can be matched to the provided SSN, this is not a real user. This will not generate an end user support case. &#x20;

## Next steps

After KYC'ing a user, you need to link and verify a bank account, and assign a deposit address, before you can initiate an ACH transfer:

* [Assign deposit address](assign-a-deposit-address.md)
  * If you used wallet as the primary user authentication factor, then we have already set that as the deposit address. You can set additional deposit addresses as needed.
* [Have a verified bank account](link-and-verify-a-bank-account/)

You are free to complete the remaining tasks in any order, however we recommend [assigning the ](assign-a-deposit-address.md)[deposit address first](assign-a-deposit-address.md) (if you haven't already), and then [linking their bank account](link-and-verify-a-bank-account/#link-bank-account).

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

You have two options to notify the user the outcome of their bank verification:

1. Poll for status:
   * Link status = Active
   * Verification status = Approved
   * If Vefification stauts = Declined stop polling and present error.
2. Listen for the bank verification event "BANK\_UPDATED" in our [webhooks](../../api-reference/webhooks/)
