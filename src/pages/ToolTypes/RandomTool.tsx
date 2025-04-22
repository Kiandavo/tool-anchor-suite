
import React, { useState } from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import RandomColorGenerator from '@/components/RandomColorGenerator';
import CoinFlip from '@/components/CoinFlip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateRandomString, pickRandomFromList, getRandomQuote, quoteCategories } from '@/utils/textUtils';
import { generateRandomDate, generateRandomEmoji, rollDice, generateRandomWord, copyToClipboard, generateRandomUsername, generateRandomNickname, pickRandomBibleVerse, suggestRandomMovie, suggestRandomRecipe } from '@/utils/randomUtils';
import { Grid2x2, CalendarDays, Dice5, Gift, Award, Star, Sparkles, Shuffle, RotateCw, Calendar, Dices } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface RandomToolProps {
  slug: string;
}

export default function RandomTool({ slug }: RandomToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);
  const [stringLength, setStringLength] = useState<number>(10);
  const [randomString, setRandomString] = useState<string>('');
  const [itemsList, setItemsList] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [quote, setQuote] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [randomDate, setRandomDate] = useState<Date | null>(null);
  const [emoji, setEmoji] = useState<string>('');
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [randomWord, setRandomWord] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [usernameType, setUsernameType] = useState<string>('general');
  const [passwordToCheck, setPasswordToCheck] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [qrValue, setQrValue] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');

  // New state for additional tools
  const [array, setArray] = useState<string>('');
  const [shuffledArray, setShuffledArray] = useState<string[]>([]);
  const [lotteryNumbers, setLotteryNumbers] = useState<number[]>([]);
  const [teamMembers, setTeamMembers] = useState<string>('');
  const [teams, setTeams] = useState<string[][]>([]);
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [giftSuggestion, setGiftSuggestion] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [decision, setDecision] = useState<string>('');
  const [decisionOptions, setDecisionOptions] = useState<string>('');
  const [tournamentParticipants, setTournamentParticipants] = useState<string>('');
  const [tournamentBracket, setTournamentBracket] = useState<any[]>([]);
  const [randomLocation, setRandomLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [prizeWheelOptions, setPrizeWheelOptions] = useState<string>('');
  const [prizeWheelResult, setPrizeWheelResult] = useState<string>('');
  const [characterAttributes, setCharacterAttributes] = useState<Record<string, string>>({});
  const [tasks, setTasks] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [taskAssignments, setTaskAssignments] = useState<Record<string, string>>({});
  const [bibleVerse, setBibleVerse] = useState<string>('');
  const [movieSuggestion, setMovieSuggestion] = useState<string>('');
  const [recipeSuggestion, setRecipeSuggestion] = useState<string>('');

  const handleGenerateString = () => {
    const newString = generateRandomString(stringLength);
    setRandomString(newString);
    toast.success("رشته تصادفی تولید شد");
  };

  const handleRandomPick = () => {
    const items = itemsList.split('\n').filter(item => item.trim() !== '');
    if (items.length === 0) {
      toast.error("لطفاً حداقل یک مورد را وارد کنید");
      return;
    }
    const picked = pickRandomFromList(items);
    setSelectedItem(picked);
    toast.success("یک مورد به صورت تصادفی انتخاب شد");
  };

  const handleGenerateQuote = () => {
    const newQuote = getRandomQuote(selectedCategory);
    setQuote(newQuote);
    toast.success("جمله قصار جدید تولید شد");
  };

  const handleGenerateDate = () => {
    const start = new Date(1970, 0, 1);
    const end = new Date();
    const newDate = generateRandomDate(start, end);
    setRandomDate(newDate);
    toast.success("تاریخ تصادفی تولید شد");
  };

  const handleGenerateEmoji = () => {
    const newEmoji = generateRandomEmoji();
    setEmoji(newEmoji);
    toast.success("ایموجی تصادفی تولید شد");
  };

  const handleRollDice = () => {
    const result = rollDice();
    setDiceResult(result);
    toast.success(`تاس انداخته شد: ${result}`);
  };

  const handleGenerateWord = () => {
    const word = generateRandomWord();
    setRandomWord(word);
    toast.success("کلمه تصادفی تولید شد");
  };

  // Function to generate random username
  const handleGenerateUsername = () => {
    const newUsername = generateRandomUsername(usernameType);
    setUsername(newUsername);
    toast.success("نام کاربری تصادفی تولید شد");
  };

  // Function to check password strength
  const checkPasswordStrength = () => {
    if (!passwordToCheck) {
      toast.error("لطفاً یک رمز عبور وارد کنید");
      return;
    }

    let strength = 0;
    let feedback = "";

    // Check length
    if (passwordToCheck.length >= 8) strength += 1;
    if (passwordToCheck.length >= 12) strength += 1;

    // Check for numbers
    if (/\d/.test(passwordToCheck)) strength += 1;

    // Check for lowercase letters
    if (/[a-z]/.test(passwordToCheck)) strength += 1;

    // Check for uppercase letters
    if (/[A-Z]/.test(passwordToCheck)) strength += 1;

    // Check for special characters
    if (/[^A-Za-z0-9]/.test(passwordToCheck)) strength += 1;

    if (strength <= 2) {
      feedback = "ضعیف";
      setPasswordStrength("ضعیف - رمز عبور شما به راحتی قابل حدس زدن است");
    } else if (strength <= 4) {
      feedback = "متوسط";
      setPasswordStrength("متوسط - رمز عبور شما قابل قبول است اما می‌تواند بهتر باشد");
    } else {
      feedback = "قوی";
      setPasswordStrength("قوی - رمز عبور شما امن است");
    }

    toast.success(`قدرت رمز عبور: ${feedback}`);
  };

  // Function to generate QR code
  const handleGenerateQR = () => {
    if (!qrValue) {
      toast.error("لطفاً یک مقدار وارد کنید");
      return;
    }
    
    // In a real app, we would use a QR code library
    // For now, we'll just fake it
    setQrCode(qrValue);
    toast.success("کد QR تولید شد");
  };

  // Function to shuffle array
  const handleArrayShuffle = () => {
    const items = array.split('\n').filter(item => item.trim() !== '');
    if (items.length < 2) {
      toast.error("لطفاً حداقل دو مورد را وارد کنید");
      return;
    }
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledArray(shuffled);
    toast.success("آرایه با موفقیت مرتب شد");
  };

  // Function to generate lottery numbers
  const generateLotteryNumbers = () => {
    const numbers = new Set<number>();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    setLotteryNumbers(Array.from(numbers));
    toast.success("اعداد لاتاری تولید شدند");
  };

  // Function to generate random teams
  const generateRandomTeams = () => {
    const members = teamMembers.split('\n').filter(member => member.trim() !== '');
    if (members.length < 4) {
      toast.error("لطفاً حداقل چهار عضو وارد کنید");
      return;
    }
    
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    const numTeams = Math.min(Math.ceil(members.length / 4), Math.floor(members.length / 2));
    const result: string[][] = Array(numTeams).fill([]).map(() => []);
    
    shuffled.forEach((member, index) => {
      result[index % numTeams].push(member);
    });
    
    setTeams(result);
    toast.success("تیم‌ها با موفقیت ایجاد شدند");
  };

  // Function to pick a random card
  const pickRandomCard = () => {
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    setSelectedCard(`${randomValue}${randomSuit}`);
    toast.success("یک کارت انتخاب شد");
  };

  // Function to suggest a random gift
  const suggestRandomGift = () => {
    const gifts = [
      "کتاب",
      "ساعت هوشمند",
      "هدفون بی‌سیم",
      "عطر",
      "کیف چرم",
      "ست لوازم نوشت‌افزار",
      "گیاه آپارتمانی",
      "ماگ سرامیکی",
      "کارت هدیه",
      "آلبوم موسیقی"
    ];
    setGiftSuggestion(gifts[Math.floor(Math.random() * gifts.length)]);
    toast.success("یک هدیه پیشنهاد شد");
  };

  // Function to generate random nickname
  const generateRandomNick = () => {
    const nick = generateRandomNickname();
    setNickname(nick);
    toast.success("نام مستعار تصادفی تولید شد");
  };

  // Function to make random decision
  const makeRandomDecision = () => {
    const options = decisionOptions.split('\n').filter(option => option.trim() !== '');
    if (options.length < 2) {
      toast.error("لطفاً حداقل دو گزینه وارد کنید");
      return;
    }
    
    const chosen = options[Math.floor(Math.random() * options.length)];
    setDecision(chosen);
    toast.success("تصمیم تصادفی گرفته شد");
  };

  // Function to generate tournament bracket
  const generateTournamentBracket = () => {
    const participants = tournamentParticipants.split('\n').filter(p => p.trim() !== '');
    if (participants.length < 4) {
      toast.error("لطفاً حداقل چهار شرکت‌کننده وارد کنید");
      return;
    }
    
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    
    // Create a simple tournament bracket
    const bracket = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        bracket.push([shuffled[i], shuffled[i + 1]]);
      } else {
        bracket.push([shuffled[i], "استراحت"]);
      }
    }
    
    setTournamentBracket(bracket);
    toast.success("جدول مسابقات ایجاد شد");
  };

  // Function to get random map location
  const getRandomMapLocation = () => {
    const lat = (Math.random() * 180) - 90;
    const lng = (Math.random() * 360) - 180;
    setRandomLocation({ lat, lng });
    toast.success("مکان تصادفی انتخاب شد");
  };

  // Function to spin prize wheel
  const spinPrizeWheel = () => {
    const options = prizeWheelOptions.split('\n').filter(option => option.trim() !== '');
    if (options.length < 2) {
      toast.error("لطفاً حداقل دو گزینه وارد کنید");
      return;
    }
    
    const result = options[Math.floor(Math.random() * options.length)];
    setPrizeWheelResult(result);
    toast.success("چرخ شانس چرخید!");
  };

  // Function to generate random character
  const generateRandomCharacter = () => {
    const races = ["انسان", "الف", "دورف", "هابیت", "اورک"];
    const classes = ["جنگجو", "جادوگر", "دزد", "کشیش", "رنجر"];
    const alignments = ["نیک", "خنثی", "شرور"];
    const strengths = ["قوی", "متوسط", "ضعیف"];
    
    setCharacterAttributes({
      race: races[Math.floor(Math.random() * races.length)],
      class: classes[Math.floor(Math.random() * classes.length)],
      alignment: alignments[Math.floor(Math.random() * alignments.length)],
      strength: strengths[Math.floor(Math.random() * strengths.length)],
      intelligence: strengths[Math.floor(Math.random() * strengths.length)],
      charisma: strengths[Math.floor(Math.random() * strengths.length)]
    });
    
    toast.success("شخصیت تصادفی ایجاد شد");
  };

  // Function to assign tasks randomly
  const assignTasksRandomly = () => {
    const taskList = tasks.split('\n').filter(task => task.trim() !== '');
    const peopleList = people.split('\n').filter(person => person.trim() !== '');
    
    if (taskList.length === 0 || peopleList.length === 0) {
      toast.error("لطفاً حداقل یک وظیفه و یک نفر وارد کنید");
      return;
    }
    
    const assignments: Record<string, string> = {};
    const shuffledTasks = [...taskList].sort(() => Math.random() - 0.5);
    
    shuffledTasks.forEach((task, index) => {
      const personIndex = index % peopleList.length;
      assignments[task] = peopleList[personIndex];
    });
    
    setTaskAssignments(assignments);
    toast.success("وظایف به صورت تصادفی تخصیص داده شدند");
  };

  // Function to get random bible verse
  const getRandomBibleVerse = () => {
    const verse = pickRandomBibleVerse();
    setBibleVerse(verse);
    toast.success("آیه تصادفی انتخاب شد");
  };

  // Function to suggest random movie
  const getRandomMovie = () => {
    const movie = suggestRandomMovie();
    setMovieSuggestion(movie);
    toast.success("فیلم تصادفی پیشنهاد شد");
  };

  // Function to suggest random recipe
  const getRandomRecipe = () => {
    const recipe = suggestRandomRecipe();
    setRecipeSuggestion(recipe);
    toast.success("دستور پخت تصادفی پیشنهاد شد");
  };

  if (!toolMeta) return null;

  const copyResult = (text: string | number | null | undefined) => {
    if (text) {
      copyToClipboard(text.toString());
    }
  };

  const renderToolContent = () => {
    switch (slug) {
      case 'random-color-generator':
        return <RandomColorGenerator />;
        
      case 'random-string':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={stringLength}
                  onChange={(e) => setStringLength(Number(e.target.value))}
                  className="w-32"
                  placeholder="طول رشته"
                />
                <Button onClick={handleGenerateString} className="flex items-center gap-2">
                  <Dices size={18} />
                  تولید رشته تصادفی
                </Button>
              </div>
              {randomString && (
                <div 
                  className="p-4 bg-muted rounded-lg cursor-pointer font-mono"
                  onClick={() => copyResult(randomString)}
                >
                  {randomString}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-date':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={handleGenerateDate} className="flex items-center gap-2">
                <Calendar size={18} />
                تولید تاریخ تصادفی
              </Button>
              {randomDate && (
                <div 
                  className="p-4 bg-muted rounded-lg cursor-pointer text-center"
                  onClick={() => copyResult(format(randomDate, 'yyyy/MM/dd'))}
                >
                  {format(randomDate, 'yyyy/MM/dd')}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-emoji-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={handleGenerateEmoji} className="flex items-center gap-2 w-full">
                <Sparkles size={18} />
                تولید ایموجی تصادفی
              </Button>
              {emoji && (
                <div 
                  className="p-8 bg-muted rounded-lg cursor-pointer text-center text-6xl"
                  onClick={() => copyResult(emoji)}
                >
                  {emoji}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'dice-roller':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={handleRollDice} className="flex items-center gap-2 w-full">
                <Dice5 size={18} />
                پرتاب تاس
              </Button>
              {diceResult && (
                <div 
                  className="p-8 bg-muted rounded-lg cursor-pointer text-center text-6xl"
                  onClick={() => copyResult(diceResult)}
                >
                  {diceResult}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-word-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={handleGenerateWord} className="flex items-center gap-2 w-full">
                <Dices size={18} />
                تولید کلمه تصادفی
              </Button>
              {randomWord && (
                <div 
                  className="p-4 bg-muted rounded-lg cursor-pointer text-center text-2xl"
                  onClick={() => copyResult(randomWord)}
                >
                  {randomWord}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'coin-flip':
        return (
          <Card>
            <CardContent className="p-6">
              <CoinFlip />
            </CardContent>
          </Card>
        );
        
      case 'random-picker':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="هر مورد را در یک خط بنویسید"
                value={itemsList}
                onChange={(e) => setItemsList(e.target.value)}
                className="min-h-[150px]"
              />
              <Button onClick={handleRandomPick} className="w-full">انتخاب تصادفی</Button>
              {selectedItem && (
                <div className="p-4 bg-muted rounded-lg text-center cursor-pointer"
                     onClick={() => copyResult(selectedItem)}>
                  <p className="text-lg font-medium">نتیجه:</p>
                  <p className="text-xl mt-2">{selectedItem}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-quote-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quote-category">دسته‌بندی</Label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="quote-category">
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">همه دسته‌ها</SelectItem>
                    {quoteCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGenerateQuote} className="w-full">دریافت جمله قصار</Button>
              {quote && (
                <div 
                  className="p-4 bg-muted rounded-lg text-center cursor-pointer"
                  onClick={() => copyResult(quote)}
                >
                  <p className="italic text-lg">"{quote}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-username-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>نوع نام کاربری</Label>
                <RadioGroup
                  value={usernameType}
                  onValueChange={setUsernameType}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">عمومی</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="gaming" id="gaming" />
                    <Label htmlFor="gaming">گیمینگ</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional">حرفه‌ای</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleGenerateUsername} className="w-full">
                تولید نام کاربری
              </Button>
              {username && (
                <div 
                  className="p-4 bg-muted rounded-lg text-center cursor-pointer text-xl"
                  onClick={() => copyResult(username)}
                >
                  {username}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'password-strength-check':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور خود را وارد کنید</Label>
                <Input
                  id="password"
                  type="text"
                  value={passwordToCheck}
                  onChange={(e) => setPasswordToCheck(e.target.value)}
                  className="font-mono"
                />
              </div>
              <Button onClick={checkPasswordStrength} className="w-full">
                بررسی قدرت رمز عبور
              </Button>
              {passwordStrength && (
                <OutcomeInfoCard 
                  outcome={passwordStrength} 
                  success={passwordStrength.startsWith("قوی")}
                />
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-qrcode-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-value">متن یا لینک برای تولید QR</Label>
                <Input
                  id="qr-value"
                  type="text"
                  value={qrValue}
                  onChange={(e) => setQrValue(e.target.value)}
                  placeholder="متن یا آدرس وب را وارد کنید"
                />
              </div>
              <Button onClick={handleGenerateQR} className="w-full">
                تولید کد QR
              </Button>
              {qrCode && (
                <div className="p-4 bg-muted rounded-lg flex justify-center">
                  <div className="bg-white p-4 rounded">
                    <div className="w-48 h-48 border-4 border-gray-800 flex items-center justify-center">
                      <p className="text-xs text-center text-gray-800">
                        نمایش کد QR برای:<br />
                        {qrCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-array-shuffler':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="هر آیتم را در یک خط جدید وارد کنید"
                value={array}
                onChange={(e) => setArray(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={handleArrayShuffle} className="w-full flex gap-2 items-center">
                <Shuffle size={18} />
                مرتب‌سازی تصادفی
              </Button>
              {shuffledArray.length > 0 && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="font-medium mb-2">نتیجه مرتب‌سازی:</p>
                  {shuffledArray.map((item, index) => (
                    <div key={index} className="p-2 bg-background rounded">
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-lottery-numbers':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={generateLotteryNumbers} className="w-full flex gap-2 items-center">
                <Star size={18} />
                تولید اعداد لاتاری
              </Button>
              {lotteryNumbers.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {lotteryNumbers.map((num, index) => (
                    <div key={index} className="p-4 bg-muted rounded-full aspect-square flex items-center justify-center text-2xl font-bold text-primary/80">
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-team-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="نام هر نفر را در یک خط جدید وارد کنید"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={generateRandomTeams} className="w-full">تولید تیم‌ها</Button>
              {teams.length > 0 && (
                <div className="space-y-4 mt-4">
                  {teams.map((team, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        <Award size={16} className="text-primary" />
                        تیم {index + 1}
                      </h3>
                      <div className="space-y-1">
                        {team.map((member, memberIndex) => (
                          <div key={memberIndex} className="p-2 bg-background rounded">
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-card-picker':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={pickRandomCard} className="w-full">انتخاب کارت</Button>
              {selectedCard && (
                <div className="p-8 bg-muted rounded-lg text-center">
                  <span className="text-7xl">{selectedCard}</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
        
      case 'random-gift-picker':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={suggestRandomGift} className="w-full flex gap-2 items-center">
                <Gift size={18} />
                پیشنهاد هدیه
              </Button>
              {giftSuggestion && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">هدیه پیشنهادی:</p>
                  <p className="text-2xl">{giftSuggestion}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-nickname-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={generateRandomNick} className="w-full flex gap-2 items-center">
                <Sparkles size={18} />
                تولید نام مستعار
              </Button>
              {nickname && (
                <div 
                  className="p-4 bg-muted rounded-lg text-center cursor-pointer text-xl"
                  onClick={() => copyResult(nickname)}
                >
                  {nickname}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-decision-maker':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="هر گزینه را در یک خط بنویسید"
                value={decisionOptions}
                onChange={(e) => setDecisionOptions(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={makeRandomDecision} className="w-full">تصمیم‌گیری تصادفی</Button>
              {decision && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">تصمیم:</p>
                  <p className="text-2xl">{decision}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-tournament-bracket':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="نام هر شرکت‌کننده را در یک خط بنویسید"
                value={tournamentParticipants}
                onChange={(e) => setTournamentParticipants(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={generateTournamentBracket} className="w-full flex gap-2 items-center">
                <Award size={18} />
                ایجاد جدول مسابقات
              </Button>
              {tournamentBracket.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h3 className="font-bold">دور اول</h3>
                  <div className="space-y-2">
                    {tournamentBracket.map((match, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{match[0]}</span>
                          <span className="text-muted-foreground">VS</span>
                          <span className="font-medium">{match[1]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-map-location':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={getRandomMapLocation} className="w-full">انتخاب مکان تصادفی</Button>
              {randomLocation && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="mb-2 font-medium">مختصات تصادفی:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 bg-background rounded text-center">
                      <p className="text-sm text-muted-foreground">عرض جغرافیایی</p>
                      <p className="font-mono">{randomLocation.lat.toFixed(6)}</p>
                    </div>
                    <div className="p-2 bg-background rounded text-center">
                      <p className="text-sm text-muted-foreground">طول جغرافیایی</p>
                      <p className="font-mono">{randomLocation.lng.toFixed(6)}</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 border border-dashed rounded-lg bg-primary/5 text-center text-sm">
                    برای مشاهده این مکان بر روی نقشه، این مختصات را در Google Maps جستجو کنید
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-prize-wheel':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Textarea
                placeholder="هر گزینه را در یک خط بنویسید"
                value={prizeWheelOptions}
                onChange={(e) => setPrizeWheelOptions(e.target.value)}
                className="min-h-[120px]"
              />
              <Button onClick={spinPrizeWheel} className="w-full flex gap-2 items-center">
                <RotateCw size={18} />
                چرخاندن چرخ شانس
              </Button>
              {prizeWheelResult && (
                <div className="p-8 mt-4 bg-primary/10 rounded-lg text-center animate-fade-in">
                  <p className="text-muted-foreground mb-2">برنده:</p>
                  <p className="text-2xl font-bold text-primary">{prizeWheelResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-character-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={generateRandomCharacter} className="w-full flex gap-2 items-center">
                <Sparkles size={18} />
                ایجاد شخصیت تصادفی
              </Button>
              {Object.keys(characterAttributes).length > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-bold mb-3 text-center">شخصیت تصادفی</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-background rounded">
                      <p className="text-sm text-muted-foreground">نژاد</p>
                      <p>{characterAttributes.race}</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="text-sm text-muted-foreground">کلاس</p>
                      <p>{characterAttributes.class}</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="text-sm text-muted-foreground">جهت‌گیری</p>
                      <p>{characterAttributes.alignment}</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="text-sm text-muted-foreground">قدرت</p>
                      <p>{characterAttributes.strength}</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="text-sm text-muted-foreground">هوش</p>
                      <p>{characterAttributes.intelligence}</p>
                    </div>
                    <div className="p-2 bg-background rounded">
                      <p className="text-sm text-muted-foreground">کاریزما</p>
                      <p>{characterAttributes.charisma}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-task-assigner':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tasks">وظایف (هر کدام در یک خط)</Label>
                <Textarea
                  id="tasks"
                  placeholder="وظیفه ۱&#10;وظیفه ۲&#10;وظیفه ۳"
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  className="min-h-[90px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="people">افراد (هر کدام در یک خط)</Label>
                <Textarea
                  id="people"
                  placeholder="شخص ۱&#10;شخص ۲&#10;شخص ۳"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="min-h-[90px]"
                />
              </div>
              <Button onClick={assignTasksRandomly} className="w-full">تخصیص تصادفی وظایف</Button>
              {Object.keys(taskAssignments).length > 0 && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h3 className="font-bold mb-2">تخصیص وظایف:</h3>
                  {Object.entries(taskAssignments).map(([task, person], index) => (
                    <div key={index} className="p-2 bg-background rounded flex justify-between">
                      <span>{task}</span>
                      <span className="font-medium text-primary">{person}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-bible-verse':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={getRandomBibleVerse} className="w-full flex gap-2 items-center">
                <Star size={18} />
                دریافت آیه تصادفی کتاب مقدس
              </Button>
              {bibleVerse && (
                <div 
                  className="p-4 bg-muted rounded-lg text-center cursor-pointer"
                  onClick={() => copyResult(bibleVerse)}
                >
                  <p className="italic text-lg">"{bibleVerse}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-movie-picker':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={getRandomMovie} className="w-full flex gap-2 items-center">
                <Dices size={18} />
                پیشنهاد فیلم تصادفی
              </Button>
              {movieSuggestion && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">فیلم پیشنهادی:</p>
                  <p className="text-xl">{movieSuggestion}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'random-recipe-generator':
        return (
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button onClick={getRandomRecipe} className="w-full flex gap-2 items-center">
                <Dices size={18} />
                دریافت دستور پخت تصادفی
              </Button>
              {recipeSuggestion && (
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">دستور پخت پیشنهادی:</p>
                  <p className="text-xl">{recipeSuggestion}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );

      default:
        return (
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
              <p className="text-muted-foreground">
                این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
      />
      
      {renderToolContent()}
    </div>
  );
}
