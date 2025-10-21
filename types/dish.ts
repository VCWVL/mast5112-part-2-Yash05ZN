// src/types/dish.ts
import { CourseType } from './navigation';

export interface Dish {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
}

export interface CourseAverage {
  course: CourseType;
  average: number;
  count: number;
}