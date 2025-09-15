
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Copy, Settings } from 'lucide-react';
import { generateRandomUsername, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomUsername() {
  const [username, setUsername] = useState<string>('');
  const [type, setType] = useState<string>('general');
  const [customPrefix, setCustomPrefix] = useState<string>('');
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleGenerateUsername = () => {
    const newUsername = generateRandomUsername(type, customPrefix || undefined, useNumbers);
    setUsername(newUsername);
    toast.success("نام کاربری تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">تولید نام کاربری هوشمند</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Settings className="h-4 w-4 ml-1" />
            تنظیمات پیشرفته
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">نوع نام کاربری</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="نوع را انتخاب کنید" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">عمومی</SelectItem>
                <SelectItem value="gaming">بازی</SelectItem>
                <SelectItem value="professional">حرفه‌ای</SelectItem>
                <SelectItem value="creative">خلاقانه</SelectItem>
                <SelectItem value="social">اجتماعی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="customPrefix">پیشوند دلخواه (اختیاری)</Label>
                <Input
                  id="customPrefix"
                  value={customPrefix}
                  onChange={(e) => setCustomPrefix(e.target.value)}
                  placeholder="مثال: علی، سارا، تیم"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="useNumbers" 
                  checked={useNumbers}
                  onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
                />
                <Label htmlFor="useNumbers">استفاده از اعداد</Label>
              </div>
            </div>
          )}

          <Button onClick={handleGenerateUsername} className="w-full" size="lg">
            <User className="ml-2 h-4 w-4" />
            تولید نام کاربری
          </Button>

          {username && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-semibold text-primary">{username}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(username)}
                >
                  <Copy className="ml-1 h-4 w-4" />
                  کپی
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
