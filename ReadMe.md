
# React Native Custom Date Picker

A highly customizable and user-friendly date picker component for React Native applications. This component allows users to select dates with ease, featuring a modal view and flexible configuration options.


## Features

-  **Customizable Design:** Adjust colors, font sizes, backgrounds, and borders to match your application's theme.
- **Modal Picker:** The date picker opens in a modal, providing a smooth user experience.
- **Year and Month Navigation:** Easily navigate between years and months with arrow controls.
- **Disable Future Dates:** Prevent selection of future dates to ensure valid date input.
- **Current Date Highlighting:** Highlights the current date for better visibility.
- **Close Button:** Allows users to easily dismiss the date picker modal.



## Installation

To install the component, run:

```bash
npm install @your-username/react-native-custom-datepicker
```
or
```bash
yarn add @your-username/react-native-custom-datepicker
```

## Usage

To use the `DatePickers` component in your React Native app, follow the example below:

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import DatePickers from '@your-username/react-native-custom-datepicker';

const App = () => {
  const handleDateChange = (selectedDate) => {
    console.log('Selected Date:', selectedDate);
  };

  return (
    <View style={styles.container}>
      <DatePickers
        title="Select Date"
        onDateChange={handleDateChange}
        // Add any other props you want to customize
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```



## Props

Following are the props with its decscription


 | Prop                   | Type       | Default       | Description                                                  |
| ---------------------- | ---------- | ------------- | ------------------------------------------------------------ |
| `title`                | `string`   | "Select Date" | The title displayed on the button before a date is selected.  |
| `titleColor`           | `string`   | "#333"        | Color of the title text.                                      |
| `titleTextSize`        | `number`   | `16`          | Font size of the title text.                                  |
| `onDateChange`         | `function` | `null`        | Callback function that is called when a date is selected. Receives the selected date as an argument. |
| `backgroundColor`      | `string`   | "#fff"        | Background color of the date picker modal.                    |
| `headerbackgroundColor`| `string`   | "#f1f1f1"     | Background color of the header containing the month and year. |
| `borderColor`          | `string`   | "red"         | Border color of the date picker modal.                        |
| `arrowColor`           | `string`   | "#000"        | Color of the navigation arrows for month selection.           |
| `arrowSize`            | `number`   | `20`          | Size of the navigation arrows.                                |
| `yearColor`            | `string`   | "#007AFF"     | Text color for the year picker.                               |
| `opacity`              | `number`   | `0.3`         | Opacity of disabled years or future dates.                    |
| `yearBackgroundColor`  | `string`   | "green"       | Background color for the currently selected year.             |
| `yearTextSize`         | `number`   | `12`          | Font size of the year text.                                   |
| `dayColor`             | `string`   | "#333"        | Text color for the days.                                      |
| `dayBackgroundColor`   | `string`   | "gray"        | Background color for the currently selected day.              |
| `dayFontSize`          | `number`   | `12`          | Font size for the day numbers.                                |
| `closeBackgroundColor` | `string`   | "#6360FF"     | Background color of the close button.                         |
| `closeColor`           | `string`   | "#000"        | Text color for the close button.                              |
| `closeTextSize`        | `number`   | `16`          | Font size for the close button text.                          |
| `monthColor`           | `string`   | "black"       | Text color for the month name.                                |
| `monthTextSize`        | `number`   | `14`          | Font size for the month name.                                 |
| `borderRadius`         | `number`   | `10`          | Border radius of the date picker modal.                       |
| `height`               | `number`   | `400`         | Height of the date picker modal.                              |
#




