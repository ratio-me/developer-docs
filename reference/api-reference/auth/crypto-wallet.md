# Crypto Wallet

## Overview

Our wallet signing APIs currently support either Ethereum or Solana wallets, and require two steps to authenticate a user: First providing a wallet to retrieve a challenge phrase, that you sign with the user's wallet, and then a second call providing that signature with that wallet. This will return you an authenticated JWT.

{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:start" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}



{% swagger src="https://api.staging.ratio.me/v1/api-docs" path="/v1/auth/cryptoWallet:authenticate" method="post" %}
[https://api.staging.ratio.me/v1/api-docs](https://api.staging.ratio.me/v1/api-docs)
{% endswagger %}
