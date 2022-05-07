import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ColorValue,
  useWindowDimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors, colorWithOpacity} from '../../res/colors';
import {widthSquares} from '../../res/responsive';

interface Props {
  visible: boolean;
  onRequestClose?: () => void;
  color?: ColorValue;
  background?: ColorValue;
}

export const Loader = ({
  visible,
  onRequestClose = undefined,
  color = colors.white,
  background = colorWithOpacity('000000', 0.8),
}: Props) => {
  const {width, height} = useWindowDimensions();

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}
      statusBarTranslucent>
      <View
        style={{
          ...styles.containerModal,
          backgroundColor: background,
        }}>
        <View
          style={{
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: colorWithOpacity(colors.white, 0.5),
          }}>
          <ActivityIndicator color={colors.blue} size={100} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: colorWithOpacity(colors.white, 0.9),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
});
