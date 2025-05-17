
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, ChevronDown, ChevronUp, Clock, MapPin, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Season = 'spring' | 'summer' | 'autumn' | 'winter';
type Celebration = {
  id: string;
  name: string;
  date: string;
  description: string;
  history: string;
  location?: string;
  rituals?: string[];
  season: Season;
  timeOfDay?: string;
};

const celebrations: Celebration[] = [
  {
    id: "nowruz",
    name: "نوروز",
    date: "۱ فروردین (۲۱ مارس)",
    description: "جشن باستانی آغاز سال نو و بهار که با آیین‌هایی چون خانه‌تکانی، سفره هفت‌سین، دید و بازدید و سیزده به در همراه است. نوروز آغاز سال نو در تقویم شمسی است.",
    history: "نوروز با قدمتی بیش از ۳۰۰۰ سال، یکی از قدیمی‌ترین جشن‌های به یادگار مانده از دوران باستان است. این جشن در زمان هخامنشیان، ساسانیان و پس از اسلام همواره گرامی داشته شده است. در سال ۲۰۱۰ مجمع عمومی سازمان ملل متحد، ۲۱ مارس را به عنوان روز جهانی نوروز به رسمیت شناخت.",
    rituals: ["خانه تکانی", "چیدن سفره هفت‌سین", "تحویل سال", "دید و بازدید", "سیزده به در"],
    season: "spring"
  },
  {
    id: "chaharshanbe-suri",
    name: "چهارشنبه‌سوری",
    date: "آخرین سه‌شنبه سال (قبل از نوروز)",
    description: "جشن آتش که در شب آخرین سه‌شنبه سال برگزار می‌شود و مردم با پریدن از روی آتش، سرخی آتش را به خود و زردی خود را به آتش می‌دهند.",
    history: "چهارشنبه‌سوری از جشن‌های باستانی ایرانیان است که پیشینه آن به آیین‌های زرتشتی و جشن‌های سده می‌رسد. این مراسم نمادی از پاکسازی و دور کردن ناپاکی‌ها و استقبال از نو شدن سال است.",
    rituals: ["روشن کردن آتش", "پریدن از روی آتش", "قاشق‌زنی", "فال گوش ایستادن", "خوردن آجیل چهارشنبه‌سوری"],
    season: "winter",
    timeOfDay: "شب"
  },
  {
    id: "yalda",
    name: "شب یلدا",
    date: "۳۰ آذر (۲۱ دسامبر)",
    description: "طولانی‌ترین شب سال که ایرانیان با دورهمی خانوادگی، خوردن هندوانه و انار، خواندن شعر و حافظ‌خوانی جشن می‌گیرند.",
    history: "یلدا یا چله، جشن زایش مهر (خورشید) و بزرگداشت پیروزی روشنایی بر تاریکی است. این جشن از دوران باستان به یادگار مانده و در فرهنگ زرتشتی اهمیت ویژه‌ای داشته است. یلدا در واقع فاصله زمانی میان غروب آفتاب تا طلوع آفتاب در اول زمستان است که طولانی‌ترین شب سال است.",
    rituals: ["دورهمی خانوادگی", "خوردن هندوانه و انار", "خواندن شاهنامه و دیوان حافظ", "قصه‌گویی بزرگان", "خوردن آجیل و میوه‌های خشک"],
    season: "autumn",
    timeOfDay: "شب"
  },
  {
    id: "sizdah-bedar",
    name: "سیزده به در",
    date: "۱۳ فروردین",
    description: "روز طبیعت که مردم به دامان طبیعت می‌روند و با تفریح و گردش، سال نو را جشن می‌گیرند. این روز آخرین روز از تعطیلات نوروزی است.",
    history: "سیزده به در از آیین‌های کهن ایرانی است که در آن مردم با رفتن به دامان طبیعت و فضای سبز، سیزدهمین روز سال را به شادی می‌گذرانند. در باورهای کهن، عدد سیزده نحس پنداشته می‌شد و ایرانیان با بیرون رفتن از خانه در این روز، نحسی آن را از خود دور می‌کردند.",
    location: "پارک‌ها، دشت‌ها و طبیعت",
    rituals: ["پیک‌نیک در طبیعت", "گره زدن سبزه", "بازی‌های دسته‌جمعی", "پختن آش و غذاهای سنتی"],
    season: "spring"
  },
  {
    id: "mehregan",
    name: "مهرگان",
    date: "۱۶ مهر (۷-۸ اکتبر)",
    description: "جشن پاییزی ایرانیان باستان که به مناسبت پاسداشت مهر (خورشید) برگزار می‌شود. این جشن از مهم‌ترین جشن‌های ایران باستان بوده است.",
    history: "مهرگان در ایران باستان به اندازه نوروز اهمیت داشت و به عنوان جشن پاییزی در برابر نوروز که جشن بهاری است، برگزار می‌شد. این جشن نماد پیروزی فریدون بر ضحاک و آزادی مردم از ظلم او نیز بوده است. در دوره هخامنشی، جشن مهرگان یکی از بزرگترین جشن‌ها بود و شاهان هخامنشی در این روز جامه ارغوانی می‌پوشیدند و تاج مرصع بر سر می‌گذاشتند.",
    rituals: ["پوشیدن لباس‌های نو", "پختن آش مهرگان", "برپایی آتش", "پاشیدن آب گلاب", "خوردن لوت مهرگان (آجیل مخصوص)"],
    season: "autumn"
  },
  {
    id: "tirgan",
    name: "تیرگان",
    date: "۱۳ تیر (۴ جولای)",
    description: "جشن آب‌پاشان که به مناسبت بارش باران و پایان خشکسالی برگزار می‌شود. این جشن ستاره تیر (تیشتر) را که ایزد باران است، گرامی می‌دارد.",
    history: "تیرگان از کهن‌ترین جشن‌های ایرانی است که پیشینه آن به اسطوره‌های ایران باستان برمی‌گردد. این جشن با اسطوره تیراندازی آرش کمانگیر برای تعیین مرز ایران و توران پیوند خورده است. در برخی روایات، تیرگان را جشن پیروزی بر افراسیاب تورانی نیز می‌دانند که به فرمان او هفت سال در ایران باران نبارید.",
    rituals: ["آب‌پاشی و آب‌بازی", "بستن نوارهای رنگین به نام «تیر و باد» به مچ دست", "خوردن شیرینی‌های مخصوص مانند شله‌زرد", "برگزاری مراسم شکرگزاری برای باران"],
    season: "summer"
  },
  {
    id: "sadeh",
    name: "سده",
    date: "۱۰ بهمن (۳۰ ژانویه)",
    description: "جشن آتش در میانه زمستان که به مناسبت پیروزی گرما بر سرما و روشنایی بر تاریکی برگزار می‌شود. این جشن ۵۰ روز و ۵۰ شب مانده به نوروز برگزار می‌شود.",
    history: "جشن سده یکی از قدیمی‌ترین جشن‌های ایرانی است که به کشف آتش توسط هوشنگ پیشدادی، پادشاه اسطوره‌ای ایران، نسبت داده می‌شود. در کتاب شاهنامه فردوسی آمده است که هوشنگ هنگام پرتاب سنگی به سوی ماری، سنگ به سنگ دیگری برخورد کرد و آتش پدید آمد.",
    rituals: ["افروختن آتش بزرگ", "خواندن سرودهای کهن", "دعا برای از میان رفتن سرما", "خوردن آجیل سده", "پختن نان‌های مخصوص"],
    season: "winter"
  },
  {
    id: "esfandegan",
    name: "اسفندگان (سپندارمذگان)",
    date: "۵ اسفند (۲۴ فوریه)",
    description: "روز بزرگداشت زمین و زنان که در دوران باستان برگزار می‌شده و امروزه نیز در برخی مناطق احیا شده است. این روز به نام سپندارمذ، فرشته نگهبان زمین و بانوی مقدس، نامگذاری شده است.",
    history: "اسفندگان یا سپندارمذگان، جشنی است که در روز پنجم ماه اسفند برگزار می‌شد و به فرشته زمین و زنان تعلق داشت. در این روز، مردان به زنان هدیه می‌دادند و آنان را گرامی می‌داشتند. این جشن یکی از معدود جشن‌های باستانی است که به طور خاص برای بزرگداشت زنان برگزار می‌شده است.",
    rituals: ["اهدای هدایا به زنان", "پاکسازی خانه", "کاشت گل و گیاه", "برگزاری مهمانی"],
    season: "winter"
  },
  {
    id: "jashn-e-abpashi",
    name: "جشن آبپاشان",
    date: "۱۳ اردیبهشت (۳ مه)",
    description: "جشن آبریزان یا آب‌پاشان، آیینی است که در آن مردم به یکدیگر آب می‌پاشند. این جشن در نقاط مختلف ایران با نام‌های متفاوت برگزار می‌شود.",
    history: "جشن آبپاشان ریشه در آیین‌های کهن ایرانی دارد و به بزرگداشت آناهیتا، ایزدبانوی آب‌ها، مربوط می‌شود. این آیین نمادی از پاکسازی و تطهیر و همچنین درخواست باران و برکت برای زمین‌های کشاورزی بوده است.",
    rituals: ["آب پاشیدن به یکدیگر", "دعا و نیایش برای بارش باران", "برگزاری مراسم شادی و پایکوبی"],
    season: "spring"
  },
  {
    id: "farvardingan",
    name: "فروردینگان",
    date: "۱۹ فروردین (۸ آوریل)",
    description: "روز بزرگداشت فروهرها (ارواح درگذشتگان) که در آن مردم به یاد عزیزان خود نیایش می‌کنند و به آرامگاه آنها سر می‌زنند.",
    history: "فروردینگان یکی از جشن‌های باستانی ایران است که در آن، فروهر یا روان درگذشتگان گرامی داشته می‌شود. بنابر باور ایرانیان باستان، در روزهای پایانی سال، ارواح درگذشتگان به خانه‌های خود بازمی‌گردند و تا روز فروردینگان در کنار بازماندگان خود می‌مانند.",
    rituals: ["روشن کردن شمع و آتش", "پختن غذاهای مورد علاقه درگذشتگان", "زیارت آرامگاه‌ها", "خیرات دادن"],
    season: "spring"
  },
  {
    id: "mehranegan",
    name: "مهرآیین (میترا)",
    date: "۲۵ دسامبر (برابر با ۴ دی)",
    description: "جشن تولد میترا یا مهر که در شب یلدا و روزهای پس از آن برگزار می‌شده است. این جشن با زایش دوباره خورشید ارتباط داشته است.",
    history: "مهرآیین یا آیین میتراییسم، یکی از کهن‌ترین آیین‌های ایرانی بوده که در سراسر امپراتوری روم نیز گسترش یافته بود. جشن تولد میترا (خدای نور) در روز ۲۵ دسامبر برگزار می‌شد که بعدها با تولد مسیح در مسیحیت همزمان شد. باور بر این است که میترا از یک صخره متولد شد و نماد پیروزی روشنایی بر تاریکی است.",
    rituals: ["روشن کردن آتش و شمع", "برگزاری ضیافت", "تزیین درخت همیشه سبز", "خوردن نان مقدس"],
    season: "winter"
  },
  {
    id: "jashne-amordadgan",
    name: "جشن امردادگان",
    date: "۷ مرداد (۲۹ جولای)",
    description: "جشن نکوداشت گیاهان و درختان که در روز امرداد از ماه امرداد برگزار می‌شود. امرداد یا امردادg، نام فرشته نگهبان گیاهان در اساطیر ایران باستان است.",
    history: "امردادگان جشنی است که در تقویم زرتشتی در گرامیداشت امشاسپند امرداد، نگهبان گیاهان و نباتات برگزار می‌شود. در این روز، زرتشتیان از خوردن گیاهان خودداری می‌کردند و به کاشت گل و گیاه می‌پرداختند. این جشن نمادی از احترام به طبیعت و حفظ محیط زیست در فرهنگ کهن ایرانی بوده است.",
    rituals: ["کاشت درخت و گل", "استفاده از گیاهان دارویی", "تهیه و توزیع غذاهای گیاهی", "نیایش و سپاسگزاری برای نعمت گیاهان"],
    season: "summer"
  },
  {
    id: "jashne-shahrivargan",
    name: "جشن شهریورگان",
    date: "۴ شهریور (۲۶ اوت)",
    description: "جشن بزرگداشت فلزات و منابع معدنی زمین. شهریور در اوستا به معنای «شهریاری مطلوب» یا «پادشاهی آرمانی» است و نام فرشته نگهبان فلزات است.",
    history: "شهریورگان جشنی است که در روز شهریور از ماه شهریور در تقویم زرتشتی برگزار می‌شود. این جشن به امشاسپند شهریور، نگهبان فلزات، منسوب است و در آن، فلزات و آتش گرامی داشته می‌شوند. در فرهنگ ایران باستان، این روز با آیین‌های ویژه‌ای برای آهنگران و فلزکاران همراه بوده است.",
    rituals: ["آتش‌افروزی", "ساخت زیورآلات", "پاکسازی اشیای فلزی", "نیایش و بزرگداشت صنعتگران"],
    season: "summer"
  },
  {
    id: "jashn-tir-10",
    name: "جشن تیرروز",
    date: "۱۰ تیر (۱ جولای)",
    description: "جشنی در تکریم ایزد تیر یا تیشتر، ایزد باران و ستاره شعرای یمانی. این جشن با درخواست باران و شکرگزاری برای نعمت آب همراه است.",
    history: "تیرروز یکی از جشن‌های کوچک ایران باستان است که در روز تیر از ماه تیر برگزار می‌شود. در این روز، ایزد تیر یا تیشتر که مسئول بارندگی است، گرامی داشته می‌شود. اسطوره‌ها می‌گویند که تیشتر در نبرد با دیو خشکسالی پیروز شد و باران فراوان برای زمین به ارمغان آورد.",
    rituals: ["آیین‌های آب‌پاشی", "دعا برای بارش باران", "نیایش ایزد تیر", "خوردن شربت‌ها و نوشیدنی‌های خنک"],
    season: "summer"
  },
  {
    id: "jashn-abangan",
    name: "جشن آبانگان",
    date: "۱۰ آبان (۱ نوامبر)",
    description: "جشن بزرگداشت آب‌ها و ایزدبانو آناهیتا که در روز آبان از ماه آبان برگزار می‌شود. این جشن با نیایش آب و پاکسازی منابع آبی همراه است.",
    history: "آبانگان جشنی است که در روز آبان از ماه آبان در تقویم زرتشتی برگزار می‌شود. این روز به آناهیتا، ایزدبانوی آب‌ها اختصاص دارد. در ایران باستان، آب عنصری مقدس به شمار می‌آمد و آلوده کردن آن گناهی بزرگ محسوب می‌شد. در این روز، مردم کنار چشمه‌ها و رودخانه‌ها جمع می‌شدند و به نیایش می‌پرداختند.",
    rituals: ["پاکسازی منابع آب", "شست‌وشوی معبدها و مکان‌های مقدس", "پاشیدن گلاب بر یکدیگر", "خوردن شیرینی‌های مخصوص"],
    season: "autumn"
  },
  {
    id: "jashn-azargan",
    name: "جشن آذرگان",
    date: "۹ آذر (۳۰ نوامبر)",
    description: "جشن بزرگداشت آتش و روشنایی که در روز آذر از ماه آذر برگزار می‌شود. این جشن به آذر، فرشته نگهبان آتش، تعلق دارد.",
    history: "آذرگان جشنی است که در روز آذر از ماه آذر در تقویم زرتشتی برگزار می‌شود. در این روز، آتش که عنصری مقدس در آیین زرتشتی است، گرامی داشته می‌شود. آتشکده‌ها در این روز مرکز برگزاری مراسم ویژه بودند و مردم برای جشن و نیایش در آنجا گرد هم می‌آمدند.",
    rituals: ["روشن کردن آتش", "نیایش در آتشکده‌ها", "تهیه و توزیع خیرات", "پختن آش و غذاهای گرم"],
    season: "autumn"
  },
  {
    id: "nilufar",
    name: "جشن نیلوفر",
    date: "۶ فروردین (۲۶ مارس)",
    description: "جشن روییدن گل‌های نیلوفر که نماد پاکی و روشنایی در آیین‌های کهن بوده‌است. در این روز مردم به دیدار یکدیگر می‌روند و هدیه می‌دهند.",
    history: "جشن نیلوفر یکی از جشن‌های کمتر شناخته شده در تقویم باستانی ایران است که با رویش گل‌های نیلوفر آبی در بهار ارتباط داشته است. نیلوفر آبی در فرهنگ‌های کهن ایرانی و شرقی، نمادی از پاکی، زایش و روشنگری بوده است. این جشن در دوره ساسانی رواج داشته و با ورود به فصل بهار پیوند داشته است.",
    rituals: ["جمع‌آوری و تزیین خانه با گل‌های نیلوفر", "تبادل هدیه میان دوستان", "برگزاری مهمانی‌های بهاری", "قایق‌سواری در دریاچه‌های پر از نیلوفر"],
    season: "spring"
  },
  {
    id: "jashne-sepandarmazgan",
    name: "جشن سپندارمذگان",
    date: "۲۹ بهمن (۱۸ فوریه)",
    description: "جشن عشق و زمین که به نام سپندارمذ، فرشته نگهبان زمین و زنان، نامگذاری شده است. این جشن را روز عشق ایرانی نیز می‌نامند.",
    history: "سپندارمذگان در تقویم باستانی ایران، روز عشق و زمین بوده است که در آن زنان و مادران گرامی داشته می‌شدند. روز سپندارمذ در ماه اسفند، نیز با همین مفهوم گرامی داشته می‌شود. در باورهای زرتشتی، سپندارمذ یکی از امشاسپندان (فرشتگان مقرب) است که نگهبان زمین و زنان است.",
    rituals: ["هدیه دادن به زنان", "پاکسازی زمین", "کاشت گیاهان", "جشن و پایکوبی"],
    season: "winter"
  },
  {
    id: "jashne-mehragan-mehr",
    name: "جشن مهرگان مِهر",
    date: "۲ مهر (۲۴ سپتامبر)",
    description: "جشن کوچک‌تری که در آغاز ماه مهر برگزار می‌شود و مقدمه‌ای بر جشن بزرگ مهرگان (۱۶ مهر) است.",
    history: "مهرگان در ایران باستان جشنی در دو بخش بوده است: مهرگان کوچک (خرده مهرگان) در روز ۲ مهر و مهرگان بزرگ در روز ۱۶ مهر. مهرگان از مهم‌ترین جشن‌های ایرانی پس از نوروز بوده که در گرامیداشت میترا (مهر)، ایزد پیمان و روشنایی برگزار می‌شده است.",
    rituals: ["آماده سازی برای جشن اصلی مهرگان", "خوردن میوه‌های پاییزی", "آغاز کاشت محصولات پاییزی", "برپایی آتش‌های کوچک"],
    season: "autumn"
  },
  {
    id: "jashne-paizan",
    name: "جشن پاییزان",
    date: "۳۱ شهریور (۲۲ سپتامبر)",
    description: "جشن آغاز فصل پاییز و برابری شب و روز که در اعتدال پاییزی برگزار می‌شود.",
    history: "پاییزان یا جشن برابری شب و روز در پاییز، از جشن‌های کهن ایرانی است که برای آغاز فصل پاییز برگزار می‌شود. این جشن با اعتدال پاییزی مصادف است که در آن طول شب و روز برابر می‌شود. در فرهنگ ایران باستان، این روز نقطه عطفی در چرخه کشاورزی و آغاز برداشت محصولات پاییزی بوده است.",
    rituals: ["برداشت و تقسیم میوه‌های پاییزی", "پختن آش‌های مخصوص فصل", "روشن کردن آتش", "دعا برای محصولات پاییزی"],
    season: "autumn"
  },
  {
    id: "jashn-daigan",
    name: "جشن دی‌گان",
    date: "مجموعه‌ای از جشن‌ها در ماه دی",
    description: "سلسله‌ای از جشن‌های یک‌روزه که در روزهای مختلف ماه دی به مناسبت همنامی روز و ماه برگزار می‌شود.",
    history: "در تقویم زرتشتی، هنگامی که نام روز و ماه یکسان باشد، جشن گرفته می‌شود. در ماه دی، چندین روز با این ویژگی وجود دارد که در هر کدام، جشن‌های دی‌گان برگزار می‌شود. این جشن‌ها با بزرگداشت «دی» که نمادی از آفرینش و روشنایی است، همراه بوده است.",
    rituals: ["برپایی آتش", "پختن غذاهای مخصوص", "نیایش و سرود", "گردهمایی خانوادگی"],
    season: "winter"
  },
];

const seasonColors: Record<Season, {bg: string, text: string, border: string}> = {
  spring: {bg: "bg-gradient-to-br from-green-50 to-emerald-100", text: "text-emerald-700", border: "border-emerald-200"},
  summer: {bg: "bg-gradient-to-br from-amber-50 to-yellow-100", text: "text-amber-700", border: "border-amber-200"},
  autumn: {bg: "bg-gradient-to-br from-orange-50 to-amber-100", text: "text-orange-700", border: "border-orange-200"},
  winter: {bg: "bg-gradient-to-br from-blue-50 to-cyan-100", text: "text-blue-700", border: "border-blue-200"},
};

const PersianHolidays = () => {
  const [expandedCelebration, setExpandedCelebration] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<Season>('spring');
  
  const toggleCelebration = (name: string) => {
    setExpandedCelebration(expandedCelebration === name ? null : name);
  };

  const seasonalCelebrations = celebrations.filter(celebration => celebration.season === activeSection);

  // Animation variants for framer-motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="mb-10 text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">تعطیلات و جشن‌های سنتی ایرانی</h1>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          تقویم جامع مناسبت‌ها، جشن‌ها و آیین‌های سنتی ایران، آشنایی با تاریخچه و آداب و رسوم جشن‌های باستانی
        </p>
      </header>
      
      {/* Season selector - Apple style segmented control */}
      <div className="mb-8">
        <div className="bg-gray-100 rounded-xl p-1 flex justify-between max-w-lg mx-auto neo-glass">
          {(['spring', 'summer', 'autumn', 'winter'] as Season[]).map((season) => (
            <button
              key={season}
              onClick={() => setActiveSection(season)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeSection === season 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {season === 'spring' && 'بهار'}
              {season === 'summer' && 'تابستان'}
              {season === 'autumn' && 'پاییز'}
              {season === 'winter' && 'زمستان'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Celebrations grid with Apple style cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {seasonalCelebrations.map((celebration, index) => {
          const seasonStyle = seasonColors[celebration.season];
          const isExpanded = expandedCelebration === celebration.id;
          
          return (
            <motion.div
              key={celebration.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`card-apple-gradient rounded-3xl border ${seasonStyle.border} overflow-hidden`}
            >
              {/* Card header */}
              <div className={`p-6 ${seasonStyle.bg}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${seasonStyle.text}`}>{celebration.name}</h3>
                    <div className="flex items-center mt-1 text-gray-500 text-sm">
                      <Clock size={14} className="ml-1" />
                      {celebration.date}
                      
                      {celebration.location && (
                        <span className="mr-3 flex items-center">
                          <MapPin size={14} className="ml-1" />
                          {celebration.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => toggleCelebration(celebration.id)}
                    variant="apple-outline"
                    size="sm"
                    className="rounded-full hover:shadow-sm"
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                    {isExpanded ? 'بستن' : 'بیشتر'}
                  </Button>
                </div>
              </div>
              
              {/* Card content */}
              <Collapsible open={isExpanded} className="transition-all duration-300">
                <CollapsibleContent className="p-5 pt-0">
                  <div className="pt-5 border-t border-gray-100">
                    <p className="text-gray-700 mb-4 leading-relaxed">{celebration.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">تاریخچه:</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{celebration.history}</p>
                    </div>
                    
                    {celebration.rituals && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-800 mb-2">آیین‌ها و مراسم:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {celebration.rituals.map((ritual, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs px-3 py-1 rounded-full ${seasonStyle.bg} ${seasonStyle.text}`}
                            >
                              {ritual}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          );
        })}
      </div>
      
      {/* Calendar visualization */}
      <div className="my-12">
        <Card className="neo-glass shadow-sm border-white/50">
          <CardHeader>
            <div className="flex items-center">
              <CalendarDays className="ml-2 text-primary" size={20} />
              <h2 className="text-xl font-bold">تقویم جشن‌های سنتی در طول سال</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-12 gap-2">
                  {/* Month headers */}
                  {['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
                    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'].map((month, index) => (
                    <div key={month} className="p-2 text-center">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        index < 3 ? seasonColors.spring.bg : 
                        index < 6 ? seasonColors.summer.bg :
                        index < 9 ? seasonColors.autumn.bg : 
                        seasonColors.winter.bg
                      }`}>
                        {month}
                      </span>
                    </div>
                  ))}
                  
                  {/* Month cells with events */}
                  {[...Array(12)].map((_, monthIndex) => {
                    // Find celebrations for this month
                    const monthCelebrations = celebrations.filter(cel => {
                      const monthName = cel.date.split(' ')[1];
                      const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 
                                          'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                      return monthNames.indexOf(monthName) === monthIndex;
                    });
                    
                    return (
                      <div key={monthIndex} className="border-t border-dashed border-gray-200 p-2 min-h-[80px] flex flex-col items-center justify-center">
                        {monthCelebrations.map(cel => (
                          <div 
                            key={cel.id}
                            className={`text-xs ${seasonColors[cel.season].text} mb-1 p-1 rounded w-full text-center`}
                          >
                            {cel.name}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mb-8 mt-12">
        <Card className="neo-glass bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-8">
            <h2 className="text-lg font-bold text-gray-700 mb-3">اهمیت جشن‌های سنتی در فرهنگ ایرانی</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              جشن‌های سنتی و آیین‌های باستانی بخش جدایی‌ناپذیر از هویت فرهنگی و تاریخی ایرانیان هستند.
              این جشن‌ها که اغلب ریشه در تاریخ چند هزار ساله ایران دارند، نمادی از پیوند عمیق مردم با طبیعت، 
              فصل‌ها و پدیده‌های آسمانی بوده‌اند. همچنین، آنها بستری برای تقویت روابط اجتماعی، انتقال ارزش‌های فرهنگی
              و حفظ سنت‌های کهن از نسلی به نسل دیگر هستند.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersianHolidays;
