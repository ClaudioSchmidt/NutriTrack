import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
  },
  svg: {
    transform: [{rotate: '-90deg'}],
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 65,
    width: '56%', // Set a width for the text view
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff', // Ensure the text color contrasts with the background
    fontSize: 16, // Set a smaller font size
    textAlign: 'center', // Center align the text
  },
});

export default styles;
