# 📲 SMS OTP



{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:send" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
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
    "phoneMask": "1234"
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/sms:send' \
--header 'Authorization: Bearer eyJ......' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber": "+14165551234"
}'
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/auth/otp/sms:authenticate" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
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
}
</code></pre>
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
{% code overflow="wrap" %}
```shell
curl --location --request POST 'https://api.ratio.me/v1/auth/otp/sms:authenticate' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
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
