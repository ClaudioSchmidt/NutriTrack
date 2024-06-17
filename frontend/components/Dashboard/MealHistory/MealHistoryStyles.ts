import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mealHistoryContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  historyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealItem: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  mealText: {
    fontSize: 18,
  },
});

export default styles;
