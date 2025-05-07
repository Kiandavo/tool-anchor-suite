
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import RandomColorGeneratorComponent from '@/components/RandomColorGenerator';

export default function RandomColorGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-center">
          <Palette className="h-5 w-5" />
          تولید رنگ تصادفی
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RandomColorGeneratorComponent />
      </CardContent>
    </Card>
  );
}
