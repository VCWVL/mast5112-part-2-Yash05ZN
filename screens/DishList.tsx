// src/components/DishList.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dish } from '../types/useDish';

interface DishListProps {
  dishes: Dish[];
  onRemoveDish: (id: string) => void;
}

const DishList: React.FC<DishListProps> = ({ dishes, onRemoveDish }) => {
  if (!dishes || dishes.length === 0) {
    return <Text style={styles.noDishesText}>No dishes to display.</Text>;
  }

  return (
    <View>
      {dishes.map(dish => (
        <View key={dish.id} style={styles.dishCard}>
          <View style={styles.dishInfo}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishDescription}>{dish.description}</Text>
            <Text style={styles.dishPrice}>R{dish.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onRemoveDish(dish.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  noDishesText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
  },
  removeButton: {
    backgroundColor: '#fbe9e7',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#d84315',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DishList;