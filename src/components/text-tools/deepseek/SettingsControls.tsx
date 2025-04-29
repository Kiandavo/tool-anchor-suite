import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Thermometer, Layers } from "lucide-react";
interface SettingsControlsProps {
  temperature: number;
  setTemperature: (temp: number) => void;
  contextLength: number;
  setContextLength: (length: number) => void;
}
const SettingsControls: React.FC<SettingsControlsProps> = ({
  temperature,
  setTemperature,
  contextLength,
  setContextLength
}) => {
  return;
};
export default SettingsControls;