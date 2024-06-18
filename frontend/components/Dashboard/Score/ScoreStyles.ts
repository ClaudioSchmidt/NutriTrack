import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const borderSize: number = 5;

const commenTextStyles: TextStyle = {
  padding: borderSize,
  backgroundColor: 'lightgrey',
  borderColor: 'black',
  color: '#4CAF50',
  fontSize: 35,
  fontWeight: 'bold',
  borderTopWidth: borderSize,
  borderBottomWidth: borderSize,
  textAlign: 'center',
  textAlignVertical: 'center',
};

interface Styles {
  container: ViewStyle;
  leftText: TextStyle;
  centerText: TextStyle;
  rightText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftText: {
    ...commenTextStyles,
    borderLeftWidth: borderSize,
    borderRightWidth: borderSize / 2,
    paddingRight: borderSize / 2,
  },
  centerText: {
    ...commenTextStyles,
    borderLeftWidth: borderSize / 2,
    borderRightWidth: borderSize / 2,
    paddingLeft: borderSize / 2,
    paddingRight: borderSize / 2,
  },
  rightText: {
    ...commenTextStyles,
    paddingLeft: borderSize / 2,
    borderLeftWidth: borderSize / 2,
    borderRightWidth: borderSize,
  },
});

export default styles;
