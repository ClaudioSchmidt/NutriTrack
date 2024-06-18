import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 25,
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    transform: [{rotate: '-90deg'}],
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#4CAF50', // Ensure the text color contrasts with the background
    textAlign: 'center', // Center align the text
  },
});

export default styles;
