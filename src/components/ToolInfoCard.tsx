
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface ToolInfoCardProps {
  name: string;
  description: string;
  learnMoreUrl?: string;
}

export const ToolInfoCard: React.FC<ToolInfoCardProps> = ({
  name,
  description,
  learnMoreUrl,
}) => (
  <Card className="glass-morphism animate-fade-in mb-6 border-primary/5">
    <CardHeader className="flex flex-row items-start gap-3 p-4 pb-2">
      <div className="rounded-full bg-primary/20 p-2 shrink-0">
        <Info className="text-primary" size={20} />
      </div>
      <div>
        <CardTitle className="text-base font-semibold text-primary mb-1">{name}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
        {learnMoreUrl && (
          <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer" className="text-xs underline decoration-primary ml-2">
            بیشتر بدانید
          </a>
        )}
      </div>
    </CardHeader>
  </Card>
);

