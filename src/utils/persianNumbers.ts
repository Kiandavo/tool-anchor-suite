export const toPersianNumber = (num: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export const toEnglishNumber = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[۰-۹]/g, (digit) => persianDigits.indexOf(digit).toString());
};

export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString('fa-IR');
};

export const formatPersianNumber = (num: number, decimals: number = 2): string => {
  const rounded = Number(num.toFixed(decimals));
  return formatNumberWithCommas(rounded);
};