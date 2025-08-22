export interface PersianRecipe {
  id: string;
  nameFarsi: string;
  nameEnglish: string;
  region: string;
  category: 'main' | 'appetizer' | 'dessert' | 'drink' | 'side';
  difficulty: 'easy' | 'medium' | 'hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  descriptionFarsi: string;
  descriptionEnglish: string;
  ingredientsFarsi: string[];
  ingredientsEnglish: string[];
  instructionsFarsi: string[];
  instructionsEnglish: string[];
  tips?: string;
  image?: string;
  tags: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export const persianRecipes: PersianRecipe[] = [
  {
    id: 'chelo-kabab',
    nameFarsi: 'چلو کباب',
    nameEnglish: 'Chelo Kebab',
    region: 'سراسر ایران',
    category: 'main',
    difficulty: 'medium',
    prepTime: 120,
    cookTime: 20,
    servings: 4,
    descriptionFarsi: 'غذای ملی ایران، برنج سفید با کباب کوبیده یا برگ',
    descriptionEnglish: 'Iran\'s national dish, white rice served with grilled kebab',
    ingredientsFarsi: [
      '۵۰۰ گرم گوشت چرخ کرده گوساله',
      '۲ پیاز متوسط رنده شده',
      '۲ قاشق چای‌خوری نمک',
      '۱ قاشق چای‌خوری فلفل سیاه',
      '۳ پیمانه برنج',
      '۲ قاشق غذاخوری کره',
      'زعفران دم کرده'
    ],
    ingredientsEnglish: [
      '500g ground beef or lamb',
      '2 medium onions, grated',
      '2 tsp salt',
      '1 tsp black pepper',
      '3 cups basmati rice',
      '2 tbsp butter',
      'Saffron water'
    ],
    instructionsFarsi: [
      'گوشت چرخ کرده را با پیاز رنده شده، نمک و فلفل مخلوط کنید',
      'مخلوط را ۲ ساعت در یخچال بگذارید',
      'برنج را بشویید و ۳۰ دقیقه خیس کنید',
      'برنج را در آب جوش با نمک بپزید تا نیمه پز شود',
      'برنج را آبکش کنید و در قابلمه با کره دم کنید',
      'کباب را روی آتش کباب بپزید',
      'با برنج و زعفران سرو کنید'
    ],
    instructionsEnglish: [
      'Mix ground meat with grated onion, salt, and pepper',
      'Refrigerate the mixture for 2 hours',
      'Wash and soak rice for 30 minutes',
      'Parboil rice in salted water until half-cooked',
      'Drain rice and steam with butter',
      'Grill kebabs over open fire',
      'Serve with rice and saffron'
    ],
    tips: 'برای کباب بهتر، گوشت را روز قبل ادویه کنید',
    tags: ['کباب', 'برنج', 'غذای ملی'],
    nutritionalInfo: {
      calories: 650,
      protein: '35g',
      carbs: '45g',
      fat: '25g'
    }
  },
  {
    id: 'ghormeh-sabzi',
    nameFarsi: 'قورمه سبزی',
    nameEnglish: 'Ghormeh Sabzi',
    region: 'سراسر ایران',
    category: 'main',
    difficulty: 'hard',
    prepTime: 45,
    cookTime: 180,
    servings: 6,
    descriptionFarsi: 'خورش سنتی ایرانی با سبزیجات، گوشت و لوبیا قرمز',
    descriptionEnglish: 'Traditional Iranian stew with herbs, meat and kidney beans',
    ingredientsFarsi: [
      '۵۰۰ گرم گوشت گوساله خرد شده',
      '۵۰۰ گرم سبزی قورمه (جعفری، تره، شنبلیله)',
      '۱ پیمانه لوبیا قرمز',
      '۳ عدد لیموعمانی',
      '۱ پیاز بزرگ',
      '۳ قاشق غذاخوری روغن',
      'نمک، فلفل، زردچوبه'
    ],
    ingredientsEnglish: [
      '500g diced lamb or beef',
      '500g mixed herbs (parsley, cilantro, chives, fenugreek)',
      '1 cup red kidney beans',
      '3 dried limes',
      '1 large onion',
      '3 tbsp oil',
      'Salt, pepper, turmeric'
    ],
    instructionsFarsi: [
      'لوبیا قرمز را شب قبل خیس کنید',
      'سبزیجات را خرد کنید و تفت دهید',
      'پیاز را تفت دهید تا طلایی شود',
      'گوشت را اضافه کنید و سرخ کنید',
      'سبزی تفت داده و لوبیا را اضافه کنید',
      'لیموعمانی را سوراخ کنید و اضافه کنید',
      '۳ ساعت روی آتش ملایم بپزید'
    ],
    instructionsEnglish: [
      'Soak kidney beans overnight',
      'Chop and sauté the herbs',
      'Sauté onion until golden',
      'Add meat and brown',
      'Add sautéed herbs and beans',
      'Pierce dried limes and add',
      'Simmer for 3 hours on low heat'
    ],
    tips: 'سبزی قورمه را خوب تفت دهید تا عطر آن بلند شود',
    tags: ['خورش', 'سبزی', 'گوشت'],
    nutritionalInfo: {
      calories: 420,
      protein: '28g',
      carbs: '32g',
      fat: '18g'
    }
  },
  {
    id: 'fesenjan',
    nameFarsi: 'فسنجان',
    nameEnglish: 'Fesenjan',
    region: 'شمال ایران',
    category: 'main',
    difficulty: 'hard',
    prepTime: 30,
    cookTime: 120,
    servings: 4,
    descriptionFarsi: 'خورش انار و گردو با مرغ، غذای اصیل شمال ایران',
    descriptionEnglish: 'Pomegranate walnut stew with chicken from Northern Iran',
    ingredientsFarsi: [
      '۱ مرغ کامل',
      '۲ پیمانه گردو آسیاب شده',
      '۱ پیمانه رب انار',
      '۲ قاشق غذاخوری شکر',
      '۱ قاشق چای‌خوری دارچین',
      'نمک و فلفل'
    ],
    ingredientsEnglish: [
      '1 whole chicken',
      '2 cups ground walnuts',
      '1 cup pomegranate molasses',
      '2 tbsp sugar',
      '1 tsp cinnamon',
      'Salt and pepper'
    ],
    instructionsFarsi: [
      'مرغ را تکه تکه کنید و سرخ کنید',
      'گردو آسیاب شده را با آب مخلوط کنید',
      'رب انار و شکر را اضافه کنید',
      'مرغ را در سس قرار دهید',
      'دارچین اضافه کنید',
      '۲ ساعت روی آتش ملایم بپزید'
    ],
    instructionsEnglish: [
      'Cut chicken into pieces and fry',
      'Mix ground walnuts with water',
      'Add pomegranate molasses and sugar',
      'Place chicken in the sauce',
      'Add cinnamon',
      'Simmer for 2 hours on low heat'
    ],
    tips: 'طعم شیرین و ترش خورش را با رب انار و شکر تنظیم کنید',
    tags: ['خورش', 'مرغ', 'شمالی'],
    nutritionalInfo: {
      calories: 520,
      protein: '32g',
      carbs: '28g',
      fat: '32g'
    }
  },
  {
    id: 'tahchin',
    nameFarsi: 'تاچین',
    nameEnglish: 'Tahchin',
    region: 'اصفهان',
    category: 'main',
    difficulty: 'hard',
    prepTime: 60,
    cookTime: 90,
    servings: 8,
    descriptionFarsi: 'برنج لایه‌ای با مرغ، زعفران و ماست',
    descriptionEnglish: 'Layered saffron rice cake with chicken and yogurt',
    ingredientsFarsi: [
      '۴ پیمانه برنج',
      '۵۰۰ گرم سینه مرغ',
      '۲ پیمانه ماست',
      '۳ عدد زرده تخم مرغ',
      'زعفران دم کرده',
      'برگ بو، دارچین، هل'
    ],
    ingredientsEnglish: [
      '4 cups basmati rice',
      '500g chicken breast',
      '2 cups yogurt',
      '3 egg yolks',
      'Saffron water',
      'Bay leaves, cinnamon, cardamom'
    ],
    instructionsFarsi: [
      'برنج را نیمه پز کنید',
      'مرغ را با ادویه بپزید',
      'ماست را با زرده و زعفران مخلوط کنید',
      'یک لایه برنج، یک لایه مرغ بچینید',
      'مخلوط ماست را روی آن بریزید',
      '۱.۵ ساعت در فر بپزید'
    ],
    instructionsEnglish: [
      'Parboil the rice',
      'Cook chicken with spices',
      'Mix yogurt with egg yolks and saffron',
      'Layer rice and chicken alternately',
      'Pour yogurt mixture on top',
      'Bake for 1.5 hours in oven'
    ],
    tips: 'برای ته دیگ طلایی، قابلمه را روی آتش تند بگذارید',
    tags: ['برنج', 'مرغ', 'فر'],
    nutritionalInfo: {
      calories: 480,
      protein: '26g',
      carbs: '52g',
      fat: '16g'
    }
  },
  {
    id: 'ash-reshteh',
    nameFarsi: 'آش رشته',
    nameEnglish: 'Ash Reshteh',
    region: 'سراسر ایران',
    category: 'main',
    difficulty: 'medium',
    prepTime: 30,
    cookTime: 120,
    servings: 6,
    descriptionFarsi: 'آش سنتی با رشته، حبوبات و سبزیجات',
    descriptionEnglish: 'Traditional noodle soup with legumes and herbs',
    ingredientsFarsi: [
      '۲۰۰ گرم رشته',
      '۱ پیمانه لوبیا سفید',
      '۱ پیمانه نخود',
      '۱ پیمانه عدس',
      '۲ پیمانه سبزی آش',
      '۲ قاشق غذاخوری کشک',
      'پیاز داغ'
    ],
    ingredientsEnglish: [
      '200g Persian noodles',
      '1 cup white beans',
      '1 cup chickpeas',
      '1 cup lentils',
      '2 cups mixed herbs',
      '2 tbsp kashk (whey)',
      'Fried onions'
    ],
    instructionsFarsi: [
      'حبوبات را شب قبل خیس کنید',
      'حبوبات را بپزید',
      'سبزیجات را خرد کنید و تفت دهید',
      'رشته را اضافه کنید',
      'همه مواد را با آب بپزید',
      'با کشک و پیاز داغ تزیین کنید'
    ],
    instructionsEnglish: [
      'Soak legumes overnight',
      'Cook the legumes',
      'Chop and sauté herbs',
      'Add noodles',
      'Cook everything with water',
      'Garnish with kashk and fried onions'
    ],
    tips: 'آش را غلیظ نگه دارید و مراقب سوختن رشته باشید',
    tags: ['آش', 'رشته', 'گیاهی'],
    nutritionalInfo: {
      calories: 320,
      protein: '18g',
      carbs: '48g',
      fat: '8g'
    }
  },
  {
    id: 'baghali-polo',
    nameFarsi: 'باقلا پلو با ماهیچه',
    nameEnglish: 'Baghali Polo',
    region: 'شمال ایران',
    category: 'main',
    difficulty: 'medium',
    prepTime: 45,
    cookTime: 150,
    servings: 6,
    descriptionFarsi: 'برنج با باقلا و شوید همراه ماهیچه',
    descriptionEnglish: 'Dill and fava bean rice with lamb shank',
    ingredientsFarsi: [
      '۳ پیمانه برنج',
      '۲ پیمانه باقلای تازه',
      '۲ پیمانه شوید خرد شده',
      '۴ عدد ماهیچه',
      'زعفران',
      'نمک، فلفل'
    ],
    ingredientsEnglish: [
      '3 cups basmati rice',
      '2 cups fresh fava beans',
      '2 cups chopped dill',
      '4 lamb shanks',
      'Saffron',
      'Salt, pepper'
    ],
    instructionsFarsi: [
      'ماهیچه را با ادویه بپزید',
      'برنج را نیمه پز کنید',
      'باقلا را آب پز کنید',
      'برنج را با شوید و باقلا مخلوط کنید',
      'دم کنید',
      'با ماهیچه سرو کنید'
    ],
    instructionsEnglish: [
      'Cook lamb shanks with spices',
      'Parboil the rice',
      'Blanch fava beans',
      'Mix rice with dill and fava beans',
      'Steam the rice',
      'Serve with lamb shanks'
    ],
    tags: ['برنج', 'باقلا', 'ماهیچه'],
    nutritionalInfo: {
      calories: 580,
      protein: '34g',
      carbs: '58g',
      fat: '22g'
    }
  },
  {
    id: 'khorak-bademjan',
    nameFarsi: 'خوراک بادمجان',
    nameEnglish: 'Khorak Bademjan',
    region: 'سراسر ایران',
    category: 'main',
    difficulty: 'easy',
    prepTime: 20,
    cookTime: 45,
    servings: 4,
    descriptionFarsi: 'بادمجان سرخ شده با گوجه فرنگی و ادویه',
    descriptionEnglish: 'Fried eggplant with tomatoes and spices',
    ingredientsFarsi: [
      '۴ عدد بادمجان متوسط',
      '۴ عدد گوجه فرنگی',
      '۲ حبه سیر',
      '۱ قاشق چای‌خوری زردچوبه',
      'نمک، فلفل',
      'روغن برای سرخ کردن'
    ],
    ingredientsEnglish: [
      '4 medium eggplants',
      '4 tomatoes',
      '2 garlic cloves',
      '1 tsp turmeric',
      'Salt, pepper',
      'Oil for frying'
    ],
    instructionsFarsi: [
      'بادمجان را ورقه ورقه کنید و نمک بزنید',
      'بادمجان را سرخ کنید',
      'گوجه فرنگی و سیر را تفت دهید',
      'ادویه‌ها را اضافه کنید',
      'بادمجان را اضافه کنید',
      '۲۰ دقیقه بپزید'
    ],
    instructionsEnglish: [
      'Slice eggplants and salt them',
      'Fry the eggplant slices',
      'Sauté tomatoes and garlic',
      'Add spices',
      'Add fried eggplant',
      'Cook for 20 minutes'
    ],
    tags: ['بادمجان', 'گیاهی', 'آسان'],
    nutritionalInfo: {
      calories: 180,
      protein: '4g',
      carbs: '22g',
      fat: '12g'
    }
  },
  {
    id: 'shole-zard',
    nameFarsi: 'شله زرد',
    nameEnglish: 'Shole Zard',
    region: 'سراسر ایران',
    category: 'dessert',
    difficulty: 'easy',
    prepTime: 15,
    cookTime: 60,
    servings: 8,
    descriptionFarsi: 'دسر سنتی ایرانی با برنج، شیر و زعفران',
    descriptionEnglish: 'Traditional Persian rice pudding with milk and saffron',
    ingredientsFarsi: [
      '۱ پیمانه برنج',
      '۴ پیمانه شیر',
      '۱ پیمانه شکر',
      'زعفران دم کرده',
      '۱ قاشق چای‌خوری گلاب',
      'پودر دارچین برای تزیین'
    ],
    ingredientsEnglish: [
      '1 cup rice',
      '4 cups milk',
      '1 cup sugar',
      'Saffron water',
      '1 tsp rose water',
      'Cinnamon powder for garnish'
    ],
    instructionsFarsi: [
      'برنج را با آب بپزید',
      'شیر را اضافه کنید',
      'شکر و زعفران اضافه کنید',
      'تا غلیظ شدن بپزید',
      'گلاب اضافه کنید',
      'با دارچین تزیین کنید'
    ],
    instructionsEnglish: [
      'Cook rice with water',
      'Add milk',
      'Add sugar and saffron',
      'Cook until thick',
      'Add rose water',
      'Garnish with cinnamon'
    ],
    tags: ['دسر', 'برنج', 'شیر'],
    nutritionalInfo: {
      calories: 240,
      protein: '6g',
      carbs: '48g',
      fat: '4g'
    }
  },
  {
    id: 'faloodeh',
    nameFarsi: 'فالوده',
    nameEnglish: 'Faloodeh',
    region: 'شیراز',
    category: 'dessert',
    difficulty: 'medium',
    prepTime: 120,
    cookTime: 30,
    servings: 4,
    descriptionFarsi: 'بستنی سنتی شیرازی با نشاسته و آب لیمو',
    descriptionEnglish: 'Traditional Shirazi frozen dessert with starch noodles',
    ingredientsFarsi: [
      '۲ قاشق غذاخوری نشاسته ذرت',
      '۲ پیمانه آب',
      '۱/۲ پیمانه شکر',
      'آب لیمو تازه',
      'گلاب',
      'یخ خرد شده'
    ],
    ingredientsEnglish: [
      '2 tbsp corn starch',
      '2 cups water',
      '1/2 cup sugar',
      'Fresh lime juice',
      'Rose water',
      'Crushed ice'
    ],
    instructionsFarsi: [
      'نشاسته را با آب حل کنید',
      'روی آتش بپزید تا غلیظ شود',
      'سرد کنید و یخ بزنید',
      'با قاشق رشته کنید',
      'با آب لیمو و گلاب سرو کنید'
    ],
    instructionsEnglish: [
      'Dissolve starch in water',
      'Cook until thickened',
      'Cool and freeze',
      'Shred with spoon',
      'Serve with lime juice and rose water'
    ],
    tags: ['دسر', 'سرد', 'شیراز'],
    nutritionalInfo: {
      calories: 120,
      protein: '0g',
      carbs: '30g',
      fat: '0g'
    }
  },
  {
    id: 'doogh',
    nameFarsi: 'دوغ',
    nameEnglish: 'Doogh',
    region: 'سراسر ایران',
    category: 'drink',
    difficulty: 'easy',
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    descriptionFarsi: 'نوشیدنی سنتی ایرانی با ماست و نعنا',
    descriptionEnglish: 'Traditional Iranian yogurt drink with mint',
    ingredientsFarsi: [
      '۲ پیمانه ماست',
      '۱ پیمانه آب سرد',
      '۱ قاشق چای‌خوری نمک',
      'نعنا خشک',
      'یخ'
    ],
    ingredientsEnglish: [
      '2 cups yogurt',
      '1 cup cold water',
      '1 tsp salt',
      'Dried mint',
      'Ice'
    ],
    instructionsFarsi: [
      'ماست را با آب مخلوط کنید',
      'نمک اضافه کنید',
      'نعنا خشک بریزید',
      'خوب هم بزنید',
      'با یخ سرو کنید'
    ],
    instructionsEnglish: [
      'Mix yogurt with water',
      'Add salt',
      'Sprinkle dried mint',
      'Mix well',
      'Serve with ice'
    ],
    tags: ['نوشیدنی', 'ماست', 'سرد'],
    nutritionalInfo: {
      calories: 80,
      protein: '6g',
      carbs: '8g',
      fat: '2g'
    }
  }
];

export const getRecipesByCategory = (category: string): PersianRecipe[] => {
  return persianRecipes.filter(recipe => recipe.category === category);
};

export const getRecipesByRegion = (region: string): PersianRecipe[] => {
  return persianRecipes.filter(recipe => recipe.region.includes(region));
};

export const getRecipesByDifficulty = (difficulty: string): PersianRecipe[] => {
  return persianRecipes.filter(recipe => recipe.difficulty === difficulty);
};

export const searchRecipes = (query: string): PersianRecipe[] => {
  const lowercaseQuery = query.toLowerCase();
  return persianRecipes.filter(recipe =>
    recipe.nameFarsi.includes(query) ||
    recipe.nameEnglish.toLowerCase().includes(lowercaseQuery) ||
    recipe.descriptionFarsi.includes(query) ||
    recipe.descriptionEnglish.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.includes(query))
  );
};

export const getRandomRecipe = (): PersianRecipe => {
  return persianRecipes[Math.floor(Math.random() * persianRecipes.length)];
};