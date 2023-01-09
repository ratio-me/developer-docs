# User Onboarding

Ratio handles the entire scope of compliance on your behalf.

## Bank Account Linking

You can ask a user to link their bank account at any point after their user account is created; even before you do KYC.&#x20;

The reason to link a user's bank account in advance of KYC, is because we underwrite customers ACH limits in the background using their bank account transaction history. Linking the user's bank account early in the flow allows us to process their bank account transaction history in the background while they are completing the KYC flow.

## KYC

{% hint style="info" %}
Across our network, 95% of users are identified and approved instantly. &#x20;
{% endhint %}

All users of the Ratio service must provide information so that we can verify their identity.  The following information must be collected in order to identify the user:

* Full Name
* Date of Birth
* Social Security Number
* Current Address

There are 2 common reasons why KYC may fail:

1. The user has mistyped their Date of Birth
2. The user has recently moved, and therefore the address provided does not match the addresses available from our underlying data providers

If we cannot match any customer-provided information with their SSN, we recommend displaying a generic failure message to the user.  At this point, you should only take action on that user file in the event that the user reaches out to your support team.  In most cases, when no customer information can be matched to the provided SSN, this is not a real user.

## Sanctions Screening

We perform a sanctions screen (OFAC, PEP, etc.) on each user during onboarding as well as monthly.  If a sanctions match is found, we return this information to you and the user should be shown a generic failure message. Ratio will review all sanctions screen matches within 48 hours.  You can subscribe to receive a webhook when the review is complete and notify the user that their account is ready.  Note that in almost all cases a sanctions screen match is a false positive.

## Bank Account Verification

In order for a bank account to become verified, the name on the bank account must match the name provided by the user during KYC. &#x20;

There are 3 common reasons a bank account verification will fail:

1. The user has has attempted to link a business bank account
2. The user has linked a joint bank account where they are not the first name on the account
   * Note that joint accounts are acceptable but banks typically only return the first name on the account and therefore our verification will fail if the users name appears second on the joint account
3. The connection between Plaid and the user's bank is down. This used to be a much larger problem than it is today. Today, more than 60% of bank linking via Plaid is done via Oauth, which experiences near-zero downtime. If a bank connection is down, it is typically available again within a day. &#x20;
