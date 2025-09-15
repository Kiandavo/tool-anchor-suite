import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { toast } from 'sonner';

export const InstallPrompt: React.FC = () => {
  const { isInstallable, installPWA } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      toast.success('اپلیکیشن با موفقیت نصب شد!');
    } else {
      toast.error('خطا در نصب اپلیکیشن');
    }
  };

  if (!isInstallable || isDismissed) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 z-50 border-primary/20 bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">نصب اپلیکیشن</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDismissed(true)}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          لنگر را روی دستگاه خود نصب کنید تا دسترسی سریع‌تر داشته باشید
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button onClick={handleInstall} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            نصب اپلیکیشن
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsDismissed(true)}
            className="px-3"
          >
            بعداً
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};