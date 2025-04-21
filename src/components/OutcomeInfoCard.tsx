
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Info } from "lucide-react";

interface OutcomeInfoCardProps {
  outcome: string;
  success?: boolean;
}

export const OutcomeInfoCard: React.FC<OutcomeInfoCardProps> = ({
  outcome,
  success = true,
}) => (
  <Card className={`glass-morphism animate-fade-in mt-4 border-green-200 shadow-lg`}>
    <CardContent className="flex items-center gap-3 p-4 pr-2">
      {success ? (
        <Check className="text-green-600 bg-green-100 rounded-full p-1" size={24} />
      ) : (
        <Info className="text-yellow-500 bg-yellow-50 rounded-full p-1" size={24} />
      )}
      <span className="text-sm text-foreground whitespace-pre-line">{outcome}</span>
    </CardContent>
  </Card>
);

