# Quick Start

## Get your API keys

All API requests require a client ID and may also require a client secret. You can obtain this information from Ratio directly. \<TODO: Add dev client support>

## Auth

Most of our APIs require a user authenticated JWT token to be passed in the header. We have several primary and secondary authentication factors available, for the purposes of this guide we'll focus on Email and SMS One-Time Passwords.

### Email OTP

To make your first request, let's start by performing an email OTP authentication. The first step requires you to provide an email address and in response you will receive an email id. The ID you are given helps us link the code to an auth request.

**API**

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/otp/email:send" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "emailAddress": "ratiouser@example.com"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "emailId": "email-test-01234abc-0000-0000-0000-0123456789"
}
```
{% endtab %}
{% endtabs %}

**Code**

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.staging.ratio.me/v1/auth/otp/email:send' \
--header 'ratio-client-id: {YOUR CLIENT ID}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "emailAddress":"ratiouser@example.com"
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}

After issuing this first request, the user will receive an email with a code in their inbox, follow up by submitting a request to our authenticate step with the email id and code given. If this is valid, you will receive a JWT.

**API**

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/otp/email:authenticate" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "emailId": "email-test-01234abc-0000-0000-0000-0123456789",
    "otp": "123456",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "sessionJwt": "eyJ............"
}
```
{% endtab %}
{% endtabs %}

**Code**

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.staging.ratio.me/v1/auth/otp/email:authenticate' \
--header 'ratio-client-id: {YOUR CLIENT ID}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp": "123456",
    "emailId": "email-test-01234abc-0000-0000-0000-0123456789"
}'sh
```
{% endcode %}
{% endtab %}
{% endtabs %}

### SMS OTP

Many of our APIs require two factors of authentication, in this case we'll use SMS to provide us a one time code as a form of verification. The first step is to provide the user's phone number so that they may be sent a code. In the subsequent requests, you want to make sure you set your Authorization header to include the JWT you received from the email authentication. Doing so allows the SMS authentication to be joined with the Email session for a verifiable multi-factor session.

**API**

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:send" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "phoneNumber": "+14165551234",
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789",
}
```
{% endtab %}
{% endtabs %}

**Code**

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.staging.ratio.me/v1/auth/otp/sms:send' \
--header 'Authorization: Bearer eyJ......' \
--header 'ratio-client-id: {YOUR CLIENT ID}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber": "+14165551234"
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}

After the first request is sent, the user should receive a code on their mobile device. Similar to the Email OTP method, you now need to provide that code along with the phone id you received. Once again, make sure you include the Authorization header with the Bearer JWT. If this is valid, you will actually receive a new JWT, be sure to use this in subsequent calls as this JWT contains both of the auth factors, indicating an MFA session.

**API**

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:authenticate" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789",
    "otp": "123456",
}
```
{% endtab %}

{% tab title="Response" %}
<pre class="language-json"><code class="lang-json"><strong>{
</strong>    "sessionJwt": "eyJ............"
}</code></pre>
{% endtab %}
{% endtabs %}

**Code**

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.staging.ratio.me/v1/auth/otp/sms:authenticate' \
--header 'ratio-client-id: {YOUR CLIENT ID}' \
--header 'Authorization: Bearer eyJ......' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp": "123456",
    "phoneId": "phone-number-test-01234abc-0000-0000-0000-0123456789"
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}

## User

### Create a new user

At this point you now have an authenticated user session, we will use that token to create a user on Ratio. Assuming you've gathered the necessary data, submit the user information to Ratio to create that user. In the request, specifying that the user has accepted the terms implies that you have presented to the user the following term (link) and that they have accepted them.

**API**

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/users" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "email": "ratiouser@example.com",
    "firstName": "Ratio",
    "middleName": "Optional",
    "lastName": "User",
    "country": "US",
    "phone": "+14165551234",
    "acceptedTerms": true
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
  "id": "01234abc-0000-0000-0000-0123456789",
  "firstName": "Ratio",
  "middleName": "Optional",
  "lastName": "User",
  "email": "ratiouser@example.com",
  "country": "US",
  "phone": "+14168557657",
  "preferredMfaMethod": "OTP_SMS",
}
```
{% endtab %}
{% endtabs %}

**Code**

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.staging.ratio.me/v1/users' \
--header 'ratio-client-id: {YOUR CLIENT ID}' \
--header 'Authorization: Bearer eyJ.....' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ratiouser@example.com",
    "firstName": "Ratio",
    "middleName": "Optional",
    "lastName": "User",
    "country": "US",
    "phone": "+14165551234",
    "acceptedTerms": true
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}
