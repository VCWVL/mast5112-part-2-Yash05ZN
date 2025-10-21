// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, CourseType } from '../types/navigation';
import { Dish, CourseAverage as CourseAverageData } from '../types/useDish';
import DishList from '../src/components/DishList';
import CourseAverage from './CourseAverage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  dishes: Dish[];
  onRemoveDish: (id: string) => void;
  getCoursesAverage: () => CourseAverageData[];
};

const HomeScreen = ({ navigation, dishes, onRemoveDish, getCoursesAverage }: Props) => {
  const courseAverages = getCoursesAverage();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.averagesContainer}>
          <Text style={styles.sectionTitle}>Average Prices by Course</Text>
          {courseAverages.map((item, index) => (
            <CourseAverage key={index} data={item} />
          ))}
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>All Dishes</Text>
          <DishList dishes={dishes} onRemoveDish={onRemoveDish} />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Filter')}
        >
          <Text style={styles.buttonText}>Filter by Course</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]}
          onPress={() => navigation.navigate('AddDish')}
        >
          <Text style={styles.buttonText}>Add New Dish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  scrollContent: { paddingBottom: 100 }, // Ensure content isn't hidden by buttons
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#333' 
  },
  averagesContainer: { marginBottom: 20 },
  menuContainer: { marginBottom: 20 },
  buttonContainer: { 
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8'
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  primaryButton: { backgroundColor: '#2e7d32' },
  secondaryButton: { backgroundColor: '#546e7a' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;