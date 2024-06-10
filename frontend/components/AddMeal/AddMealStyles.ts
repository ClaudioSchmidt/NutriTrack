import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const isSmallDevice = width < 360;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: isSmallDevice ? 10 : 20,
    backgroundColor: '#fff', // corrected from '#black' to '#fff'
  },
  title: {
    fontSize: isSmallDevice ? 20 : 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutrition: {
    marginVertical: 10,
  },
  sustainability: {
    marginVertical: 10,
  },
  portion: {
    marginVertical: 5,
  },
});

export default styles;
