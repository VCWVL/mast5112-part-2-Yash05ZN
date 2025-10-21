// src/components/CourseAverage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CourseAverageData {
  course: string;
  average: number;
  count: number;
}

interface CourseAverageProps {
  data: CourseAverageData;
}

const CourseAverage = ({ data }: CourseAverageProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.courseName}>{data.course}:</Text>
      <Text style={styles.averagePrice}>
        R{data.average.toFixed(2)} 
        <Text style={styles.dishCount}> ({data.count} dishes)</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#37474f',
  },
  averagePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40',
  },
  dishCount: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#546e7a',
  },
});

export default CourseAverage;