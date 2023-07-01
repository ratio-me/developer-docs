# Callbacks

#### **`onTransactionComplete`**

A function that is called whenever a transaction is completed even if there was a failure.\
As part of the data in the `OrderStatus` object, you will receive the userId for the user that completed the transaction and the ActivityItem detailing the transaction. The userId and activityItem will not be returned if there was an error in processing the order.&#x20;

The `OrderStatus` object is described [here](../react-js-alpha/reference.md#orderstatus)

Example

```tsx
<RatioButton onTransactionComplete={(orderStatus: OrderStatus)=> {
    alert(orderStatus.status)
}}/>
```

#### `onClose`

A function that is called after the Ratio Modal WebView. There is no default behaviour if not provided. As of writing this documentation this function will be called when the user presses the close button in the dialog. It will call the "onClose" function and then close the dialog.

Example

```tsx
<RatioButton onClose={() => {
    alert('Closed')
}}/>
```

#### `onLogin`

A function that is called when the a user is fully authenticated. It is also called when the user's account has been created. The callback returns a `RatioUser` object that is described [here](../react-js-alpha/reference.md#ratiouser).

Example

```tsx
<RatioButton onLogin={(user: RatioUser) => {
    alert(user.firstName)
}}/>
```
