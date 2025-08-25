export interface Movie {
  id: string;
  persianTitle: string;
  englishTitle: string;
  year: number;
  director: string;
  genre: string[];
  imdbRating: number;
  imdbReviews: number;
  plot: string;
  poster: string;
  cast: string[];
  duration: number;
}

export const movies: Movie[] = [
  {
    id: "godfather",
    persianTitle: "پدرخوانده",
    englishTitle: "The Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genre: ["Crime", "Drama"],
    imdbRating: 9.2,
    imdbReviews: 1800000,
    plot: "داستان خانواده‌ای قدرتمند از مافیای ایتالیایی-آمریکایی که توسط پدرخوانده، دان ویتو کورلئونه رهبری می‌شود.",
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    duration: 175
  },
  {
    id: "shawshank",
    persianTitle: "شاوشنک",
    englishTitle: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    genre: ["Drama"],
    imdbRating: 9.3,
    imdbReviews: 2600000,
    plot: "داستان دوستی بین دو زندانی طی سال‌ها و پیدا کردن راحتی و در نهایت رستگاری از طریق عمل‌های عادی رحمت و شفقت انسانی.",
    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    duration: 142
  },
  {
    id: "pulp-fiction",
    persianTitle: "پالپ فیکشن",
    englishTitle: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: ["Crime", "Drama"],
    imdbRating: 8.9,
    imdbReviews: 2000000,
    plot: "داستان‌های مترابط از زندگی مجرمان لس آنجلس که به شکل غیرخطی روایت می‌شوند.",
    poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE0MTIyNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    duration: 154
  },
  {
    id: "forrest-gump",
    persianTitle: "فارست گامپ",
    englishTitle: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    genre: ["Drama", "Romance"],
    imdbRating: 8.8,
    imdbReviews: 2000000,
    plot: "داستان مردی با ضریب هوشی پایین که بدون قصد تأثیر عمده‌ای روی رویدادهای تاریخی قرن بیستم آمریکا می‌گذارد.",
    poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    duration: 142
  },
  {
    id: "matrix",
    persianTitle: "ماتریکس",
    englishTitle: "The Matrix",
    year: 1999,
    director: "The Wachowskis",
    genre: ["Action", "Sci-Fi"],
    imdbRating: 8.7,
    imdbReviews: 1800000,
    plot: "هکری به نام نئو حقیقت واقعیت را کشف می‌کند و می‌آموزد که جهان اطراف او یک شبیه‌سازی کامپیوتری است.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    duration: 136
  },
  {
    id: "gladiator",
    persianTitle: "گلادیاتور",
    englishTitle: "Gladiator",
    year: 2000,
    director: "Ridley Scott",
    genre: ["Action", "Drama", "Adventure"],
    imdbRating: 8.5,
    imdbReviews: 1400000,
    plot: "یک ژنرال رومی که به بردگی تبدیل شده، برای انتقام از امپراتور فاسدی که خانواده‌اش را کشته، به گلادیاتور تبدیل می‌شود.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    duration: 155
  },
  {
    id: "dark-knight",
    persianTitle: "شوالیه تاریکی",
    englishTitle: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    genre: ["Action", "Crime", "Drama"],
    imdbRating: 9.0,
    imdbReviews: 2500000,
    plot: "بتمن با یکی از آزمون‌های روانی و فیزیکی بزرگ خود روبرو می‌شود زمانی که جوکر روی خیابان‌های گاتهام آشوب به راه می‌اندازد.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    duration: 152
  },
  {
    id: "inception",
    persianTitle: "شتاب",
    englishTitle: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: ["Action", "Sci-Fi", "Thriller"],
    imdbRating: 8.8,
    imdbReviews: 2300000,
    plot: "یک دزد که با استفاده از فناوری اشتراک رؤیا وارد ضمیر ناخودآگاه افراد می‌شود، یک مأموریت نهایی و غیرممکن دریافت می‌کند.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    duration: 148
  },
  {
    id: "interstellar",
    persianTitle: "بین ستاره‌ای",
    englishTitle: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    imdbRating: 8.6,
    imdbReviews: 1700000,
    plot: "گروهی از کاوشگران از یک کرم‌چاله نزدیک زحل استفاده می‌کنند تا مرزهای سفر انسان را پشت سر بگذارند و سیاره‌ای قابل سکونت پیدا کنند.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    duration: 169
  },
  {
    id: "lotr",
    persianTitle: "ارباب حلقه‌ها",
    englishTitle: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    director: "Peter Jackson",
    genre: ["Adventure", "Drama", "Fantasy"],
    imdbRating: 8.8,
    imdbReviews: 1800000,
    plot: "هابیت جوانی باید حلقه قدرتمندی را که سرنوشت تمام دنیا بستگی به آن دارد، نابود کند.",
    poster: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    duration: 178
  },
  {
    id: "parasite",
    persianTitle: "انگل",
    englishTitle: "Parasite",
    year: 2019,
    director: "Bong Joon Ho",
    genre: ["Comedy", "Drama", "Thriller"],
    imdbRating: 8.5,
    imdbReviews: 800000,
    plot: "یک خانواده فقیر با نفوذ به زندگی یک خانواده ثروتمند، درگیر حوادث غیرقابل پیش‌بینی می‌شوند.",
    poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    duration: 132
  },
  {
    id: "spider-verse",
    persianTitle: "مرد عنکبوتی: درون دنیای عنکبوتی",
    englishTitle: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    genre: ["Animation", "Action", "Adventure"],
    imdbRating: 8.4,
    imdbReviews: 500000,
    plot: "نوجوان مایلز مورالز وقتی توسط عنکبوت رادیواکتیو گزیده می‌شود، قدرت‌های عنکبوتی پیدا می‌کند.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"],
    duration: 117
  },
  {
    id: "oppenheimer",
    persianTitle: "اپنهایمر",
    englishTitle: "Oppenheimer",
    year: 2023,
    director: "Christopher Nolan",
    genre: ["Biography", "Drama", "History"],
    imdbRating: 8.3,
    imdbReviews: 600000,
    plot: "داستان زندگی رابرت اپنهایمر، فیزیکدان نظری آمریکایی که در توسعه بمب اتمی نقش کلیدی داشت.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    duration: 180
  },
  {
    id: "blade-runner-2049",
    persianTitle: "بلید رانر ۲۰۴۹",
    englishTitle: "Blade Runner 2049",
    year: 2017,
    director: "Denis Villeneuve",
    genre: ["Action", "Drama", "Mystery"],
    imdbRating: 8.0,
    imdbReviews: 500000,
    plot: "یک بلید رانر جوان راز دیرین را کشف می‌کند که ممکن است جامعه را به آشوب بکشاند.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    duration: 164
  },
  {
    id: "joker",
    persianTitle: "جوکر",
    englishTitle: "Joker",
    year: 2019,
    director: "Todd Phillips",
    genre: ["Crime", "Drama", "Thriller"],
    imdbRating: 8.4,
    imdbReviews: 1200000,
    plot: "در گاتهام سیتی، کمدین شکست‌خورده آرتور فلک تبدیل به جنایتکار دیوانه‌ای موسوم به جوکر می‌شود.",
    poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    duration: 122
  }
];

export const getRandomMovie = (): Movie => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};