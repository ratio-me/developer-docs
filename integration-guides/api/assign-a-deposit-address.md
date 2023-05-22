# Assign a Deposit Address

{% hint style="warning" %}
#### The user must be [created](assign-a-deposit-address.md#create-the-user) and signed in to assign a deposit address.
{% endhint %}

A wallet can be given a nickname. You can allow the user to assign this nickname (ie. "Collectibles"), or their name, (ie. "Dylan Smith"), to help with differentiation. This can be done when you create the user account, or anytime after.

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/wallets" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

## Next steps

After assigning a wallet to a created user we have two requirements to initiate an ACH transfer:

* [The user must be KYC approved](kyc.md)
* [The user must have a verified bank account](link-and-verify-a-bank-account/)

You are free to complete the remaining tasks in any order, however, we recommend assigning the deposit address next, then [KYC](kyc.md), then linking and verifying their bank account.
