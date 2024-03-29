# Custom Headers

#### ratio-device-fingerprint <a href="#ratio-device-fingerprint" id="ratio-device-fingerprint"></a>

As part of our fraud prevention program, we require that you include a `ratio-device-fingerprint` header in your API calls. This header allows us to perform a user device risk assessment based on various attributes of the device that is making the request.

The `ratio-device-fingerprint` header must be a base64 encoding of a stringified JSON object that contains the following fields:

* `ip`: IP address of the request
* _**Browser-based implementations**_**:**
  * `userAgent`: The user agent of the browser that is interacting with your website.
* _**Mobile-based implementations**_**:**
  * `os`: The operating system on which application is running. (e.g. iOS, Android)
  * `osVersion`: The operating system version on which application is running. (e.g. 10.3.1, 7.1.1)
  * `deviceManufacturer`: The manufacturer of the device on which application is running. (e.g. Samsung, Apple, LG)
  * `deviceModel`: The model of the device on which application is running. (e.g. SM-G920x, iPhone8,1)
  * `deviceUniqueId`: The unique ID of the device on which application is running. For iOS, send the IFV identifier. For Android, send the Android ID.

#### For example, a browser-based request from a Windows 10 machine using Chrome would have a header like this:

ratio-device-fingerprint: eyJpcCI6IjE5Mi4xNjguMC4xIiwidXNlckFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk0LjAuNDYwNi4xMjEgU2FmYXJpLzUzNy4zNiJ9The stringified JSON object before encoding is:"{\\"ip\\":\\"192.168.0.1\\",\\"userAgent\\":\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.121 Safari/537.36\\"}"

#### A device-based request from an Android phone using Samsung Galaxy S21 would have a header like this:

ratio-device-fingerprint: eyJpcCI6IjE5Mi4xNjguMC4yIiwib3MiOiJBbmRyb2lkIiwib3NWZXJzaW9uIjoiMTEiLCJkZXZpY2VNYW51ZmFjdHVyZXIiOiJTYW1zdW5nIiwiZGV2aWNlTW9kZWwiOiJHYWxheHkgUzIxIiwiZGV2aWNlVW5pcXVlSWQiOiJhYmNkMTIzNC1lZmdoLTU2NzgtaWprbC03ODkwIn0=The stringified JSON object before encoding is:"{\\"ip\\":\\"192.168.0.2\\",\\"os\\":\\"Android\\",\\"osVersion\\":\\"11\\",\\"deviceManufacturer\\":\\"Samsung\\",\\"deviceModel\\":\\"Galaxy S21\\",\\"deviceUniqueId\\":\\"abcd1234-efgh-5678-ijkl-7890\\"}"Please note that the stringified JSON object must be valid and well-formed.
