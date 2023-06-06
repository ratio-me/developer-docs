# User Account Flags

User flags are returned in the users object. They are the primary way you will handle unhappy path events. You should always look for user account flags when you GET /user.

## UI Requirements

Below, you will find user flags categorized by type. Please click on the link for each and review the table with information about required error messaging.

* You must map each flag to the required error message
* For all flags except F0000, the user must still have access to their personal information
* For all other flags, the user must still access to transaction history

## Categories of User Account Flags

### [KYC Review](kyc-review.md)

Once you submit KYC, GET /user and look for the KYC sub-object `"status": "APPROVED"`. If the endpoint returns `“IN_REVIEW”` or `“DECLINED”` use the KYC Review and Fraud flags to direct the user to the required error message.

### [Transaction Processing](transaction-processing.md)

When you submit an ACH transaction, you will monitor the transaction by looking at the crypto status. The crypto status will always start as PENDING. Then will go to COMPLETE or FAILED.

1. If COMPLETE, you can retrieve the `transactionHash`
2. If FAILED, you should GET /user and review the flags. There will be a Transaction Processing flag on the account

### [Non Sufficient Funds (NSF) and Returned Payments](nsfs-and-returned-payments.md)

You do not need to think about these flags as part of creating purchases. These flags are only set if a user’s payment fails to settle with Ratio, or if it is returned by their bank account at a future date. You should always review the flags when calling GET /user

### [Fraud](fraud.md)

These flags restrict all write operations on the user account.

