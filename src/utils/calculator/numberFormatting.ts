
export const formatToToman = (num: number): string => {
  return Math.round(num).toLocaleString('fa-IR');
};

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const convertNumberToPersianWords = (num: number): string => {
  if (num === 0) return 'صفر';
  
  const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const thousands = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];
  
  num = Math.round(num);
  const numStr = Math.abs(num).toString();
  const chunks = [];
  
  for (let i = numStr.length; i > 0; i -= 3) {
    chunks.push(numStr.substring(Math.max(0, i - 3), i));
  }
  chunks.reverse();
  
  const result: string[] = [];
  
  chunks.forEach((chunk, index) => {
    const chunkValue = parseInt(chunk);
    if (chunkValue === 0) return;
    
    const chunkStr: string[] = [];
    
    if (chunk.length === 3 && chunk[0] !== '0') {
      chunkStr.push(hundreds[parseInt(chunk[0])]);
    }
    
    if (chunk.length > 1) {
      const tensValue = parseInt(chunk.slice(-2));
      if (tensValue > 0) {
        if (tensValue < 10) {
          chunkStr.push(units[tensValue]);
        } else if (tensValue < 20) {
          chunkStr.push(teens[tensValue - 10]);
        } else {
          const tensDigit = Math.floor(tensValue / 10);
          const unitsDigit = tensValue % 10;
          
          chunkStr.push(tens[tensDigit]);
          if (unitsDigit > 0) {
            chunkStr.push('و');
            chunkStr.push(units[unitsDigit]);
          }
        }
      }
    } else if (chunk.length === 1 && chunk[0] !== '0') {
      chunkStr.push(units[parseInt(chunk)]);
    }
    
    if (chunkStr.length > 0) {
      const positionValue = thousands[chunks.length - index - 1];
      if (positionValue) {
        chunkStr.push(positionValue);
      }
      result.push(chunkStr.join(' '));
    }
  });
  
  return result.length > 0 ? result.join(' و ') : 'صفر';
};
