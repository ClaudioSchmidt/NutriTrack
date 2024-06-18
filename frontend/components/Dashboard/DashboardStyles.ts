import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    alignItems: 'center', // Center items horizontally
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  box1: {
    backgroundColor: 'dodgerblue',
    flex: 1,
    marginRight: 10,
  },
  box2: {
    backgroundColor: 'gold',
    flex: 1,
    marginHorizontal: 10,
  },
  box3: {
    backgroundColor: 'tomato',
    flex: 1,
    marginLeft: 10,
  },
});

export default styles;
