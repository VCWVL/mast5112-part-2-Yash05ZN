// src/hooks/useDishes.ts
import { useState } from 'react';
import { CourseType } from './navigation';

// Define the Dish interface
export interface Dish {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
}

// Define the CourseAverage interface
export interface CourseAverage {
  course: CourseType;
  average: number;
  count: number;
}

const useDishes = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  const addDish = (newDish: Dish) => {
    setDishes(prev => [...prev, newDish]);
  };

  const removeDish = (id: string) => {
    setDishes(prev => prev.filter(dish => dish.id !== id));
  };

  const getCoursesAverage = (): CourseAverage[] => {
    const courses: CourseType[] = ['Starters', 'Mains', 'Dessert'];
    
    return courses.map(course => {
      const courseDishes = dishes.filter(dish => dish.course === course);
      const total = courseDishes.reduce((sum, dish) => sum + dish.price, 0);
      const average = courseDishes.length > 0 ? total / courseDishes.length : 0;
      
      return {
        course,
        average: parseFloat(average.toFixed(2)),
        count: courseDishes.length
      };
    });
  };

  const getDishesByCourse = (course: CourseType): Dish[] => {
    return dishes.filter(dish => dish.course === course);
  };

  return {
    dishes,
    addDish,
    removeDish,
    getCoursesAverage,
    getDishesByCourse
  };
};

export default useDishes;