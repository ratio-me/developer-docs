# Integration Testing

We have a staging environment that can be used for you to perform integration testing. In this environment, you can test an entire end-to-end flow including creating a new user, performing KYC, and making purchases.

{% hint style="info" %}
Our staging URL is: [https://api.staging.ratio.me/](https://api.staging.ratio.me/)
{% endhint %}

## Test Data

Our staging environment is integrated with our partners' testing environments, such as [`Plaid's Sandbox`](https://plaid.com/docs/sandbox/) environment. As such, it is important that if you wish to do any user creation or bank account, you use the following data.

#### User + KYC

* First Name: Alberta
* Middle Name: Bobbeth
* Last Name: Charleson
* SSN: Any SSN starting with 2 through 9 will be approved
* IDV: This will always pass in our staging environment.
* Address:&#x20;
  * City: San Matias
  * Country: US
  * Postal Code: 93405-2255
  * Region: CA
  * Street: 2493 Leisure Lane

#### Bank Info

* Bank Name: Tartan Bank
* User Name: `user_good`
* Password: `pass_good`
* Account: Recommend using **Plaid Checking**

``![](<../.gitbook/assets/image (9).png>)``![](<../.gitbook/assets/image (5).png>)``

``![](<../.gitbook/assets/image (7).png>)``![](<../.gitbook/assets/image (8).png>)``

## Test Networks (TBD)

Our staging environment supports the following blockchain test networks:

* Ethereum: Goerli
* Bitcoin: BTC Testnet
* Polygon: Mumbai
* Solana: DevNet
