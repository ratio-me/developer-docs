---
description: >-
  The Ratio React Native SDK allows partners to embed and connect to Ratio’s
  application from their React Native application.
---

# React Native

The React Native SDK provides a `RatioComponent` component that requires a few parameters (listed below). This component allows for a few customizations so that it can be placed anywhere within your app.

The `RatioComponent` takes a child view that is wrapped using a `<TouchableOpacity/>` component. This means that whatever view is passed into the `RatioComponent` will be clickable. Our suggestion is to use the view as a custom "button" to allow users access Ratio services.

## Requirements

To use the SDK you must first acquire a `clientId` and `clientSecret` from the Ratio team. Learn how to request API keys [here](../../#requesting-access).

Ratio will provide an API that you will be required to wrap in your own back end (see example below)

