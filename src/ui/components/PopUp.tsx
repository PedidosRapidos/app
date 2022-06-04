import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { colors, colorWithOpacity } from "../../res/colors";
import { sizes, Typography } from "../../res/typography";
import { Counter } from "./Counter";
import { MainButton } from "./MainButton";

interface Props {
  title: string;
  message: string;
  visible: boolean;
  onRequestClose?: () => void;
  onAccept?: () => void;
  onCancel?: () => void;
}

export const PopUp = ({ title, message, visible, onRequestClose = undefined, onAccept, onCancel }: Props) => {
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Typography style={styles.textStyle}>{title}</Typography>
        <View style={styles.optionsRow}>
          {onAccept ? (
            <MainButton
              text="OK"
              onPress={onAccept}
              style={[styles.buttonSize]}
            />
          ) : null}
          {onCancel ? <MainButton
            text="Cancel"
            onPress={onCancel}
            style={[styles.cancelButton, styles.buttonSize]}
            textStyle={styles.cancelButtonText}
          /> : null}
        </View>
      </View>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colorWithOpacity(colors.popupBackgroundGray, 1.0),
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontSize: sizes.popUp,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  counter: {
    backgroundColor: colors.popupBackgroundGray,
    marginVertical: 5,
  },
  optionsRow: {
    flexDirection: "row",
  },
  buttonSize: {
    width: 100,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: colorWithOpacity(colors.popupBackgroundGray, 1.0),
    borderColor: colors.orange,
    borderWidth: 1,
  },
  cancelButtonText: {
    color: colorWithOpacity(colors.orange, 1.0),
  },
});
