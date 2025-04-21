import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DiscountCalculatorProps {}

const DiscountCalculator = () => {
  type CalcType = "applyDiscount" | "findDiscount";
  const [calcType, setCalcType] = useState<CalcType>("applyDiscount");

  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [finalPrice, setFinalPrice] = useState<number | "">("");

  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState<number | "">("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<number | "">("");
  const [calculatedDiscount, setCalculatedDiscount] = useState<number | "">("");

  const calculateDiscountedPrice = () => {
    if (typeof originalPrice === 'number' && typeof discount === 'number') {
      const discountedPrice = originalPrice - (originalPrice * (discount / 100));
      setFinalPrice(discountedPrice);
    }
  };

  const calculateDiscountPercentage = () => {
    if (typeof priceBeforeDiscount === 'number' && typeof priceAfterDiscount === 'number') {
      const discountAmount = priceBeforeDiscount - priceAfterDiscount;
      const discountPercentage = (discountAmount / priceBeforeDiscount) * 100;
      setCalculatedDiscount(discountPercentage);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>محاسبه گر تخفیف</CardTitle>
          <CardDescription>
            با استفاده از این ابزار می‌توانید قیمت نهایی پس از تخفیف یا درصد تخفیف را محاسبه کنید.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button
                onClick={() => setCalcType("applyDiscount")}
                variant={calcType === "applyDiscount" ? "default" : "outline"}
              >
                محاسبه قیمت پس از تخفیف
              </Button>
              <Button
                onClick={() => setCalcType("findDiscount")}
                variant={calcType === "findDiscount" ? "default" : "outline"}
              >
                محاسبه درصد تخفیف
              </Button>
            </div>
          </div>

          {calcType === "applyDiscount" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="originalPrice">قیمت اصلی</Label>
                <Input
                  type="number"
                  id="originalPrice"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="discount">درصد تخفیف</Label>
                <Input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="finalPrice">قیمت نهایی</Label>
                <Input
                  type="number"
                  id="finalPrice"
                  value={finalPrice}
                  readOnly
                />
              </div>
              <div className="flex items-center">
                <Button onClick={calculateDiscountedPrice}>محاسبه قیمت نهایی</Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priceBeforeDiscount">قیمت قبل از تخفیف</Label>
                <Input
                  type="number"
                  id="priceBeforeDiscount"
                  value={priceBeforeDiscount}
                  onChange={(e) => setPriceBeforeDiscount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="priceAfterDiscount">قیمت بعد از تخفیف</Label>
                <Input
                  type="number"
                  id="priceAfterDiscount"
                  value={priceAfterDiscount}
                  onChange={(e) => setPriceAfterDiscount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="calculatedDiscount">درصد تخفیف</Label>
                <Input
                  type="number"
                  id="calculatedDiscount"
                  value={calculatedDiscount}
                  readOnly
                />
              </div>
              <div className="flex items-center">
                <Button onClick={calculateDiscountPercentage}>محاسبه درصد تخفیف</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountCalculator;
