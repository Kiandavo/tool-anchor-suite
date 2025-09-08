
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { generateRandomTeams } from '@/utils/randomUtils';

export function RandomTeam() {
  const [members, setMembers] = useState<string>('');
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const handleGenerateTeams = () => {
    const memberList = members.split('\n').filter(member => member.trim());
    
    if (memberList.length < numberOfTeams) {
      toast.error("تعداد افراد باید بیشتر یا مساوی با تعداد تیم‌ها باشد");
      return;
    }
    
    const generatedTeams = generateRandomTeams(memberList, numberOfTeams);
    setTeams(generatedTeams);
    toast.success("تیم‌ها با موفقیت تشکیل شدند");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <textarea
            className="min-h-[150px] w-full rounded-md border p-4"
            placeholder="نام افراد را در خط‌های جداگانه وارد کنید"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
          
          <div className="space-y-2">
            <p className="text-sm font-medium">تعداد تیم‌ها: {numberOfTeams}</p>
            <Slider
              value={[numberOfTeams]}
              min={2}
              max={10}
              step={1}
              onValueChange={(value) => setNumberOfTeams(value[0])}
            />
          </div>
          
          <Button onClick={handleGenerateTeams} size="lg" className="w-full icon-text">
            <Users size={20} />
            تشکیل تیم‌های تصادفی
          </Button>
        </div>

        {teams.length > 0 && (
          <div className="mt-4 space-y-4">
            {teams.map((team, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <h3 className="font-bold mb-2">تیم {index + 1}</h3>
                <ul className="list-disc list-inside">
                  {team.map((member, memberIndex) => (
                    <li key={memberIndex}>{member}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
