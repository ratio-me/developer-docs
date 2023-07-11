# Crypto

### Overview

API endpoints here pertain to any operations we expose on the cryptocurrency or networks. For example, you would use these APIs to retrieve the current prices for cryptocurrencies to display to your users.

{% hint style="info" %}
Please see our list of supported currencies or our Currency enum for reference on formatting and network support.
{% endhint %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/crypto/prices" method="get" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% swagger src="https://api.ratio.me/v1/api-docs" path="/v1/crypto/estimates:ach" method="post" %}
[https://api.ratio.me/v1/api-docs](https://api.ratio.me/v1/api-docs)
{% endswagger %}

{% hint style="info" %}
You will need to provide either `fiatAmount` or `minCryptoAmount`.&#x20;

\
`fiatAmount` - The total amount in fiat to be exchanged. Fees will be top down.

`minCryptoAmount` - The minimum amount in crypto to be exchanged for. Fees will be bottom up.
{% endhint %}

{% tabs %}
{% tab title="Request" %}
```json
{
    "fiatAmount": "100",
    "type": "INSTANT",
    "cryptoCurrency": "ETH"
}
```
{% endtab %}

{% tab title="Response" %}
```json
{
    "fiat": {
        "currency": "USD",
  	"amount": "100.00",
        "direction": "CREDIT",
  	"fundingMethod": "ACH_ORIGINATED_INSTANT"
    },
    "crypto": {
        "currency": "ETH",
        "direction": "DEBIT",
  	"amount": "0.04956182056",
  	"price": "1910.54",
  	"ratioFee": "3.00",
  	"networkFee": "2.31"
    }
}
```
{% endtab %}
{% endtabs %}

{% tabs %}
{% tab title="cURL" %}
```shell
curl --location -g --request POST 'https://api.ratio.me/v1/crypto/estimates:ach' \
--header 'ratio-client-id: <YOUR_CLIENT_ID>' \
--header 'ratio-client-secret: <YOUR_CLIENT_SECRET>' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--data-raw '{
    "fiatAmount": "100",
    "type": "INSTANT",
    "cryptoCurrency": "ETH"
}'
```
{% endtab %}
{% endtabs %}
