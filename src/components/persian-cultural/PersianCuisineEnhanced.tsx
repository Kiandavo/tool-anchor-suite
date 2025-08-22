import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChefHat, 
  Clock, 
  Users, 
  Star, 
  Search,
  MapPin,
  Utensils,
  Heart,
  Timer,
  Award
} from 'lucide-react';
import { persianRecipes, PersianRecipe, getRecipesByCategory, searchRecipes } from '@/data/persian-recipes-comprehensive';

export function PersianCuisineEnhanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<PersianRecipe | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showIngredients, setShowIngredients] = useState(true);

  const filteredRecipes = searchTerm 
    ? searchRecipes(searchTerm)
    : activeCategory === 'all' 
      ? persianRecipes 
      : getRecipesByCategory(activeCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'آسان';
      case 'medium': return 'متوسط';
      case 'hard': return 'سخت';
      default: return 'نامشخص';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'main': return 'غذای اصلی';
      case 'appetizer': return 'پیش غذا';
      case 'dessert': return 'دسر';
      case 'drink': return 'نوشیدنی';
      case 'side': return 'غذای جانبی';
      default: return category;
    }
  };

  const categories = [
    { value: 'all', label: 'همه', count: persianRecipes.length },
    { value: 'main', label: 'غذای اصلی', count: getRecipesByCategory('main').length },
    { value: 'appetizer', label: 'پیش غذا', count: getRecipesByCategory('appetizer').length },
    { value: 'dessert', label: 'دسر', count: getRecipesByCategory('dessert').length },
    { value: 'drink', label: 'نوشیدنی', count: getRecipesByCategory('drink').length },
  ];

  return (
    <div className="space-y-6">
      <Card className="gradient-persian text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ChefHat size={28} />
            آشپزی ایرانی
          </CardTitle>
          <p className="text-white/90">
            مجموعه کاملی از دستور پخت غذاهای سنتی ایرانی به فارسی و انگلیسی
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="جستجو در دستور پخت‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full">
          {categories.map((category) => (
            <TabsTrigger key={category.value} value={category.value} className="text-sm">
              {category.label}
              <span className="mr-1 text-xs">({category.count})</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="hover-lift cursor-pointer" onClick={() => setSelectedRecipe(recipe)}>
                <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
                  <Utensils size={64} className="text-orange-600" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg">{recipe.nameFarsi}</h3>
                    <p className="text-sm text-muted-foreground">{recipe.nameEnglish}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Badge className={getDifficultyColor(recipe.difficulty)}>
                      {getDifficultyLabel(recipe.difficulty)}
                    </Badge>
                    <Badge variant="outline">{getCategoryLabel(recipe.category)}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Timer size={14} />
                      <span>{recipe.prepTime + recipe.cookTime} دقیقه</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{recipe.servings} نفر</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span>{recipe.region}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {recipe.descriptionFarsi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedRecipe && (
        <Card className="neo-glass">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedRecipe.nameFarsi}</CardTitle>
                <p className="text-muted-foreground text-lg">{selectedRecipe.nameEnglish}</p>
              </div>
              <Button variant="ghost" onClick={() => setSelectedRecipe(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipe Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Clock size={16} />
                  زمان آماده‌سازی
                </h4>
                <p className="text-sm">{selectedRecipe.prepTime} دقیقه</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Timer size={16} />
                  زمان پخت
                </h4>
                <p className="text-sm">{selectedRecipe.cookTime} دقیقه</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Users size={16} />
                  تعداد افراد
                </h4>
                <p className="text-sm">{selectedRecipe.servings} نفر</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Award size={16} />
                  سختی
                </h4>
                <Badge className={getDifficultyColor(selectedRecipe.difficulty)}>
                  {getDifficultyLabel(selectedRecipe.difficulty)}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="font-semibold">درباره این غذا</h4>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                <p className="text-muted-foreground leading-relaxed mb-2">{selectedRecipe.descriptionFarsi}</p>
                <p className="text-muted-foreground leading-relaxed text-sm italic">{selectedRecipe.descriptionEnglish}</p>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-4">
              <h4 className="font-semibold">زبان دستور:</h4>
              <div className="flex items-center gap-2">
                <Button
                  variant={showIngredients ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowIngredients(true)}
                >
                  فارسی
                </Button>
                <Button
                  variant={!showIngredients ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowIngredients(false)}
                >
                  English
                </Button>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-3">
              <h4 className="font-semibold">مواد لازم</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(showIngredients ? selectedRecipe.ingredientsFarsi : selectedRecipe.ingredientsEnglish).map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted/30 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="font-semibold">طرز تهیه</h4>
              <div className="space-y-3">
                {(showIngredients ? selectedRecipe.instructionsFarsi : selectedRecipe.instructionsEnglish).map((instruction, index) => (
                  <div key={index} className="flex gap-3 bg-muted/20 p-4 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {selectedRecipe.tips && (
              <div className="space-y-3">
                <h4 className="font-semibold">نکات مهم</h4>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-blue-800 text-sm">{selectedRecipe.tips}</p>
                </div>
              </div>
            )}

            {/* Nutritional Info */}
            {selectedRecipe.nutritionalInfo && (
              <div className="space-y-3">
                <h4 className="font-semibold">اطلاعات تغذیه‌ای (در هر وعده)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-lg">{selectedRecipe.nutritionalInfo.calories}</p>
                    <p className="text-xs text-muted-foreground">کالری</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-lg">{selectedRecipe.nutritionalInfo.protein}</p>
                    <p className="text-xs text-muted-foreground">پروتئین</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-lg">{selectedRecipe.nutritionalInfo.carbs}</p>
                    <p className="text-xs text-muted-foreground">کربوهیدرات</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-lg">{selectedRecipe.nutritionalInfo.fat}</p>
                    <p className="text-xs text-muted-foreground">چربی</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="space-y-3">
              <h4 className="font-semibold">برچسب‌ها</h4>
              <div className="flex flex-wrap gap-2">
                {selectedRecipe.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}