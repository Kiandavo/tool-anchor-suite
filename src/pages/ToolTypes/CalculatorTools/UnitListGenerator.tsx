
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { lengthUnits, convertUnit } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

const UnitListGenerator = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState(lengthUnits[0]);
  const [conversions, setConversions] = useState<string[]>([]);

  const handleGenerate = () => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const results = lengthUnits.map(unit => {
        const converted = convertUnit(numValue, fromUnit, unit);
        return `${numValue} ${fromUnit.symbol} = ${converted} ${unit.symbol}`;
      });
      setConversions(results);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4">
          <Input
            type="number"
            placeholder="مقدار"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (e.target.value) handleGenerate();
            }}
          />
          <Select
            value={fromUnit.name}
            onValueChange={(value) => {
              const unit = lengthUnits.find(u => u.name === value);
              if (unit) {
                setFromUnit(unit);
                if (value) handleGenerate();
              }
            }}
          >
            <SelectTrigger>
              <SelectValue>{fromUnit.name}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {lengthUnits.map((unit) => (
                <SelectItem key={unit.name} value={unit.name}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {conversions.length > 0 && (
          <OutcomeInfoCard
            outcome={conversions.join('\n')}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UnitListGenerator;
