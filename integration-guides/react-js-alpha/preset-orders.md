# Preset Orders

You are able to pass in order details, allowing you to send the user directly to the order review screen.

In order to do this, you must pass a `RatioPresetOrder` object into the `RatioButton` component with the `presetOrder` attribute.

Example&#x20;

```jsx
<RatioButton presetOrder={
              {
                fiatAmount: 20,
                cryptoCurrency: 'ETH'
              } as RatioPresetOrder
          }/>
```

If you pass null, or omit the attribute, the Ratio flow will have the default functionality when the view is pressed.&#x20;

For more details please see the example below

{% content-ref url="example.md" %}
[example.md](example.md)
{% endcontent-ref %}

### All supported Cryptos can be used with Preset Orders

<table><thead><tr><th width="189">Crypto Currency</th><th width="115">Network</th><th width="204">Minimum Fiat Amount</th><th>Ach types</th></tr></thead><tbody><tr><td>ETH</td><td>Ethereum</td><td>$20 USD</td><td>Standard, Instant</td></tr><tr><td>USDC_ETHEREUM</td><td>Ethereum</td><td>$20 USD</td><td>Standard, Instant</td></tr><tr><td>MATIC</td><td>Polygon</td><td>$1 USD</td><td>Standard, Instant</td></tr><tr><td>USDC_POLYGON</td><td>Polygon</td><td>$1 USD</td><td>Standard, Instant</td></tr><tr><td>AMKT_POLYGON</td><td>Polygon</td><td>$1 USD</td><td>Instant</td></tr></tbody></table>

### Handling User Limits&#x20;

If you are also using the Ratio API, you will be able to check the user's limits before providing the preset order by calling the [transaction-limits.md](../api/transaction-limits.md "mention") endpoint. This will ensure that when the Ratio flow is opened, the order will have a valid amount rather than let the user know they are unable to perform the transaction. \
\
This is an optional step as the React JS Library checks the user's remaining limit at the start of the user session.

