import React from "react";
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { normalizeSize } from "../../res/typography";

interface Props {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  onSearch?: () => any;
  onFilter?: () => any;
  filterBadge: boolean;
}

export const SearchBar = ({
  onChangeText,
  value,
  placeholder,
  onSearch,
  onFilter = undefined,
  filterBadge = false,
  keyboardType = "default",
}: Props) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={onChangeText}
          onSubmitEditing={onSearch}
          placeholder={placeholder}
          placeholderTextColor={colorWithOpacity(colors.white, 0.5)}
          value={value}
          keyboardType={keyboardType}
        />
        <View style={styles.searchIcon}>
          <TouchableOpacity onPress={onSearch}>
            <Icon
              name="search-outline"
              size={25}
              color={colorWithOpacity(colors.orange, 0.61)}
            />
          </TouchableOpacity>
        </View>

        {onFilter && (
          <View style={styles.searchIcon}>
            <TouchableOpacity onPress={onFilter}>
              <Icon
                name="options"
                size={25}
                color={colorWithOpacity(colors.orange, 0.61)}
              />
              {filterBadge && (
                <Badge size={8} style={{ position: "absolute" }} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colorWithOpacity(colors.gray, 0.1),
    //borderWidth: 1,
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: "5%",
  },
  searchBar: {
    flex: 1,
    padding: 7,
    paddingBottom: 10,
    paddingLeft: 11,
    fontSize: normalizeSize(14),
    color: colorWithOpacity(colors.white, 1.0),
    fontFamily: "FireSansRegular",
    marginRight: 10,
    //borderWidth: 1
  },
  searchIcon: {
    //borderWidth:1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
});
