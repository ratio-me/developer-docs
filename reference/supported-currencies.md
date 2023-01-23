# Supported Currencies

The table below lists all our supported cryptocurrencies, and the networks on which we support them, as well as the enum value to use in our APIs. You will note that we use the cryptocurrency symbol alone if it is the base currency for that network, such as `ETH` on `Ethereum`. If it is not a base currency, we will append the suffix `_<NETWORK>` to the symbol name, such as `USDC_ETHEREUM`.

#### Cryptocurrency

| Currency Name | Network  | API Enum Value |
| ------------- | -------- | -------------- |
| Ethereum      | Ethereum | ETH            |
| Polygon       | Polygon  | MATIC          |
| USDC          | Ethereum | USDC\_ETHEREUM |
| USDC          | Polygon  | USDC\_POLYGON  |

#### Fiat Currency

| Currency Name | Symbol | API Enum Value |
| ------------- | ------ | -------------- |
| US Dollars    | USD    | USD            |
