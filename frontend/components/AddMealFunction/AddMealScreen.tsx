import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export const AddMealScreen = () => {
  const [title, setTitle] = useState('');
  const [kcal, setKcal] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleAddMeal = () => {
    if (!title || !kcal || !carbs || !fat || !protein) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Pflichtfelder aus.');
      return;
    }
    // Hier können Sie den Code hinzufügen, um die Mahlzeit zu speichern
    console.log({ title, kcal, carbs, fat, protein, imageUri });
    Alert.alert('Erfolg', 'Mahlzeit hinzugefügt!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Titel:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Titel"
      />
      <Text style={styles.label}>Kcal:</Text>
      <TextInput
        style={styles.input}
        value={kcal}
        onChangeText={setKcal}
        placeholder="Kcal"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Kohlenhydrate (g):</Text>
      <TextInput
        style={styles.input}
        value={carbs}
        onChangeText={setCarbs}
        placeholder="Kohlenhydrate"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Fett (g):</Text>
      <TextInput
        style={styles.input}
        value={fat}
        onChangeText={setFat}
        placeholder="Fett"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Protein (g):</Text>
      <TextInput
        style={styles.input}
        value={protein}
        onChangeText={setProtein}
        placeholder="Protein"
        keyboardType="numeric"
      />
      <Button title="Foto wählen" onPress={handleChoosePhoto} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Mahlzeit hinzufügen" onPress={handleAddMeal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default AddMealScreen;