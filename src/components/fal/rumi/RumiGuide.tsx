
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

export const RumiGuide = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors">
            <Info size={14} />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[300px] text-xs p-3 bg-white text-right">
          <div className="space-y-2">
            <p className="font-medium">استخاره با مولانا چیست؟</p>
            <p className="text-muted-foreground">
              استخاره با مولانا روشی برای طلب خیر و راهنمایی از طریق اشعار جلال‌الدین محمد بلخی (مولانا) است. 
              در این روش، پس از نیت کردن، شعری از مولانا به صورت تصادفی انتخاب می‌شود که می‌تواند راهنمایی برای پرسش یا موضوع مورد نظر شما باشد.
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
