// src/screens/AddDishScreen.tsx
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from "react-native"; // Make sure Text is imported from react-native
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, CourseType } from "../types/navigation";
import { Dish } from "../types/useDish";

type AddDishScreenNavigationProp = StackNavigationProp<RootStackParamList, "AddDish">;

type Props = {
  navigation: AddDishScreenNavigationProp;
  onAddDish: (dish: Dish) => void;
};

const AddDishScreen = ({ navigation, onAddDish }: Props) => {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<CourseType>("Starters");
  const [price, setPrice] = useState("");

  const handleAddDish = () => {
    if (!dishName || !description || !price) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    const newDish: Dish = {
      id: Math.random().toString(),
      name: dishName,
      description,
      course,
      price: priceValue,
    };

    onAddDish(newDish);
    Alert.alert("Success", "Dish added successfully!");
    
    // Clear form
    setDishName("");
    setDescription("");
    setCourse("Starters");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Picker selectedValue={course} onValueChange={(value) => setCourse(value as CourseType)} style={styles.input}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleAddDish}>
        <Text style={styles.addButtonText}>Save Dish</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  backButton: {
    backgroundColor: "#546e7a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddDishScreen;