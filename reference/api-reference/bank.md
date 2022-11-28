# 🏦 Bank

## Overview

The following endpoints provide APIs to allow you to manage a user's bank connections and perform actions with those bank accounts, ie. ACH transactions.

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:requestLink" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks:activateLink" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}:requestLink" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}/ach" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users/{userId}/banks/{bankId}" method="delete" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}
