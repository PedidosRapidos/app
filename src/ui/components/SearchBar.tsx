import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, colorWithOpacity } from "../../res/colors";
import { spacing } from "../../res/spacing";
import { normalizeSize } from "../../res/typography";
import { Title } from "./Title";

interface Props {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
    marginBottom?: number;
    keyboardType?: KeyboardTypeOptions;
  }
  

export const SearchBar = ({
    onChangeText,
    value,
    placeholder,
    marginBottom = spacing.inputSpacing,
    keyboardType = "default"
} : Props) => {
    return (
        <View>
            <View style={styles.inputContainer}>
                <View style={styles.searchIcon}>
                    <Icon name="eye-sharp" size={25} color={colorWithOpacity(colors.grayLight, 0.61)}>

                    </Icon>
                </View>
                <TextInput
                    style={styles.searchBar}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colorWithOpacity(colors.white, 0.5)}
                    value={value}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
      backgroundColor: colorWithOpacity(colors.gray, 0.1),
      //borderWidth: 1,
      flexDirection: "row",
      borderRadius: 5,
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
        paddingLeft: 5
    }
});
