
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { User } from 'lucide-react';
import { generateRandomUsername, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomUsername() {
  const [username, setUsername] = useState<string>('');
  const [type, setType] = useState<string>('general');

  const handleGenerateUsername = () => {
    const newUsername = generateRandomUsername(type);
    setUsername(newUsername);
    toast.success("نام کاربری تصادفی تولید شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="نوع نام کاربری" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">عمومی</SelectItem>
              <SelectItem value="gaming">گیمینگ</SelectItem>
              <SelectItem value="professional">حرفه‌ای</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateUsername} size="lg" className="w-full icon-text">
            <User size={20} />
            تولید نام کاربری
          </Button>
        </div>
        {username && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(username)}
          >
            {username}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
