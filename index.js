/**
 * @format
 */

import { AppRegistry } from "react-native";
import { App } from "./App";
import { name as appName } from "./app.json";
import { Text, TextInput } from "react-native";

AppRegistry.registerComponent(appName, () => App);

if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
