# 🪝 Webhook Registrations

## Overview

The following APIs allow you to register for <mark style="color:green;">webhooks</mark> and manage your registrations. You can make a call to list all the available <mark style="color:blue;">events</mark> at any time; as more get added, they will be present in that response.

Currently, a single client is limited to 10 <mark style="color:green;">webhook</mark> registrations; however, you can subscribe to several events under the same <mark style="color:green;">webhook</mark> URL.

{% hint style="info" %}
Note: When you create a <mark style="color:green;">webhook</mark> registration, you will receive a <mark style="color:red;">secret key</mark>. Store that key securely, as you will later use it to validate your <mark style="color:green;">webhook</mark> data on receipt.
{% endhint %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/webhooks/events" method="get" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/webhooks" method="get" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/webhooks/{webhookId}" method="get" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/webhooks" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/webhooks/{webhookId}" method="patch" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/webhooks/{webhookId}" method="delete" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}
