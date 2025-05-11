
import React, { useState } from 'react';
import { Book, Search, VolumeIcon, Bookmark, BookOpen, School } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Define phrases data
interface Phrase {
  id: number;
  english: string;
  farsi: string;
  pronunciation: string;
  category: PhraseCategory;
  notes?: string;
}

type PhraseCategory = 
  | 'greetings'
  | 'basic'
  | 'numbers'
  | 'shopping'
  | 'travel'
  | 'food'
  | 'emergency'
  | 'culture';

const phraseCategoriesLabels: Record<PhraseCategory, string> = {
  'greetings': 'Greetings',
  'basic': 'Basic Phrases',
  'numbers': 'Numbers',
  'shopping': 'Shopping',
  'travel': 'Travel',
  'food': 'Food',
  'emergency': 'Emergency',
  'culture': 'Cultural'
};

const categoryColors: Record<PhraseCategory, string> = {
  'greetings': 'bg-blue-100 text-blue-800 border-blue-200',
  'basic': 'bg-purple-100 text-purple-800 border-purple-200',
  'numbers': 'bg-green-100 text-green-800 border-green-200',
  'shopping': 'bg-amber-100 text-amber-800 border-amber-200',
  'travel': 'bg-red-100 text-red-800 border-red-200',
  'food': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'emergency': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'culture': 'bg-cyan-100 text-cyan-800 border-cyan-200'
};

// Sample phrases data
const phrases: Phrase[] = [
  {
    id: 1,
    english: "Hello",
    farsi: "سلام",
    pronunciation: "salām",
    category: "greetings"
  },
  {
    id: 2,
    english: "How are you?",
    farsi: "حال شما چطور است؟",
    pronunciation: "hāl-e shomā chetor ast?",
    category: "greetings"
  },
  {
    id: 3,
    english: "My name is...",
    farsi: "اسم من ... است",
    pronunciation: "esm-e man ... ast",
    category: "basic"
  },
  {
    id: 4,
    english: "Thank you",
    farsi: "ممنون",
    pronunciation: "mamnoon",
    category: "basic"
  },
  {
    id: 5,
    english: "You're welcome",
    farsi: "خواهش می‌کنم",
    pronunciation: "khāhesh mikonam",
    category: "basic"
  },
  {
    id: 6,
    english: "Goodbye",
    farsi: "خداحافظ",
    pronunciation: "khodāhāfez",
    category: "greetings"
  },
  {
    id: 7,
    english: "Yes",
    farsi: "بله",
    pronunciation: "baleh",
    category: "basic"
  },
  {
    id: 8,
    english: "No",
    farsi: "نه",
    pronunciation: "na",
    category: "basic"
  },
  {
    id: 9,
    english: "Please",
    farsi: "لطفا",
    pronunciation: "lotfan",
    category: "basic"
  },
  {
    id: 10,
    english: "Sorry",
    farsi: "ببخشید",
    pronunciation: "bebakhshid",
    category: "basic"
  },
  {
    id: 11,
    english: "One",
    farsi: "یک",
    pronunciation: "yek",
    category: "numbers"
  },
  {
    id: 12,
    english: "Two",
    farsi: "دو",
    pronunciation: "do",
    category: "numbers"
  },
  {
    id: 13,
    english: "Three",
    farsi: "سه",
    pronunciation: "seh",
    category: "numbers"
  },
  {
    id: 14,
    english: "Four",
    farsi: "چهار",
    pronunciation: "chahār",
    category: "numbers"
  },
  {
    id: 15,
    english: "Five",
    farsi: "پنج",
    pronunciation: "panj",
    category: "numbers"
  },
  {
    id: 16,
    english: "How much is it?",
    farsi: "چقدر است؟",
    pronunciation: "cheghadr ast?",
    category: "shopping"
  },
  {
    id: 17,
    english: "It's too expensive",
    farsi: "خیلی گران است",
    pronunciation: "kheili gerān ast",
    category: "shopping"
  },
  {
    id: 18,
    english: "Where is the bathroom?",
    farsi: "دستشویی کجاست؟",
    pronunciation: "dastshuyi kojāst?",
    category: "travel"
  },
  {
    id: 19,
    english: "I need help",
    farsi: "من کمک نیاز دارم",
    pronunciation: "man komak niāz dāram",
    category: "emergency"
  },
  {
    id: 20,
    english: "I don't understand",
    farsi: "من نمی‌فهمم",
    pronunciation: "man nemifahmam",
    category: "basic"
  },
  {
    id: 21,
    english: "I'm from America",
    farsi: "من از آمریکا هستم",
    pronunciation: "man az āmrikā hastam",
    category: "basic",
    notes: "Replace 'America' with your country"
  },
  {
    id: 22,
    english: "Delicious",
    farsi: "خوشمزه",
    pronunciation: "khoshmaze",
    category: "food"
  },
  {
    id: 23,
    english: "I would like water",
    farsi: "آب می‌خواهم",
    pronunciation: "āb mikhāham",
    category: "food"
  },
  {
    id: 24,
    english: "I'm vegetarian",
    farsi: "من گیاه‌خوار هستم",
    pronunciation: "man giyāh-khār hastam",
    category: "food"
  },
  {
    id: 25,
    english: "Check, please",
    farsi: "صورتحساب، لطفا",
    pronunciation: "sorat-hesāb, lotfan",
    category: "food"
  },
  {
    id: 26,
    english: "Nice to meet you",
    farsi: "از آشنایی با شما خوشحالم",
    pronunciation: "az āshnāyi bā shomā khoshhālam",
    category: "greetings"
  },
  {
    id: 27,
    english: "I love Iran",
    farsi: "من ایران را دوست دارم",
    pronunciation: "man irān rā dust dāram",
    category: "culture"
  },
  {
    id: 28,
    english: "Excuse me",
    farsi: "ببخشید",
    pronunciation: "bebakhshid",
    category: "basic"
  },
  {
    id: 29,
    english: "How do you say ... in Farsi?",
    farsi: "... به فارسی چه می‌شود؟",
    pronunciation: "... be fārsi che mishavad?",
    category: "basic"
  },
  {
    id: 30,
    english: "Can you speak slower?",
    farsi: "میشه آهسته‌تر صحبت کنید؟",
    pronunciation: "mishe āheste-tar sohbat konid?",
    category: "basic"
  }
];

// Farsi alphabet data
interface AlphabetLetter {
  letter: string;
  name: string;
  pronunciation: string;
  example: string;
  exampleMeaning: string;
  soundLike: string;
}

const alphabet: AlphabetLetter[] = [
  {
    letter: "آ",
    name: "آلف",
    pronunciation: "alef",
    example: "آب",
    exampleMeaning: "water",
    soundLike: "a as in father"
  },
  {
    letter: "ب",
    name: "بِ",
    pronunciation: "be",
    example: "باد",
    exampleMeaning: "wind",
    soundLike: "b as in boy"
  },
  {
    letter: "پ",
    name: "پِ",
    pronunciation: "pe",
    example: "پدر",
    exampleMeaning: "father",
    soundLike: "p as in pen"
  },
  {
    letter: "ت",
    name: "تِ",
    pronunciation: "te",
    example: "تاب",
    exampleMeaning: "swing",
    soundLike: "t as in table"
  },
  {
    letter: "ث",
    name: "ثِ",
    pronunciation: "se",
    example: "ثروت",
    exampleMeaning: "wealth",
    soundLike: "s as in set"
  },
  {
    letter: "ج",
    name: "جیم",
    pronunciation: "jim",
    example: "جان",
    exampleMeaning: "life",
    soundLike: "j as in job"
  },
  {
    letter: "چ",
    name: "چِ",
    pronunciation: "che",
    example: "چشم",
    exampleMeaning: "eye",
    soundLike: "ch as in chair"
  },
  {
    letter: "ح",
    name: "حِ",
    pronunciation: "he",
    example: "حال",
    exampleMeaning: "mood",
    soundLike: "h as in heavy"
  },
  {
    letter: "خ",
    name: "خِ",
    pronunciation: "khe",
    example: "خانه",
    exampleMeaning: "home",
    soundLike: "kh as in Scottish loch"
  },
  {
    letter: "د",
    name: "دال",
    pronunciation: "dāl",
    example: "در",
    exampleMeaning: "door",
    soundLike: "d as in door"
  },
  {
    letter: "ذ",
    name: "ذال",
    pronunciation: "zāl",
    example: "ذهن",
    exampleMeaning: "mind",
    soundLike: "z as in zoo"
  },
  {
    letter: "ر",
    name: "رِ",
    pronunciation: "re",
    example: "راه",
    exampleMeaning: "road",
    soundLike: "r as in run (but rolled)"
  },
  {
    letter: "ز",
    name: "زِ",
    pronunciation: "ze",
    example: "زبان",
    exampleMeaning: "language",
    soundLike: "z as in zebra"
  },
  {
    letter: "ژ",
    name: "ژِ",
    pronunciation: "zhe",
    example: "ژاله",
    exampleMeaning: "dew",
    soundLike: "s as in pleasure"
  },
  {
    letter: "س",
    name: "سین",
    pronunciation: "sin",
    example: "سر",
    exampleMeaning: "head",
    soundLike: "s as in sun"
  }
];

// Grammar rules
interface GrammarRule {
  id: number;
  title: string;
  explanation: string;
  examples: {farsi: string, english: string}[];
}

const grammarRules: GrammarRule[] = [
  {
    id: 1,
    title: "Basic Sentence Structure",
    explanation: "Farsi follows Subject-Object-Verb (SOV) order, unlike English's Subject-Verb-Object (SVO) structure.",
    examples: [
      {farsi: "من سیب می‌خورم", english: "I eat an apple (lit: I apple eat)"},
      {farsi: "او کتاب می‌خواند", english: "She reads a book (lit: She book reads)"}
    ]
  },
  {
    id: 2,
    title: "Ezafe Construction",
    explanation: "The ezafe is an unstressed vowel (-e) that links together words in a possessive or descriptive relationship.",
    examples: [
      {farsi: "کتابِ من", english: "My book (lit: book of me)"},
      {farsi: "خانه‌یِ بزرگ", english: "Big house (lit: house of big)"}
    ]
  },
  {
    id: 3,
    title: "Present Tense",
    explanation: "To form the present tense, add the prefix 'mi-' to the present stem and the appropriate personal ending.",
    examples: [
      {farsi: "من می‌روم", english: "I go/am going"},
      {farsi: "تو می‌روی", english: "You go/are going"},
      {farsi: "او می‌رود", english: "He/She goes/is going"}
    ]
  }
];

export default function FarsiLearning() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory | 'all'>('all');
  
  // Filter phrases based on search and category
  const filteredPhrases = phrases.filter(phrase => {
    const matchesSearch = searchQuery === '' || 
      phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.farsi.includes(searchQuery) ||
      phrase.pronunciation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || phrase.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Copy phrase to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Phrase copied to clipboard"
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card className="shadow-md mb-6">
        <CardHeader className="bg-gradient-to-b from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <CardTitle>Learn Farsi (Persian)</CardTitle>
          </div>
          <p className="text-gray-600 text-sm">A practical guide for English speakers</p>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="phrases">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="phrases">Common Phrases</TabsTrigger>
              <TabsTrigger value="alphabet">Alphabet</TabsTrigger>
              <TabsTrigger value="grammar">Grammar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phrases">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="Search phrases..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-3"
                    />
                  </div>
                  <select 
                    className="w-full sm:w-48 h-10 rounded-md border border-input bg-white px-3 py-2 text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as PhraseCategory | 'all')}
                  >
                    <option value="all">All Categories</option>
                    {Object.entries(phraseCategoriesLabels).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredPhrases.length > 0 ? (
                    filteredPhrases.map((phrase) => (
                      <Card key={phrase.id} className="hover:bg-gray-50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-lg">{phrase.english}</h3>
                            <Badge className={`${categoryColors[phrase.category]} ml-2 whitespace-nowrap`}>
                              {phraseCategoriesLabels[phrase.category]}
                            </Badge>
                          </div>
                          <p className="text-2xl mb-2 font-medium">{phrase.farsi}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-gray-600 text-sm italic">
                              Pronunciation: <span className="font-medium">{phrase.pronunciation}</span>
                            </p>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyToClipboard(phrase.farsi)}
                                className="h-8 w-8"
                                title="Copy"
                              >
                                <Bookmark size={16} />
                              </Button>
                              {/* Audio button placeholder */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                title="Listen"
                              >
                                <VolumeIcon size={16} />
                              </Button>
                            </div>
                          </div>
                          {phrase.notes && (
                            <p className="text-gray-600 text-xs mt-2 bg-blue-50 p-2 rounded">
                              Note: {phrase.notes}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No phrases found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="alphabet">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Persian Alphabet</h2>
                <p className="text-gray-600 mb-6">Persian is written from right to left using a modified version of the Arabic script. Here are the basic letters:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                  {alphabet.map((letter, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-4xl font-bold ml-4">{letter.letter}</span>
                          <div>
                            <p className="text-sm text-gray-600">Name: <span className="font-medium">{letter.name}</span></p>
                            <p className="text-sm text-gray-600">Pronunciation: <span className="font-medium">{letter.pronunciation}</span></p>
                          </div>
                        </div>
                        <p className="text-sm mb-1">Sounds like: <span className="font-medium italic">{letter.soundLike}</span></p>
                        <p className="text-sm">Example: <span className="font-medium">{letter.example}</span> = {letter.exampleMeaning}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <School size={18} />
                    Learning Tips
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Practice writing from right to left</li>
                    <li>Persian letters change form depending on their position in a word (initial, medial, final)</li>
                    <li>Many letters look similar - focus on the dots and their positions</li>
                    <li>Persian has six vowel sounds, but only three vowel letters</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="grammar">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Basic Grammar Rules</h2>
                <p className="text-gray-600 mb-6">Understanding basic Farsi grammar will help you form proper sentences:</p>
                
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1">
                  {grammarRules.map((rule) => (
                    <Card key={rule.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">{rule.title}</h3>
                        <p className="mb-4">{rule.explanation}</p>
                        <h4 className="font-medium text-sm text-gray-600 mb-2">Examples:</h4>
                        <div className="space-y-2 bg-gray-50 p-3 rounded">
                          {rule.examples.map((example, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <div className="font-medium text-lg">{example.farsi}</div>
                              <div className="text-gray-500 sm:ml-4">{example.english}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-amber-50 p-4 rounded-lg mt-6">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Book size={18} className="text-amber-600" />
                    Pro Tips
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>In Farsi, there's no grammatical gender for nouns</li>
                    <li>The verb typically comes at the end of the sentence</li>
                    <li>There are no definite articles (like "the" in English)</li>
                    <li>Adjectives come after the nouns they modify</li>
                    <li>Persian has formal and informal forms of "you"</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
