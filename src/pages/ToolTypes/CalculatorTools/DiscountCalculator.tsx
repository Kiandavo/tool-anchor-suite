import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { 
  Percent, 
  Calculator, 
  TrendingDown, 
  ShoppingCart, 
  PieChart, 
  Target,
  Gift,
  RotateCcw,
  Plus,
  Trash2,
  Tag
} from "lucide-react";
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  originalPrice: number;
  discountPercent: number;
  quantity: number;
}

interface DiscountResult {
  originalTotal: number;
  discountAmount: number;
  finalPrice: number;
  savingsPercent: number;
}

const DiscountCalculator = () => {
  // Simple discount states
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState<string>('');
  
  // Reverse calculation states
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState<string>('');
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<string>('');
  
  // Bulk discount states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<string>('');
  const [newItemDiscount, setNewItemDiscount] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<string>('1');
  
  // Results
  const [simpleResult, setSimpleResult] = useState<DiscountResult | null>(null);
  const [reverseResult, setReverseResult] = useState<number | null>(null);
  
  const [isCalculating, setIsCalculating] = useState(false);

  // Format number inputs
  const formatNumber = (value: string): string => {
    const cleaned = value.replace(/[^\d.]/g, '');
    return cleaned;
  };

  // Precise number formatting without rounding (Persian digits)
  const toPersianDigits = (s: string): string => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
  const formatPreciseNumber = (num: number): string => {
    if (!isFinite(num)) return 'نامعتبر';
    const trimmed = parseFloat(num.toPrecision(15)).toString();
    return toPersianDigits(trimmed);
  };
  // Calculate simple discount
  const calculateDiscount = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const price = parseFloat(originalPrice);
      const discount = parseFloat(discountPercent);
      
      if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) {
        toast.error("مقادیر نامعتبر", {
          description: "لطفا قیمت و درصد تخفیف معتبری وارد کنید",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const discountAmount = (price * discount) / 100;
      const final = price - discountAmount;
      const savingsPercent = discount;

      const result: DiscountResult = {
        originalTotal: price,
        discountAmount,
        finalPrice: final,
        savingsPercent
      };

      setSimpleResult(result);
      setFinalPrice(final.toFixed(2));
      
      toast.success("محاسبه تخفیف انجام شد", {
        description: `شما ${discountAmount.toLocaleString('fa-IR')} تومان صرفه‌جویی کردید`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در محاسبه", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [originalPrice, discountPercent]);

  // Calculate reverse discount (find discount percentage)
  const calculateReverseDiscount = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const priceBefore = parseFloat(priceBeforeDiscount);
      const priceAfter = parseFloat(priceAfterDiscount);
      
      if (isNaN(priceBefore) || isNaN(priceAfter) || priceBefore <= 0 || priceAfter < 0 || priceAfter >= priceBefore) {
        toast.error("مقادیر نامعتبر", {
          description: "قیمت بعد از تخفیف باید کمتر از قیمت اصلی باشد",
          position: "top-center",
        });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const discountAmount = priceBefore - priceAfter;
      const discountPercentage = (discountAmount / priceBefore) * 100;
      
      setReverseResult(discountPercentage);
      
      toast.success("درصد تخفیف محاسبه شد", {
        description: `درصد تخفیف: ${formatPreciseNumber(discountPercentage)}%`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در محاسبه", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [priceBeforeDiscount, priceAfterDiscount]);

  // Add item to cart
  const addCartItem = () => {
    const name = newItemName.trim();
    const price = parseFloat(newItemPrice);
    const discount = parseFloat(newItemDiscount);
    const quantity = parseInt(newItemQuantity);
    
    if (!name || isNaN(price) || isNaN(discount) || isNaN(quantity) || 
        price <= 0 || discount < 0 || discount > 100 || quantity <= 0) {
      toast.error("اطلاعات نامعتبر", {
        description: "لطفا تمام فیلدها را صحیح پر کنید",
        position: "top-center",
      });
      return;
    }
    
    const newItem: CartItem = {
      id: Date.now().toString(),
      name,
      originalPrice: price,
      discountPercent: discount,
      quantity
    };
    
    setCartItems(prev => [...prev, newItem]);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDiscount('');
    setNewItemQuantity('1');
    
    toast.success("کالا اضافه شد", {
      position: "top-center",
    });
  };

  // Remove item from cart
  const removeCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.info("کالا حذف شد", {
      position: "top-center",
    });
  };

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    if (cartItems.length === 0) return null;
    
    let originalTotal = 0;
    let finalTotal = 0;
    
    cartItems.forEach(item => {
      const itemOriginal = item.originalPrice * item.quantity;
      const itemDiscount = (itemOriginal * item.discountPercent) / 100;
      const itemFinal = itemOriginal - itemDiscount;
      
      originalTotal += itemOriginal;
      finalTotal += itemFinal;
    });
    
    const totalSavings = originalTotal - finalTotal;
    const averageDiscount = originalTotal > 0 ? (totalSavings / originalTotal) * 100 : 0;
    
    return {
      originalTotal,
      finalTotal,
      totalSavings,
      averageDiscount
    };
  }, [cartItems]);

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setFinalPrice('');
    setPriceBeforeDiscount('');
    setPriceAfterDiscount('');
    setCartItems([]);
    setSimpleResult(null);
    setReverseResult(null);
    
    toast.info("فرم پاک شد", {
      description: "اطلاعات جدید وارد کنید",
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <div className="icon-container">
              <Percent className="h-6 w-6 text-primary" />
            </div>
            محاسبه‌گر پیشرفته تخفیف
          </CardTitle>
          <CardDescription className="text-center">
            محاسبه انواع تخفیف‌ها، درصد پس‌انداز و مدیریت سبد خرید با تخفیف‌های متعدد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simple" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-effect">
              <TabsTrigger value="simple" className="flex items-center">
                <Calculator className="ml-1 h-4 w-4" />
                تخفیف ساده
              </TabsTrigger>
              <TabsTrigger value="reverse" className="flex items-center">
                <Target className="ml-1 h-4 w-4" />
                پیدا کردن درصد
              </TabsTrigger>
              <TabsTrigger value="bulk" className="flex items-center">
                <ShoppingCart className="ml-1 h-4 w-4" />
                سبد خرید
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simple" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="flex items-center text-sm font-medium">
                    <Tag className="ml-1 h-3 w-3 text-primary" />
                    قیمت اصلی (تومان)
                  </Label>
                  <Input
                    id="originalPrice"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(formatNumber(e.target.value))}
                    placeholder="مثال: 100000"
                    type="text"
                    dir="ltr"
                    className="glass-effect transition-all duration-300 focus:scale-105"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountPercent" className="flex items-center text-sm font-medium">
                    <Percent className="ml-1 h-3 w-3 text-primary" />
                    درصد تخفیف
                  </Label>
                  <Input
                    id="discountPercent"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(formatNumber(e.target.value))}
                    placeholder="مثال: 20"
                    type="text"
                    dir="ltr"
                    className="glass-effect transition-all duration-300 focus:scale-105"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button 
                  onClick={calculateDiscount}
                  disabled={isCalculating}
                  className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                  {isCalculating ? 'در حال محاسبه...' : 'محاسبه تخفیف'}
                </Button>
                
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <RotateCcw className="ml-2 h-4 w-4" />
                  پاک کردن
                </Button>
              </div>

              {simpleResult && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OutcomeInfoCard 
                      outcome={`قیمت نهایی: ${simpleResult.finalPrice.toLocaleString('fa-IR')} تومان`}
                    />
                    <OutcomeInfoCard 
                      outcome={`مقدار تخفیف: ${simpleResult.discountAmount.toLocaleString('fa-IR')} تومان`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Tag className="h-5 w-5 text-blue-600 ml-2" />
                        <h3 className="font-medium text-sm">قیمت اصلی</h3>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {simpleResult.originalTotal.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <TrendingDown className="h-5 w-5 text-red-600 ml-2" />
                        <h3 className="font-medium text-sm">میزان تخفیف</h3>
                      </div>
                      <p className="text-lg font-bold text-red-600">
                        {simpleResult.discountAmount.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                    
                    <div className="neo-glass rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center mb-2">
                        <Percent className="h-5 w-5 text-green-600 ml-2" />
                        <h3 className="font-medium text-sm">درصد صرفه‌جویی</h3>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {simpleResult.savingsPercent.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Savings Visualization */}
                  <div className="neo-glass rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <PieChart className="ml-2 h-5 w-5 text-primary" />
                      میزان صرفه‌جویی
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>مبلغ پرداختی</span>
                        <span>{simpleResult.finalPrice.toLocaleString('fa-IR')} تومان</span>
                      </div>
                      <Progress value={(simpleResult.finalPrice / simpleResult.originalTotal) * 100} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>۰ تومان</span>
                        <span>{simpleResult.originalTotal.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reverse" className="mt-6 space-y-4">
              <div className="glass-effect rounded-xl p-4 mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  پیدا کردن درصد تخفیف
                </h3>
                <p className="text-sm text-muted-foreground">
                  زمانی که قیمت اصلی و قیمت نهایی را می‌دانید، اما درصد تخفیف را نمی‌دانید
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceBeforeDiscount" className="flex items-center text-sm font-medium">
                    <Tag className="ml-1 h-3 w-3 text-primary" />
                    قیمت قبل از تخفیف (تومان)
                  </Label>
                  <Input
                    id="priceBeforeDiscount"
                    value={priceBeforeDiscount}
                    onChange={(e) => setPriceBeforeDiscount(formatNumber(e.target.value))}
                    placeholder="مثال: 100000"
                    type="text"
                    dir="ltr"
                    className="glass-effect transition-all duration-300 focus:scale-105"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priceAfterDiscount" className="flex items-center text-sm font-medium">
                    <TrendingDown className="ml-1 h-3 w-3 text-primary" />
                    قیمت بعد از تخفیف (تومان)
                  </Label>
                  <Input
                    id="priceAfterDiscount"
                    value={priceAfterDiscount}
                    onChange={(e) => setPriceAfterDiscount(formatNumber(e.target.value))}
                    placeholder="مثال: 80000"
                    type="text"
                    dir="ltr"
                    className="glass-effect transition-all duration-300 focus:scale-105"
                  />
                </div>
              </div>

              <Button 
                onClick={calculateReverseDiscount}
                disabled={isCalculating}
                className="vibrant-button w-full flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه درصد تخفیف'}
              </Button>

              {reverseResult !== null && (
                <div className="animate-fade-in">
                  <div className="neo-glass rounded-xl p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Percent className="h-8 w-8 text-primary ml-3" />
                      <div>
                        <h3 className="font-semibold text-lg">درصد تخفیف</h3>
                        <p className="text-3xl font-bold text-primary">{formatPreciseNumber(reverseResult)}%</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      شما {formatPreciseNumber(((parseFloat(priceBeforeDiscount) - parseFloat(priceAfterDiscount)) / parseFloat(priceBeforeDiscount)) * 100)}%
                      صرفه‌جویی کرده‌اید
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="bulk" className="mt-6 space-y-4">
              <div className="glass-effect rounded-xl p-4 mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  مدیریت سبد خرید با تخفیف‌های متعدد
                </h3>
                <p className="text-sm text-muted-foreground">
                  کالاهای مختلف با درصد تخفیف‌های متفاوت را اضافه کنید
                </p>
              </div>

              {/* Add Item Form */}
              <div className="glass-effect rounded-xl p-4 space-y-4">
                <h4 className="font-medium flex items-center">
                  <Plus className="ml-2 h-4 w-4 text-primary" />
                  افزودن کالا
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Input
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="نام کالا"
                    className="glass-effect"
                  />
                  <Input
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(formatNumber(e.target.value))}
                    placeholder="قیمت"
                    type="text"
                    dir="ltr"
                    className="glass-effect"
                  />
                  <Input
                    value={newItemDiscount}
                    onChange={(e) => setNewItemDiscount(formatNumber(e.target.value))}
                    placeholder="درصد تخفیف"
                    type="text"
                    dir="ltr"
                    className="glass-effect"
                  />
                  <Input
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(formatNumber(e.target.value))}
                    placeholder="تعداد"
                    type="text"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
                <Button 
                  onClick={addCartItem}
                  className="vibrant-button flex items-center"
                >
                  <Plus className="ml-2 h-4 w-4" />
                  افزودن به سبد
                </Button>
              </div>

              {/* Cart Items */}
              {cartItems.length > 0 && (
                <div className="space-y-4">
                  <div className="glass-effect rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="py-3 px-4 text-right text-xs font-medium">کالا</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">قیمت اصلی</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">تخفیف</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">تعداد</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">قیمت نهایی</th>
                            <th className="py-3 px-4 text-right text-xs font-medium">عملیات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {cartItems.map((item) => {
                            const itemTotal = item.originalPrice * item.quantity;
                            const itemDiscount = (itemTotal * item.discountPercent) / 100;
                            const itemFinal = itemTotal - itemDiscount;
                            
                            return (
                              <tr key={item.id} className="text-sm hover:bg-muted/20 transition-colors">
                                <td className="py-3 px-4 font-medium">{item.name}</td>
                                <td className="py-3 px-4">{item.originalPrice.toLocaleString('fa-IR')}</td>
                                <td className="py-3 px-4 text-red-600">{item.discountPercent}%</td>
                                <td className="py-3 px-4">{item.quantity}</td>
                                <td className="py-3 px-4 font-semibold text-green-600">
                                  {itemFinal.toLocaleString('fa-IR')} تومان
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCartItem(item.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Cart Totals */}
                  {cartTotals && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="neo-glass rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">کل قیمت اصلی</h4>
                        <p className="text-lg font-semibold text-blue-600">
                          {cartTotals.originalTotal.toLocaleString('fa-IR')} تومان
                        </p>
                      </div>
                      
                      <div className="neo-glass rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">کل تخفیف</h4>
                        <p className="text-lg font-semibold text-red-600">
                          {cartTotals.totalSavings.toLocaleString('fa-IR')} تومان
                        </p>
                      </div>
                      
                      <div className="neo-glass rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">مبلغ نهایی</h4>
                        <p className="text-lg font-semibold text-green-600">
                          {cartTotals.finalTotal.toLocaleString('fa-IR')} تومان
                        </p>
                      </div>
                      
                      <div className="neo-glass rounded-xl p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">میانگین تخفیف</h4>
                        <p className="text-lg font-semibold text-primary">
                          {cartTotals.averageDiscount.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountCalculator;
