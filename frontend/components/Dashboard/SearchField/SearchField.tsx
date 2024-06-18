import React from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  TextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';
import styles from './SearchFieldStyles';

const SearchField: React.FC = () => {
  const [text, onChangeText] = React.useState('');
  const handleTextChange = (text: string) => {
    onChangeText(text);
  };
  const handleSubmit = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const searchQuery = event.nativeEvent.text;
    // onChangeText('');
    console.log(searchQuery); // User this to search for hits in the database
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSubmit}
        value={text}
        placeholder="search"
        keyboardType="default"
        placeholderTextColor={'#4CAF50'}
        selectionColor={'#4CAF50'}
      />
    </SafeAreaView>
  );
};

export default SearchField;
