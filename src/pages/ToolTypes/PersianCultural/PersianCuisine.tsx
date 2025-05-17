
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, ChevronDown, ChevronUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Recipe {
  id: string;
  nameFa: string;
  nameEn: string;
  servings: number;
  preparationTime: string;
  cookingTime: string;
  ingredientsFa: string[];
  ingredientsEn: string[];
  instructionsFa: string;
  instructionsEn: string;
  category: 'main' | 'dessert' | 'rice' | 'appetizer';
  region?: string;
}

const recipes: Recipe[] = [
  {
    id: 'ghormeh-sabzi',
    nameFa: 'قورمه سبزی',
    nameEn: 'Ghormeh Sabzi',
    servings: 4,
    preparationTime: '30 دقیقه',
    cookingTime: '3 ساعت',
    ingredientsFa: [
      '500 گرم گوشت گوسفند یا گوساله', 
      '2 پیمانه سبزی قورمه (تره، جعفری، شنبلیله)', 
      '1 پیمانه لوبیا قرمز', 
      '4 عدد لیموعمانی', 
      '1 عدد پیاز متوسط', 
      'زردچوبه، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '500g lamb or beef', 
      '2 cups of chopped herbs (leeks, parsley, fenugreek)', 
      '1 cup red kidney beans', 
      '4 dried limes', 
      '1 medium onion', 
      'Turmeric, salt, and pepper to taste'
    ],
    instructionsFa: 'ابتدا لوبیا را از شب قبل خیس کنید. پیاز را خرد کرده و با کمی روغن تفت دهید. گوشت را اضافه کرده و تفت دهید تا رنگ آن تغییر کند. زردچوبه، نمک و فلفل را اضافه کنید. سبزی را جداگانه سرخ کرده و به همراه لوبیا و لیموعمانی به گوشت اضافه کنید. حدود 3-4 ساعت با حرارت ملایم بپزید تا جا بیفتد.',
    instructionsEn: 'Soak the beans overnight. Chop the onion and sauté in oil. Add the meat and fry until the color changes. Add turmeric, salt, and pepper. Fry the herbs separately and add to the meat along with the beans and dried limes. Cook on low heat for 3-4 hours until fully cooked.',
    category: 'main',
    region: 'سراسر ایران'
  },
  {
    id: 'fesenjan',
    nameFa: 'خورش فسنجان',
    nameEn: 'Fesenjan (Pomegranate Walnut Stew)',
    servings: 4,
    preparationTime: '20 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '1 کیلو مرغ',
      '500 گرم گردوی چرخ شده',
      '1 پیمانه رب انار',
      '2-3 قاشق شکر',
      '1 عدد پیاز متوسط',
      'زردچوبه، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '1kg chicken',
      '500g ground walnuts',
      '1 cup pomegranate molasses',
      '2-3 tablespoons sugar',
      '1 medium onion',
      'Turmeric, salt, and pepper to taste'
    ],
    instructionsFa: 'پیاز را خرد کرده و با کمی روغن تفت دهید. مرغ را اضافه کرده و تفت دهید تا رنگ آن تغییر کند. زردچوبه، نمک و فلفل را اضافه کنید. گردوی چرخ شده را به مواد اضافه کنید و کمی تفت دهید. رب انار را اضافه کرده و با حدود 4 پیمانه آب به مدت 2-3 ساعت با حرارت ملایم بپزید. در اواخر پخت، شکر را اضافه کنید.',
    instructionsEn: 'Chop the onion and sauté in oil. Add the chicken and fry until the color changes. Add turmeric, salt, and pepper. Add the ground walnuts and sauté briefly. Add the pomegranate molasses and about 4 cups of water, then cook on low heat for 2-3 hours. Add sugar towards the end of cooking.',
    category: 'main',
    region: 'شمال ایران'
  },
  {
    id: 'kabab-koobideh',
    nameFa: 'کباب کوبیده',
    nameEn: 'Kabab Koobideh (Ground Meat Kabab)',
    servings: 4,
    preparationTime: '30 دقیقه',
    cookingTime: '15 دقیقه',
    ingredientsFa: [
      '1 کیلو گوشت گوسفند چرخ کرده',
      '2 عدد پیاز بزرگ',
      '1 قاشق غذاخوری زعفران دم کرده',
      'نمک و فلفل سیاه به مقدار لازم'
    ],
    ingredientsEn: [
      '1kg ground lamb',
      '2 large onions',
      '1 tablespoon bloomed saffron',
      'Salt and black pepper to taste'
    ],
    instructionsFa: 'پیازها را رنده کنید و آب آن را بگیرید. پیاز رنده شده را با گوشت چرخ کرده، زعفران، نمک و فلفل مخلوط کنید و خوب ورز دهید. مواد را حدود 2 ساعت در یخچال استراحت دهید. سپس گوشت را به سیخ بکشید و روی زغال یا در فر با حرارت بالا کباب کنید.',
    instructionsEn: 'Grate the onions and squeeze out the juice. Mix the grated onion with ground meat, saffron, salt, and pepper and knead well. Let the mixture rest in the refrigerator for about 2 hours. Then skewer the meat and grill over charcoal or bake in a high-temperature oven.',
    category: 'main'
  },
  {
    id: 'tahchin',
    nameFa: 'ته‌چین مرغ',
    nameEn: 'Tahchin (Layered Saffron Rice with Chicken)',
    servings: 6,
    preparationTime: '45 دقیقه',
    cookingTime: '1 ساعت و 30 دقیقه',
    ingredientsFa: [
      '3 پیمانه برنج ایرانی',
      '500 گرم سینه مرغ',
      '3 عدد زرده تخم‌مرغ',
      '1 پیمانه ماست چکیده',
      '1 قاشق غذاخوری زعفران دم کرده',
      '100 گرم زرشک',
      'روغن، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '3 cups Iranian rice',
      '500g chicken breast',
      '3 egg yolks',
      '1 cup strained yogurt',
      '1 tablespoon bloomed saffron',
      '100g barberries',
      'Oil, salt, and pepper to taste'
    ],
    instructionsFa: 'مرغ را با پیاز و ادویه بپزید و ریش ریش کنید. برنج را آبکش کنید. زرده‌ها را با ماست، زعفران، نمک و کمی روغن مخلوط کنید. نیمی از برنج را با مخلوط ماست ترکیب کنید. در قابلمه روغن بریزید، مخلوط برنج و ماست را کف قابلمه بریزید، سپس لایه مرغ و در نهایت بقیه برنج را اضافه کنید. با حرارت کم حدود 1 ساعت بپزید.',
    instructionsEn: 'Cook the chicken with onion and spices, then shred it. Parboil and drain the rice. Mix egg yolks with yogurt, saffron, salt, and some oil. Combine half of the rice with the yogurt mixture. Pour oil in a pot, add the rice-yogurt mixture at the bottom, then a layer of chicken, and finally the remaining rice. Cook on low heat for about 1 hour.',
    category: 'rice'
  },
  {
    id: 'baghali-polo',
    nameFa: 'باقالی پلو با گوشت',
    nameEn: 'Baghali Polo (Dill and Fava Bean Rice with Lamb)',
    servings: 4,
    preparationTime: '30 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '3 پیمانه برنج ایرانی',
      '500 گرم گوشت گوسفند',
      '2 پیمانه باقالی تازه یا منجمد',
      '1 دسته شوید خرد شده',
      '1 عدد پیاز متوسط',
      'زردچوبه، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '3 cups Iranian rice',
      '500g lamb meat',
      '2 cups fresh or frozen fava beans',
      '1 bunch chopped dill',
      '1 medium onion',
      'Turmeric, salt, and pepper to taste'
    ],
    instructionsFa: 'گوشت را با پیاز، زردچوبه، نمک و فلفل بپزید. برنج را آبکش کنید و با باقالی و شوید مخلوط کنید. برنج را به روش دم کردن ایرانی با کمی روغن بپزید. گوشت پخته را روی برنج سرو کنید.',
    instructionsEn: 'Cook the meat with onion, turmeric, salt, and pepper. Parboil and drain the rice, then mix with fava beans and dill. Cook the rice using the Persian steaming method with some oil. Serve the cooked meat over the rice.',
    category: 'rice'
  },
  {
    id: 'mirza-ghasemi',
    nameFa: 'میرزا قاسمی',
    nameEn: 'Mirza Ghasemi (Smokey Eggplant Dish)',
    servings: 4,
    preparationTime: '20 دقیقه',
    cookingTime: '40 دقیقه',
    ingredientsFa: [
      '4 عدد بادمجان بزرگ',
      '6 عدد گوجه فرنگی',
      '4 عدد تخم مرغ',
      '6 حبه سیر',
      'روغن زیتون، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '4 large eggplants',
      '6 tomatoes',
      '4 eggs',
      '6 garlic cloves',
      'Olive oil, salt, and pepper to taste'
    ],
    instructionsFa: 'بادمجان‌ها را روی شعله یا در فر کباب کنید تا پوستشان سیاه شود. پوست آن‌ها را جدا کنید و گوشت بادمجان را له کنید. سیرها را له کنید و در روغن تفت دهید. گوجه‌فرنگی‌ها را پوست کنده و خرد کنید و به سیر اضافه کنید و بپزید تا آب آن تبخیر شود. بادمجان له شده را اضافه کنید و خوب هم بزنید. تخم مرغ‌ها را اضافه کنید و هم بزنید تا بسته شود.',
    instructionsEn: 'Roast the eggplants over an open flame or in the oven until the skin blackens. Peel them and mash the flesh. Mash the garlic and sauté in oil. Peel and chop the tomatoes, add to the garlic, and cook until the liquid evaporates. Add the mashed eggplant and stir well. Add the eggs and stir until set.',
    category: 'appetizer',
    region: 'شمال ایران (گیلان)'
  },
  {
    id: 'ash-reshteh',
    nameFa: 'آش رشته',
    nameEn: 'Ash Reshteh (Persian Noodle Soup)',
    servings: 6,
    preparationTime: '40 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '200 گرم رشته آش',
      '1 پیمانه نخود',
      '1 پیمانه لوبیا سفید',
      '1 پیمانه عدس',
      '1 کیلو سبزی آش (تره، جعفری، اسفناج، شوید)',
      '2 عدد پیاز',
      '5 حبه سیر',
      '2 قاشق غذاخوری نعناع خشک',
      'کشک، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '200g Reshteh noodles',
      '1 cup chickpeas',
      '1 cup white beans',
      '1 cup lentils',
      '1kg herbs (leeks, parsley, spinach, dill)',
      '2 onions',
      '5 garlic cloves',
      '2 tablespoons dried mint',
      'Kashk (whey), salt, and pepper to taste'
    ],
    instructionsFa: 'حبوبات را از شب قبل خیس کنید. پیاز را خرد کنید و در روغن تفت دهید تا طلایی شود. حبوبات را با آب کافی بپزید. سبزی خرد شده را اضافه کنید و بگذارید مدتی بپزد. رشته آش را اضافه کنید و 15 دقیقه دیگر بپزید. در آخر با پیاز داغ، سیر داغ، نعناع داغ و کشک تزیین کنید.',
    instructionsEn: 'Soak the legumes overnight. Chop the onions and sauté until golden. Cook the legumes in sufficient water. Add the chopped herbs and let cook for some time. Add the noodles and cook for another 15 minutes. Garnish with fried onions, fried garlic, fried mint, and kashk.',
    category: 'main'
  },
  {
    id: 'khoresh-bademjan',
    nameFa: 'خورش بادمجان',
    nameEn: 'Khoresh Bademjan (Eggplant Stew)',
    servings: 4,
    preparationTime: '30 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '500 گرم گوشت گوساله یا گوسفند',
      '4 عدد بادمجان متوسط',
      '4 عدد گوجه فرنگی متوسط',
      '1 عدد پیاز بزرگ',
      '2 قاشق غذاخوری رب گوجه فرنگی',
      'زردچوبه، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '500g beef or lamb',
      '4 medium eggplants',
      '4 medium tomatoes',
      '1 large onion',
      '2 tablespoons tomato paste',
      'Turmeric, salt, and pepper to taste'
    ],
    instructionsFa: 'بادمجان‌ها را پوست بکنید و به صورت طولی برش بزنید و در روغن سرخ کنید. پیاز را خرد کنید و با کمی روغن تفت دهید تا طلایی شود. گوشت را اضافه کنید و تفت دهید. زردچوبه، نمک و فلفل را اضافه کنید. رب گوجه را اضافه کنید و کمی تفت دهید. گوجه‌ها را خرد کنید و به همراه آب کافی اضافه کنید. بگذارید گوشت بپزد سپس بادمجان‌های سرخ شده را اضافه کنید و حدود 30 دقیقه دیگر بپزید.',
    instructionsEn: 'Peel the eggplants, cut them lengthwise, and fry them. Chop the onion and sauté until golden. Add the meat and fry. Add turmeric, salt, and pepper. Add tomato paste and sauté briefly. Chop the tomatoes and add them with sufficient water. Let the meat cook, then add the fried eggplants and cook for another 30 minutes.',
    category: 'main'
  },
  {
    id: 'sholeh-zard',
    nameFa: 'شله زرد',
    nameEn: 'Sholeh Zard (Saffron Rice Pudding)',
    servings: 8,
    preparationTime: '15 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '2 پیمانه برنج',
      '12 پیمانه آب',
      '2 پیمانه شکر',
      '1/2 پیمانه گلاب',
      '100 گرم خلال بادام',
      '2 قاشق غذاخوری زعفران دم کرده',
      '1 قاشق غذاخوری پودر هل',
      '1 قاشق غذاخوری روغن'
    ],
    ingredientsEn: [
      '2 cups rice',
      '12 cups water',
      '2 cups sugar',
      '1/2 cup rosewater',
      '100g slivered almonds',
      '2 tablespoons bloomed saffron',
      '1 tablespoon cardamom powder',
      '1 tablespoon oil'
    ],
    instructionsFa: 'برنج را چندین بار بشویید و با آب به مدت 2 ساعت روی حرارت ملایم بپزید تا کاملاً له شود. شکر را اضافه کنید و 30 دقیقه دیگر بپزید. سپس زعفران، گلاب، پودر هل و روغن را اضافه کنید و 15 دقیقه دیگر بپزید. در ظرف مورد نظر بریزید و با خلال بادام، دارچین و پسته تزیین کنید.',
    instructionsEn: 'Wash the rice several times and cook with water on low heat for 2 hours until completely soft. Add sugar and cook for another 30 minutes. Then add saffron, rosewater, cardamom powder, and oil, and cook for 15 more minutes. Pour into serving dishes and garnish with slivered almonds, cinnamon, and pistachios.',
    category: 'dessert'
  },
  {
    id: 'zereshk-polo',
    nameFa: 'زرشک پلو با مرغ',
    nameEn: 'Zereshk Polo (Barberry Rice with Chicken)',
    servings: 4,
    preparationTime: '30 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '3 پیمانه برنج ایرانی',
      '1 کیلو مرغ (ران یا سینه)',
      '2 عدد پیاز',
      '200 گرم زرشک',
      '4 قاشق غذاخوری شکر',
      '100 گرم کره',
      '1 قاشق غذاخوری زعفران دم کرده',
      'نمک، فلفل و زردچوبه به مقدار لازم'
    ],
    ingredientsEn: [
      '3 cups Iranian rice',
      '1kg chicken (thighs or breasts)',
      '2 onions',
      '200g barberries',
      '4 tablespoons sugar',
      '100g butter',
      '1 tablespoon bloomed saffron',
      'Salt, pepper, and turmeric to taste'
    ],
    instructionsFa: 'مرغ را با یک عدد پیاز، نمک، فلفل و زردچوبه بپزید. برنج را آبکش کنید و به روش دم کردن ایرانی با کمی روغن و کره بپزید. زرشک را با کمی آب بشویید و با کمی کره و شکر تفت دهید. برنج را در دیس بکشید، روی آن زعفران بریزید و با زرشک و مرغ تزیین کنید.',
    instructionsEn: 'Cook the chicken with one onion, salt, pepper, and turmeric. Parboil and drain the rice, then cook using the Persian steaming method with some oil and butter. Wash the barberries and sauté with some butter and sugar. Serve the rice on a plate, drizzle with saffron, and garnish with barberries and chicken.',
    category: 'rice'
  },
  {
    id: 'ranginak',
    nameFa: 'رنگینک',
    nameEn: 'Ranginak (Date and Walnut Dessert)',
    servings: 6,
    preparationTime: '20 دقیقه',
    cookingTime: '10 دقیقه',
    ingredientsFa: [
      '500 گرم خرما',
      '200 گرم آرد گندم',
      '200 گرم کره',
      '200 گرم گردوی خرد شده',
      '1 قاشق غذاخوری پودر دارچین',
      '1 قاشق غذاخوری پودر هل',
      'پودر پسته برای تزیین'
    ],
    ingredientsEn: [
      '500g dates',
      '200g wheat flour',
      '200g butter',
      '200g chopped walnuts',
      '1 tablespoon cinnamon powder',
      '1 tablespoon cardamom powder',
      'Pistachios for garnish'
    ],
    instructionsFa: 'هسته خرماها را خارج کنید. آرد را در ماهیتابه با کره تفت دهید تا طلایی و بوی خامی آن گرفته شود. گردوها را داخل خرماها بگذارید. نیمی از مخلوط آرد را کف ظرف بریزید، خرماهای شکم‌پر را روی آن بچینید و باقی آرد را روی آن بپاشید. با پودر دارچین، هل و پسته تزیین کنید.',
    instructionsEn: 'Remove the pits from the dates. Sauté the flour with butter until golden and raw smell is gone. Place walnuts inside the dates. Spread half of the flour mixture at the bottom of a dish, arrange the stuffed dates on top, and sprinkle the remaining flour. Garnish with cinnamon, cardamom, and pistachios.',
    category: 'dessert',
    region: 'جنوب ایران'
  },
  {
    id: 'kashke-bademjan',
    nameFa: 'کشک بادمجان',
    nameEn: 'Kashke Bademjan (Eggplant and Whey Dip)',
    servings: 4,
    preparationTime: '20 دقیقه',
    cookingTime: '40 دقیقه',
    ingredientsFa: [
      '4 عدد بادمجان متوسط',
      '1 عدد پیاز بزرگ',
      '4 حبه سیر',
      '200 گرم کشک',
      '2 قاشق غذاخوری نعناع خشک',
      'روغن زیتون، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '4 medium eggplants',
      '1 large onion',
      '4 garlic cloves',
      '200g kashk (whey)',
      '2 tablespoons dried mint',
      'Olive oil, salt, and pepper to taste'
    ],
    instructionsFa: 'بادمجان‌ها را پوست بکنید، به قطعات کوچک خرد کنید و در روغن سرخ کنید یا در فر بپزید. پیاز را خرد کنید و در روغن تفت دهید تا طلایی شود. سیر را له کنید و به پیاز اضافه کنید. بادمجان‌ها را اضافه کنید و خوب مخلوط کنید. کشک را اضافه کنید و خوب هم بزنید. با نعناع داغ، سیر داغ و پیاز داغ تزیین کنید.',
    instructionsEn: 'Peel the eggplants, cut them into small pieces, and fry in oil or bake in the oven. Chop the onion and sauté in oil until golden. Mash the garlic and add to the onion. Add the eggplants and mix well. Add the kashk and stir well. Garnish with fried mint, fried garlic, and fried onions.',
    category: 'appetizer'
  },
  {
    id: 'sabzi-polo-mahi',
    nameFa: 'سبزی پلو با ماهی',
    nameEn: 'Sabzi Polo ba Mahi (Herb Rice with Fish)',
    servings: 4,
    preparationTime: '30 دقیقه',
    cookingTime: '1 ساعت',
    ingredientsFa: [
      '3 پیمانه برنج ایرانی',
      '1 کیلو ماهی قزل‌آلا یا سفید',
      '2 دسته سبزی پلویی (شوید، تره، جعفری، گشنیز)',
      '2 عدد لیمو ترش',
      'آرد گندم، زردچوبه، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '3 cups Iranian rice',
      '1kg trout or white fish',
      '2 bunches of herbs (dill, leeks, parsley, coriander)',
      '2 lemons',
      'Wheat flour, turmeric, salt, and pepper to taste'
    ],
    instructionsFa: 'ماهی را تمیز کنید، با آبلیمو، نمک و فلفل مزه‌دار کنید، در آرد بغلتانید و در روغن داغ سرخ کنید. سبزی‌ها را خرد کنید. برنج را آبکش کنید و با سبزی مخلوط کنید. به روش دم کردن ایرانی با کمی روغن بپزید. برنج را در دیس بکشید و همراه با ماهی سرخ شده و لیموترش سرو کنید.',
    instructionsEn: 'Clean the fish, season with lemon juice, salt, and pepper, coat with flour, and fry in hot oil. Chop the herbs. Parboil and drain the rice, then mix with the herbs. Cook using the Persian steaming method with some oil. Serve the rice on a plate with the fried fish and lemon.',
    category: 'rice',
    region: 'شمال ایران'
  },
  {
    id: 'abgoosht',
    nameFa: 'آبگوشت',
    nameEn: 'Abgoosht (Persian Lamb and Chickpea Stew)',
    servings: 6,
    preparationTime: '30 دقیقه',
    cookingTime: '3 ساعت',
    ingredientsFa: [
      '1 کیلو گوشت گوسفند با استخوان',
      '2 عدد پیاز متوسط',
      '1 پیمانه نخود',
      '1 پیمانه لوبیا سفید',
      '4 عدد گوجه فرنگی',
      '2 عدد سیب زمینی',
      '2 قاشق غذاخوری رب گوجه فرنگی',
      'زردچوبه، نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '1kg lamb with bone',
      '2 medium onions',
      '1 cup chickpeas',
      '1 cup white beans',
      '4 tomatoes',
      '2 potatoes',
      '2 tablespoons tomato paste',
      'Turmeric, salt, and pepper to taste'
    ],
    instructionsFa: 'نخود و لوبیا را از شب قبل خیس کنید. گوشت، پیاز، نخود و لوبیا را در یک قابلمه با آب کافی بپزید. رب گوجه، زردچوبه، نمک و فلفل را اضافه کنید. گوجه‌فرنگی‌ها و سیب زمینی‌ها را خرد کنید و به مواد اضافه کنید. حدود 3 ساعت با حرارت ملایم بپزید. سپس آبگوشت را در کاسه بریزید و با نان تلیت کرده سرو کنید.',
    instructionsEn: 'Soak the chickpeas and beans overnight. Cook the meat, onion, chickpeas, and beans in a pot with sufficient water. Add tomato paste, turmeric, salt, and pepper. Chop the tomatoes and potatoes and add to the mixture. Cook on low heat for about 3 hours. Then pour the stew into a bowl and serve with bread.',
    category: 'main'
  },
  {
    id: 'morasa-polo',
    nameFa: 'مرصع پلو',
    nameEn: 'Morasa Polo (Jeweled Rice)',
    servings: 6,
    preparationTime: '45 دقیقه',
    cookingTime: '1 ساعت و 30 دقیقه',
    ingredientsFa: [
      '3 پیمانه برنج ایرانی',
      '200 گرم زرشک',
      '200 گرم پسته و بادام خلال شده',
      '200 گرم خلال پرتقال',
      '1 عدد هویج بزرگ',
      '2 قاشق غذاخوری شکر',
      '1 قاشق غذاخوری زعفران دم کرده',
      '100 گرم کره',
      'نمک به مقدار لازم'
    ],
    ingredientsEn: [
      '3 cups Iranian rice',
      '200g barberries',
      '200g slivered pistachios and almonds',
      '200g orange peel strips',
      '1 large carrot',
      '2 tablespoons sugar',
      '1 tablespoon bloomed saffron',
      '100g butter',
      'Salt to taste'
    ],
    instructionsFa: 'برنج را آبکش کنید. زرشک را با کمی کره و شکر تفت دهید. هویج را خلال کنید و در آب و شکر بپزید. خلال پرتقال را در آب و شکر بپزید. بخشی از برنج را با زعفران مخلوط کنید. برنج را به روش دم کردن ایرانی با کمی روغن و کره بپزید. هنگام سرو برنج را با لایه‌های زرشک، هویج، خلال پرتقال و آجیل تزیین کنید.',
    instructionsEn: 'Parboil and drain the rice. Sauté the barberries with some butter and sugar. Cut the carrot into strips and cook in water and sugar. Cook the orange peel strips in water and sugar. Mix some of the rice with saffron. Cook the rice using the Persian steaming method with some oil and butter. When serving, garnish the rice with layers of barberries, carrots, orange peel strips, and nuts.',
    category: 'rice'
  },
  {
    id: 'halva',
    nameFa: 'حلوا',
    nameEn: 'Halva (Flour and Saffron Sweet)',
    servings: 8,
    preparationTime: '5 دقیقه',
    cookingTime: '25 دقیقه',
    ingredientsFa: [
      '2 پیمانه آرد گندم',
      '1.5 پیمانه شکر',
      '200 گرم روغن یا کره',
      '1 پیمانه آب',
      '1 قاشق غذاخوری گلاب',
      '1 قاشق غذاخوری زعفران دم کرده',
      '50 گرم خلال بادام یا پسته برای تزیین'
    ],
    ingredientsEn: [
      '2 cups wheat flour',
      '1.5 cups sugar',
      '200g oil or butter',
      '1 cup water',
      '1 tablespoon rosewater',
      '1 tablespoon bloomed saffron',
      '50g slivered almonds or pistachios for garnish'
    ],
    instructionsFa: 'آرد را در روغن یا کره آب شده تفت دهید تا طلایی شود و بوی خامی آن گرفته شود. در یک قابلمه دیگر، آب و شکر را بجوشانید تا شربت غلیظی درست شود. شربت را به آرد اضافه کنید و مرتب هم بزنید. زعفران و گلاب را اضافه کنید و خوب مخلوط کنید. حلوا را در ظرف مورد نظر بکشید و با خلال بادام یا پسته تزیین کنید.',
    instructionsEn: 'Sauté the flour in melted oil or butter until golden and the raw smell is gone. In another pot, boil water and sugar to make a thick syrup. Add the syrup to the flour and stir constantly. Add saffron and rosewater and mix well. Pour the halva into a serving dish and garnish with slivered almonds or pistachios.',
    category: 'dessert'
  },
  {
    id: 'kuku-sibzamini',
    nameFa: 'کوکو سیب زمینی',
    nameEn: 'Kuku Sibzamini (Potato Frittata)',
    servings: 4,
    preparationTime: '20 دقیقه',
    cookingTime: '30 دقیقه',
    ingredientsFa: [
      '5 عدد سیب زمینی متوسط',
      '4 عدد تخم مرغ',
      '1 عدد پیاز متوسط',
      '2 قاشق غذاخوری آرد',
      '1 قاشق چایخوری زردچوبه',
      'نمک و فلفل به مقدار لازم',
      'روغن برای سرخ کردن'
    ],
    ingredientsEn: [
      '5 medium potatoes',
      '4 eggs',
      '1 medium onion',
      '2 tablespoons flour',
      '1 teaspoon turmeric',
      'Salt and pepper to taste',
      'Oil for frying'
    ],
    instructionsFa: 'سیب زمینی‌ها را بپزید و له کنید. پیاز را رنده کنید. تخم مرغ‌ها را بزنید و با سیب زمینی، پیاز، آرد، زردچوبه، نمک و فلفل مخلوط کنید. در یک ماهیتابه روغن بریزید و مخلوط را در آن بریزید. با حرارت ملایم بپزید تا یک طرف آن طلایی شود، سپس آن را برگردانید و طرف دیگر را نیز بپزید.',
    instructionsEn: 'Boil and mash the potatoes. Grate the onion. Beat the eggs and mix with potatoes, onion, flour, turmeric, salt, and pepper. Pour oil into a pan and add the mixture. Cook on low heat until one side turns golden, then flip and cook the other side.',
    category: 'appetizer'
  },
  {
    id: 'mast-o-khiar',
    nameFa: 'ماست و خیار',
    nameEn: 'Mast-o-Khiar (Yogurt and Cucumber Dip)',
    servings: 4,
    preparationTime: '15 دقیقه',
    cookingTime: '0 دقیقه',
    ingredientsFa: [
      '500 گرم ماست چکیده',
      '2 عدد خیار متوسط',
      '2 حبه سیر',
      '1 قاشق غذاخوری نعناع خشک',
      '1 قاشق غذاخوری گردو خرد شده',
      'نمک به مقدار لازم'
    ],
    ingredientsEn: [
      '500g strained yogurt',
      '2 medium cucumbers',
      '2 garlic cloves',
      '1 tablespoon dried mint',
      '1 tablespoon chopped walnuts',
      'Salt to taste'
    ],
    instructionsFa: 'خیارها را پوست بکنید و ریز خرد کنید یا رنده کنید. سیر را له کنید. خیار، سیر، نعناع و نمک را به ماست اضافه کنید و خوب مخلوط کنید. در ظرف مورد نظر بریزید و با گردو و کمی نعناع خشک تزیین کنید.',
    instructionsEn: 'Peel and finely chop or grate the cucumbers. Mash the garlic. Add cucumber, garlic, mint, and salt to the yogurt and mix well. Pour into a serving dish and garnish with walnuts and some dried mint.',
    category: 'appetizer'
  },
  {
    id: 'baghlava',
    nameFa: 'باقلوا',
    nameEn: 'Baklava',
    servings: 20,
    preparationTime: '30 دقیقه',
    cookingTime: '45 دقیقه',
    ingredientsFa: [
      '1 بسته خمیر یوفکا یا فیلو',
      '300 گرم کره آب شده',
      '300 گرم پسته یا بادام خرد شده',
      '100 گرم گردوی خرد شده',
      '2 پیمانه شکر',
      '1 پیمانه آب',
      '2 قاشق غذاخوری آبلیمو',
      '2 قاشق غذاخوری گلاب'
    ],
    ingredientsEn: [
      '1 pack phyllo dough',
      '300g melted butter',
      '300g chopped pistachios or almonds',
      '100g chopped walnuts',
      '2 cups sugar',
      '1 cup water',
      '2 tablespoons lemon juice',
      '2 tablespoons rosewater'
    ],
    instructionsFa: 'آجیل‌ها را با کمی شکر مخلوط کنید. کف قالب را با کره چرب کنید. لایه‌ای از خمیر بگذارید و روی آن کره بمالید. این کار را با 5-6 لایه تکرار کنید. مقداری آجیل روی آن بریزید. دوباره 5-6 لایه خمیر با کره قرار دهید. به همین ترتیب ادامه دهید تا مواد تمام شود. باقلوا را برش بزنید و در فر با دمای 180 درجه سانتیگراد به مدت 45 دقیقه بپزید. شربت را با جوشاندن آب، شکر، آبلیمو و گلاب درست کنید و روی باقلوای داغ بریزید.',
    instructionsEn: 'Mix the nuts with some sugar. Grease the bottom of a pan with butter. Place a layer of dough and brush with butter. Repeat with 5-6 layers. Sprinkle some nuts over it. Again place 5-6 layers of dough with butter. Continue in this manner until all ingredients are used. Cut the baklava and bake in a preheated oven at 180°C for 45 minutes. Make the syrup by boiling water, sugar, lemon juice, and rosewater, and pour over the hot baklava.',
    category: 'dessert'
  },
  {
    id: 'koofteh-tabrizi',
    nameFa: 'کوفته تبریزی',
    nameEn: 'Koofteh Tabrizi (Tabriz Meatballs)',
    servings: 6,
    preparationTime: '45 دقیقه',
    cookingTime: '2 ساعت',
    ingredientsFa: [
      '500 گرم گوشت چرخ کرده',
      '1 پیمانه برنج',
      '1 عدد پیاز بزرگ',
      '1/2 پیمانه سبزی معطر (شوید، تره، جعفری)',
      '100 گرم آلو بخارا',
      '100 گرم زرشک',
      '100 گرم گردوی خرد شده',
      '2 عدد تخم مرغ آب پز',
      '1 قاشق غذاخوری زردچوبه',
      'نمک و فلفل به مقدار لازم'
    ],
    ingredientsEn: [
      '500g ground meat',
      '1 cup rice',
      '1 large onion',
      '1/2 cup herbs (dill, leeks, parsley)',
      '100g dried plums',
      '100g barberries',
      '100g chopped walnuts',
      '2 hard-boiled eggs',
      '1 tablespoon turmeric',
      'Salt and pepper to taste'
    ],
    instructionsFa: 'برنج را بشویید و به مدت 2 ساعت خیس کنید. پیاز را رنده کنید. برنج، گوشت چرخ کرده، پیاز، سبزی معطر، زردچوبه، نمک و فلفل را مخلوط کنید و خوب ورز دهید. مقداری از مخلوط را کف دست پهن کنید، تخم مرغ آب پز، آلو بخارا، زرشک و گردو را داخل آن قرار دهید و به شکل توپ بزرگی درآورید. در قابلمه‌ای آب، پیاز، زردچوبه و کمی رب گوجه فرنگی بریزید و بگذارید به جوش بیاید. کوفته‌ها را داخل آن بیندازید و با حرارت ملایم 1.5 تا 2 ساعت بپزید.',
    instructionsEn: 'Wash and soak the rice for 2 hours. Grate the onion. Mix rice, ground meat, onion, herbs, turmeric, salt, and pepper and knead well. Flatten some of the mixture in your palm, place the hard-boiled eggs, dried plums, barberries, and walnuts inside, and form into a large ball. In a pot, bring water, onion, turmeric, and some tomato paste to a boil. Add the meatballs and cook on low heat for 1.5 to 2 hours.',
    category: 'main',
    region: 'آذربایجان (تبریز)'
  }
];

const PersianCuisine = () => {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<'main' | 'rice' | 'dessert' | 'appetizer'>('main');
  
  const toggleRecipe = (id: string) => {
    setExpandedRecipe(expandedRecipe === id ? null : id);
  };

  const filteredRecipes = recipes.filter(recipe => recipe.category === currentCategory);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">آشپزی ایرانی</h1>
        <p className="text-gray-600 text-sm">دستور پخت غذاهای سنتی و معروف ایرانی</p>
      </div>
      
      <Tabs defaultValue="main" className="mb-6" onValueChange={(value) => setCurrentCategory(value as any)}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="main" className="text-sm">غذاهای اصلی</TabsTrigger>
          <TabsTrigger value="rice" className="text-sm">پلوها</TabsTrigger>
          <TabsTrigger value="appetizer" className="text-sm">پیش غذاها</TabsTrigger>
          <TabsTrigger value="dessert" className="text-sm">دسرها</TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentCategory}>
          <div className="grid grid-cols-1 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden border border-gray-200 neo-glass transition-all hover:shadow-md">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{recipe.nameFa}</h3>
                      <p className="text-gray-500 text-sm">{recipe.nameEn}</p>
                      <div className="flex items-center mt-2 gap-4">
                        <div className="flex items-center">
                          <Users size={16} className="ml-1 text-gray-600" />
                          <span className="text-xs text-gray-600">{recipe.servings} نفر</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          <span>زمان آماده‌سازی: {recipe.preparationTime}</span>
                          <span className="mx-1">•</span>
                          <span>زمان پخت: {recipe.cookingTime}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleRecipe(recipe.id)}
                      className="text-xs"
                    >
                      {expandedRecipe === recipe.id ? (
                        <>
                          <ChevronUp className="ml-1" size={14} />
                          بستن
                        </>
                      ) : (
                        <>
                          <ChevronDown className="ml-1" size={14} />
                          نمایش دستور
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                
                <Collapsible open={expandedRecipe === recipe.id} className="transition-all duration-300">
                  <CollapsibleContent>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Persian Recipe Info */}
                        <div className="bg-white/50 p-4 rounded-xl shadow-sm border border-gray-100">
                          <h4 className="font-bold text-gray-800 mb-3">مواد لازم:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
                            {recipe.ingredientsFa.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                          <h4 className="font-bold text-gray-800 mb-2">طرز تهیه:</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{recipe.instructionsFa}</p>
                        </div>
                        
                        {/* English Recipe Info */}
                        <div className="bg-white/50 p-4 rounded-xl shadow-sm border border-gray-100">
                          <h4 className="font-bold text-gray-800 mb-3 text-left">Ingredients:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1 text-left">
                            {recipe.ingredientsEn.map((ingredient, idx) => (
                              <li key={idx}>{ingredient}</li>
                            ))}
                          </ul>
                          <h4 className="font-bold text-gray-800 mb-2 text-left">Instructions:</h4>
                          <p className="text-sm text-gray-600 leading-relaxed text-left">{recipe.instructionsEn}</p>
                        </div>
                      </div>
                      
                      {recipe.region && (
                        <div className="mt-4 text-xs text-gray-500">
                          <strong>منطقه:</strong> {recipe.region}
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersianCuisine;
