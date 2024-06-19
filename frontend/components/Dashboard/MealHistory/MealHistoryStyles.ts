import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mealContainer: {
    borderWidth: 3,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
    backgroundColor: 'lightgrey',
  },
  mealTitle: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    width: '20%',
    borderRadius: 100,
    color: 'orange',
    backgroundColor: 'lightgrey',
    borderColor: 'black',
    borderWidth: 5,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 50,
  },
});

export default styles;
