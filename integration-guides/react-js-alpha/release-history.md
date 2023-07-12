# Release History

### v0.0.5-alpha.14

Date: July 11, 2023

Notes:

* fix: UI bug from buy crypto. fixed number format for ach call\


### v0.0.5-alpha.13

Date: July 11, 2023

Notes:

* feature: added loadingText prop&#x20;
* feature: plaid bank account relinking&#x20;
* feature: handle email OTP errors and user flags after wallet linking
* feature: added error message to buy crypto dashboard&#x20;

### v0.0.5-alpha.12

Date: July 4, 2023

Notes:

* feature: Support EVM signing and wallet types
* fix: Bugs caused by not supporting EVM signing and wallet types

### v0.0.5-alpha.11

Date: June 30, 2023

Notes:

* feature: made redirect URI optional
* feature: added checks for embedded browsers

### v0.0.5-alpha.8

Date: June 29, 2023

Notes:

* feat: refactored out button link to own file, renamed TextButton, added hover states&#x20;
* feature: added approved limits screen, code clean up
* feature: added onPress, onError callbacks and disabled button theme
* feature: added preset order option to be passed into RatioButton

### v0.0.5-alpha.7

Date: June 23, 2023

Notes:

* Handle email already exists error on account creation
* Handle failures during KYC polling
* Added screens for different user flags
* Added call to configuration endpoint

### v0.0.5-alpha.6

Date: June 15, 2023

Notes:

* Added onLogin, onClose, and onTransactionComplete callbacks

### v0.0.5-alpha.5

Date: Jun 12, 2023

Notes:

* More styling improvements
* Improvements to bank linking flow

### v0.0.5-alpha.2

Date: May 30, 2023

Notes:

* Added `redirectUri` as property to `RatioButton.`This is required in order to successfully link a user's bank account to their Ratio user acount
* Added "Resend code" button to allow for existing user to resend SMS OTP code

### v0.0.5-alpha.1

Date: May 30, 2023

Notes:

* Initial Release

