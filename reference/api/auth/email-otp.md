# 📩 Email OTP



{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/email:send" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
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
    "emailId": "email-test-01234abc-0000-0000-0000-0123456789",
    "emailMask": "rat...@example.com"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/email:send' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "emailAddress":"ratiouser@example.com"
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/email:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
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

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/email:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "otp": "123456",
    "emailId": "email-test-01234abc-0000-0000-0000-0123456789"
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}
