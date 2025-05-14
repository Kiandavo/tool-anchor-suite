
// Core calculations and types
export * from './types';
export * from './basicCalculations';

// Specialized calculations
export * from './unitConversions';
export * from './healthCalculations';
export * from './timeCalculations';
export * from './financialCalculations';

// Formatting utilities
export * from './numberFormatting';

// Convert length units
export function convertLength(value: number, fromUnit: string, toUnit: string): number {
  // Convert to meters first (base unit)
  let valueInMeters: number;
  switch (fromUnit) {
    case 'mm': valueInMeters = value * 0.001; break;
    case 'cm': valueInMeters = value * 0.01; break;
    case 'm': valueInMeters = value; break;
    case 'km': valueInMeters = value * 1000; break;
    case 'in': valueInMeters = value * 0.0254; break;
    case 'ft': valueInMeters = value * 0.3048; break;
    case 'yd': valueInMeters = value * 0.9144; break;
    case 'mi': valueInMeters = value * 1609.344; break;
    default: valueInMeters = value;
  }
  
  // Convert from meters to target unit
  switch (toUnit) {
    case 'mm': return valueInMeters / 0.001;
    case 'cm': return valueInMeters / 0.01;
    case 'm': return valueInMeters;
    case 'km': return valueInMeters / 1000;
    case 'in': return valueInMeters / 0.0254;
    case 'ft': return valueInMeters / 0.3048;
    case 'yd': return valueInMeters / 0.9144;
    case 'mi': return valueInMeters / 1609.344;
    default: return valueInMeters;
  }
}

// Calculate speed from distance and time
export function calculateSpeed(distance: number, time: number): number {
  if (time === 0) return 0;
  return distance / time;
}

// Calculate distance from speed and time
export function calculateDistance(speed: number, time: number): number {
  return speed * time;
}

// Calculate time from distance and speed
export function calculateTime(distance: number, speed: number): number {
  if (speed === 0) return 0;
  return distance / speed;
}

// Calculate GPA
export function calculateGPA(courses: Array<{ grade: number; credits: number }>): number {
  let totalWeightedGrade = 0;
  let totalCredits = 0;
  
  for (const course of courses) {
    if (course.credits > 0) {
      totalWeightedGrade += course.grade * course.credits;
      totalCredits += course.credits;
    }
  }
  
  if (totalCredits === 0) return 0;
  return totalWeightedGrade / totalCredits;
}
