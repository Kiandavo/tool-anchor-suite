
export const convertTime = (hours: number, minutes: number, seconds: number): {
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
  days: number;
  remainingHours: number;
} => {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalMinutes = totalSeconds / 60;
  const totalHours = totalMinutes / 60;
  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  return {
    totalSeconds,
    totalMinutes,
    totalHours,
    days,
    remainingHours
  };
};
