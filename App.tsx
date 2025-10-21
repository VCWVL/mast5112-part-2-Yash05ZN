// src/App.tsx
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AddDishScreen from "./screens/AddDishScreen";
import FilterScreen from "./screens/FilterScreen";
import { RootStackParamList } from './types/navigation';
import useDishes from './types/useDish';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const {
    dishes,
    addDish,
    removeDish,
    getCoursesAverage,
    getDishesByCourse
  } = useDishes();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2e7d32',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          options={{ title: "Christoffel's Menu" }}
        >
          {props => <HomeScreen {...props} dishes={dishes} onRemoveDish={removeDish} getCoursesAverage={getCoursesAverage} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddDish"
          options={{ title: "Add New Dish" }}
        >
          {props => <AddDishScreen {...props} onAddDish={addDish} />}
        </Stack.Screen>
        <Stack.Screen
          name="Filter"
          options={{ title: "Filter by Course" }}
        >
          {props => <FilterScreen {...props} dishes={dishes} onRemoveDish={removeDish} getDishesByCourse={getDishesByCourse} />}
        </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}