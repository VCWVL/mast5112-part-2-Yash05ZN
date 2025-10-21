// src/screens/FilterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, CourseType } from '../types/navigation';
import { Dish } from '../types/useDish';
import DishList from '../src/components/DishList';

type FilterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Filter'>;

// Update Props to include the new parameters
type Props = {
  navigation: FilterScreenNavigationProp;
  dishes: Dish[];
  onRemoveDish: (id: string) => void;
  getDishesByCourse: (course: CourseType) => Dish[];
};

const FilterScreen = ({ navigation, dishes, onRemoveDish, getDishesByCourse }: Props) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseType | 'All'>('All');
  
  const filteredDishes = selectedCourse === 'All' 
    ? dishes 
    : getDishesByCourse(selectedCourse);

  const courses: (CourseType | 'All')[] = ['All', 'Starters', 'Mains', 'Dessert'];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {courses.map(course => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedCourse === course && styles.filterButtonTextActive
            ]}>
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView>
        <Text style={styles.sectionTitle}>
          {selectedCourse === 'All' ? 'All Dishes' : `${selectedCourse}`}
          {` (${filteredDishes.length})`}
        </Text>

        <DishList dishes={filteredDishes} onRemoveDish={onRemoveDish} />
      </ScrollView>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    color: '#333' 
  },
  filterContainer: { maxHeight: 50, flexGrow: 0, marginBottom: 15 },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#cfd8dc',
  },
  filterButtonActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  filterButtonText: {
    color: '#546e7a',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#546e7a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default FilterScreen;