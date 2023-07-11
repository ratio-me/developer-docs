---
description: You are able to theme RatioKit in order to match your webpage
---

# Theming

## Custom theming

Here are all the possible values that you can set to theme RatioKit to whatever you would like.

<table><thead><tr><th width="154">Type</th><th width="115.33333333333331">Value type</th><th>Example values</th></tr></thead><tbody><tr><td>colors</td><td>string</td><td>"<code>#dedbef</code>" or "<code>rgb(222, 219, 239, 1.0)</code>" or other valid CSS color value</td></tr><tr><td>fonts</td><td>string</td><td>"<code>Comic Sans MS, sans-serif</code>"</td></tr><tr><td>fontWeights</td><td>number</td><td>400 or 700 or other valid CSS font weight value</td></tr><tr><td>fontSizes</td><td>number or string</td><td>12 or "<code>12px</code>" or "<code>1rem</code>" or other valid CSS size value</td></tr><tr><td>lineHeights</td><td>number or string</td><td>1.5 or "<code>150%</code>" or other valid CSS value</td></tr><tr><td>radii</td><td>number or string</td><td>4 or "<code>4px</code>" or other valid CSS value</td></tr><tr><td>sizes</td><td>number or string</td><td>4 or "<code>4px</code>" or other valid CSS value</td></tr><tr><td>borderWidths</td><td>number or string</td><td>4 or "<code>4px</code>" or other valid CSS value</td></tr><tr><td>borderStyles</td><td>string</td><td>"<code>solid</code>" or "<code>dashed</code>" or other valid CSS value</td></tr><tr><td>shadows</td><td>string</td><td>"<code>none</code>" or "<code>0 0 0 2px #ff0000</code>" or other valid CSS value</td></tr></tbody></table>

```tsx
export type RatioTheme = {
  colors: {
    buyWithRatioButtonText: string;
    buyWithRatioButtonBackground: string;
    buyWithRatioButtonHoverText: string;
    buyWithRatioButtonActiveText: string;
    buyWithRatioButtonActiveBackground: string;
    buyWithRatioButtonHoverBackground: string;
    buyWithRatioButtonDisabledBackground: string;
    buyWithRatioButtonDisabledText: string;
    buyWithRatioButtonDisabledBorder: string;

    ratioButtonText: string;
    ratioButtonHoverText: string;
    ratioButtonActiveText: string;
    ratioButtonBackground: string;
    ratioButtonActiveBackground: string;
    ratioButtonHoverBackground: string;
    ratioButtonDisabledBackground: string;
    ratioButtonDisabledText: string;
    ratioButtonDisabledBorder: string;

    ratioSecondaryButtonText: string;
    ratioSecondaryButtonBackground: string;
    ratioSecondaryButtonHoverText: string;
    ratioSecondaryButtonActiveText: string;
    ratioSecondaryButtonActiveBackground: string;
    ratioSecondaryButtonHoverBackground: string;
    ratioSecondaryButtonBorder: string;

    ratioPageHeaderText: string;
    ratioDialogBackground: string;
    ratioBodyText: string;
    ratioErrorText: string;
    ratioInputFieldBackground: string;
    ratioInputFieldText: string;
    ratioInputFieldPlaceholderText: string;
    ratioInputFieldBorder: string;
    ratioInputFieldDisabledBackground: string;
    ratioLinkText: string;
    ratioLinkHoverText: string;
    ratioLinkActiveText: string;
    ratioBuyCryptoInfoMessageBackground: string;
    ratioBuyCryptoInfoMessageWarningBackground: string;
    ratioBuyCryptoInfoMessageErrorBackground: string;
    ratioBuyCryptoInfoMessageText: string;
    ratioMutedText: string;

    ratioFeeBadgeText: string;
    ratioFeeBadgeBackground: string;

    ratioInstantInformationBackground: string;

    ratioToggleOffBackground: string;
    ratioToggleOnBackground: string;
    ratioToggleSwitchBackground: string;
    ratioToggleSwitchBorder: string;

    ratioCheckBoxBackground: string;
    ratioCheckboxBorder: string;
    ratioCheckboxCheck: string;
    ratioCheckboxFocusedBorder: string;

    ratioDisclaimerBoxBackground: string;
    ratioDisclaimerBoxText: string;

    ratioScrollBarThumb: string;
    ratioScrollBarTrack: string;

    ratioSuccessCardBackground: string;
    ratioSuccessCardText: string;
  };
  fonts: {
    buyWithRatioButtonText: string;
    ratioButtonText: string;
    header: string;
    smallHeader: string;
    body: string;
    tinyBody: string;
    inputButton: string;
    inputField: string;
    textLink: string;
  };
  fontWeights: {
    buyWithRatioButtonText: number;
    ratioButtonText: number;
    header: number;
    smallHeader: number;
    body: number;
    tinyBody: number;
    inputButton: number;
    inputField: number;
    textLink: number;
  };
  fontSizes: {
    buyWithRatioButtonText: number | string;
    ratioButtonText: number | string;
    header: number | string;
    smallHeader: number | string;
    body: number | string;
    tinyBody: number | string;
    inputButton: number | string;
    inputField: number | string;
    textLink: number | string;
  };
  lineHeights: {
    buyWithRatioButtonText: number | string;
    ratioButtonText: number | string;
    header: number | string;
    smallHeader: number | string;
    body: number | string;
    tinyBody: number | string;
    inputButton: number | string;
    inputField: number | string;
    textLink: number | string;
  };
  radii: {
    buyWithRatioButtonRadius: number | string;
    ratioButtonBorderRadius: number | string;
    ratioDialogBorderRadius: number | string;
    ratioInputFieldBorderRadius: number | string;
    ratioFeeBadgeBorderRadius: number | string;
    ratioInstantInformationBorderRadius: number | string;
    ratioCheckboxBorderRadius: number | string;
    ratioDisclaimerBoxBorderRadius: number | string;
    ratioSuccessCardBorderRadius: number | string;
  };
  sizes: {
    buyWithRatioButtonHeight: number | string;
    ratioButtonHeight: number | string;
    ratioInputFieldHeight: number | string;
  };
  borderWidths: {
    buyWithRatioButtonDisabledBorderWidth: number | string;
    ratioButtonDisabledBorderWidth: number | string;
    ratioInputFieldBorderWidth: number | string;
    ratioToggleSwitchBorderWidth: number | string;
    ratioCheckboxBorderWidth: number | string;
    ratioSecondaryButtonBorderWidth: number | string;
  };
  borderStyles: {
    buyWithRatioButtonDisabledBorderStyle: string;
    ratioButtonDisabledBorderStyle: string;
    ratioInputFieldBorderStyle: string;
    ratioToggleSwitchBorderStyle: string;
    ratioCheckboxBorderStyle: string;
    ratioSecondaryButtonBorderStyle: string;
  };
  shadows: {
    ratioInputFieldBoxShadow: string;
    ratioInputFieldBoxShadowFocus: string;
    ratioInputFieldBoxShadowDisabled: string;
  };
};

```

### Extending the default theme

You do not have to set every value listed above. You are able to pass in a small subset of the values and the default values will be used for the rest.

Example:

```tsx
<RatioButton theme={{
  colors: {
    ratioDialogBackground: "#dedbef"
  }
}}/>
```
