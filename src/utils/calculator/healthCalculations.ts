
import { ActivityLevel, Gender } from './types';

export const calculateCalories = (
  gender: Gender,
  weight: number,
  height: number,
  age: number,
  activityLevel: ActivityLevel
): number => {
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  };

  const tdee = bmr * activityMultipliers[activityLevel];
  return Math.round(tdee);
};
