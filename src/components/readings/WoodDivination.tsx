
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Leaf, Sparkles, Shield, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WoodMessage {
  tree: string;
  message: string;
  element: string;
  energy: string;
  icon: React.ReactNode;
}

const woodMessages: WoodMessage[] = [
  {
    tree: "بلوط",
    message: "قدرت و استقامت شما در برابر چالش‌ها، شما را به پیروزی خواهد رساند",
    element: "خاک",
    energy: "محافظت و ثبات",
    icon: <Shield className="w-5 h-5" />
  },
  {
    tree: "صنوبر",
    message: "صبر و شکیبایی کلید موفقیت شماست، عجله نکنید",
    element: "هوا",
    energy: "آرامش و تأمل",
    icon: <TreePine className="w-5 h-5" />
  },
  {
    tree: "بید",
    message: "انعطاف‌پذیری شما امکان عبور از سختی‌ها را فراهم می‌کند",
    element: "آب",
    energy: "تطبیق و جریان",
    icon: <Leaf className="w-5 h-5" />
  },
  {
    tree: "انار",
    message: "زمان برداشت ثمرات زحمات شماست، شادی در راه است",
    element: "آتش",
    energy: "جشن و شادی",
    icon: <Heart className="w-5 h-5" />
  },
  {
    tree: "چنار",
    message: "رشد و تحول درونی شما باعث تحول محیط اطرافتان خواهد شد",
    element: "خاک",
    energy: "رشد و تحول",
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    tree: "کاج",
    message: "ایستادگی در برابر طوفان‌های زندگی، شما را قوی‌تر می‌کند",
    element: "هوا",
    energy: "استقلال و قدرت",
    icon: <TreePine className="w-5 h-5" />
  }
];

export default function WoodDivination() {
  const [isGathering, setIsGathering] = useState(false);
  const [selectedWood, setSelectedWood] = useState<WoodMessage | null>(null);
  const [showResult, setShowResult] = useState(false);

  const performDivination = () => {
    setIsGathering(true);
    setShowResult(false);

    setTimeout(() => {
      const randomWood = woodMessages[Math.floor(Math.random() * woodMessages.length)];
      setSelectedWood(randomWood);
      setIsGathering(false);
      setShowResult(true);
    }, 2500);
  };

  const resetDivination = () => {
    setSelectedWood(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <Card className="neo-glass">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <TreePine className="w-6 h-6 text-green-600" />
            فال چوب
          </CardTitle>
          <p className="text-muted-foreground">
            از انرژی درختان و طبیعت پیام دریافت کنید
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResult && (
            <div className="text-center space-y-4">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-medium mb-2">ارتباط با طبیعت</h3>
                <p className="text-sm text-gray-600 mb-4">
                  به آرامی نفس بکشید و با طبیعت ارتباط برقرار کنید. 
                  سؤال خود را در ذهن داشته باشید و از درختان پیام بخواهید.
                </p>
                <Button
                  onClick={performDivination}
                  disabled={isGathering}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isGathering ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      در حال دریافت پیام از طبیعت...
                    </div>
                  ) : (
                    <>
                      دریافت پیام از درختان
                      <Leaf className="w-4 h-4 mr-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {showResult && selectedWood && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">پیام از درخت {selectedWood.tree}</h3>
                  <p className="text-gray-600">راهنمایی طبیعت برای شما</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      {selectedWood.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-800 mb-3 text-lg">
                        درخت {selectedWood.tree}
                      </h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {selectedWood.message}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-100 p-3 rounded-md">
                          <div className="text-sm text-green-600 font-medium">عنصر</div>
                          <div className="text-green-800">{selectedWood.element}</div>
                        </div>
                        <div className="bg-green-100 p-3 rounded-md">
                          <div className="text-sm text-green-600 font-medium">انرژی</div>
                          <div className="text-green-800">{selectedWood.energy}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-4 rounded-lg border border-emerald-300">
                  <h4 className="font-medium text-emerald-800 mb-2">توصیه طبیعت</h4>
                  <p className="text-gray-700">
                    در طبیعت بیشتر وقت بگذرانید و از انرژی مثبت درختان استفاده کنید. 
                    طبیعت همیشه معلم بهتری از هر کتاب است.
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={resetDivination} variant="outline">
                    دریافت پیام جدید
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
