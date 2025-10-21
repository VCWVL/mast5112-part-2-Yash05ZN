// src/components/DishList.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Dish } from '../../types/useDish';

type Props = {
  dishes: Dish[];
  onRemoveDish: (id: string) => void;
};

const DishList: React.FC<Props> = ({ dishes, onRemoveDish }) => {
  const renderItem = ({ item }: { item: Dish }) => (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
      </View>
      <TouchableOpacity onPress={() => onRemoveDish(item.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={dishes}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => <Text style={styles.empty}>No dishes available.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263238',
  },
  description: {
    marginTop: 4,
    color: '#546e7a',
    fontSize: 13,
  },
  removeButton: {
    backgroundColor: '#e53935',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
  },
  separator: {
    height: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#78909c',
    paddingVertical: 20,
  },
});

export default DishList;