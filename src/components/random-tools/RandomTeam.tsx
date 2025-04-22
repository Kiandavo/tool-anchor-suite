
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dices } from 'lucide-react';
import { generateRandomTeams } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomTeam() {
  const [members, setMembers] = useState<string>('');
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const handleGenerateTeams = () => {
    const memberList = members.split('\n').filter(member => member.trim());
    if (memberList.length < numberOfTeams) {
      toast.error("تعداد اعضا باید بیشتر از تعداد تیم‌ها باشد");
      return;
    }
    
    const newTeams = generateRandomTeams(memberList, numberOfTeams);
    setTeams(newTeams);
    toast.success("تیم‌های تصادفی ایجاد شدند");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex flex-col gap-4">
          <textarea
            className="min-h-[150px] w-full rounded-md border p-4"
            placeholder="نام اعضا را در خط‌های جداگانه وارد کنید"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
          <Input
            type="number"
            min="2"
            max="10"
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(Number(e.target.value))}
            placeholder="تعداد تیم‌ها"
          />
          <Button onClick={handleGenerateTeams} className="flex items-center gap-2">
            <Dices size={18} />
            ایجاد تیم‌های تصادفی
          </Button>
        </div>
        {teams.length > 0 && (
          <div className="space-y-4">
            {teams.map((team, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="font-bold mb-2">تیم {index + 1}</div>
                <div>{team.join('، ')}</div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
