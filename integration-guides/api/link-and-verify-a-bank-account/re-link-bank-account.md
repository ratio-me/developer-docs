# Re-link Bank Account

Bank account connections can be disconnected from time to time, possibly at the request of the user or the financial institution. If a user wishes to perform a transaction, but the bank link has been disconnected, you will receive a [bankLinkstatus = "LOGIN\_REQUIRED"](https://app.gitbook.com/o/rMOFEmlooWU9OMmsW6eC/s/CUFO0IuHQJVzBX1zbmIL/\~/changes/117/reference/types-glossary#banklinkstatus) . To repair this, request an update token and go through the Plaid flow again.&#x20;

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

##
