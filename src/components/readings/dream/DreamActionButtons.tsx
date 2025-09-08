
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Moon } from "lucide-react";

interface DreamActionButtonsProps {
  interpretation: string;
  onCopy: () => void;
  onClear: () => void;
}

const DreamActionButtons: React.FC<DreamActionButtonsProps> = ({
  interpretation,
  onCopy,
  onClear
}) => {
  if (!interpretation) return null;

  return (
    <div className="flex justify-center gap-2 pt-3 pb-4 bg-indigo-50/50">
        <Button 
          onClick={onCopy}
          variant="outline"
          size="sm"
          className="border-indigo-300 text-indigo-800 hover:bg-indigo-100 icon-text-sm"
        >
          <Copy size={16} className="ml-1" />
          کپی تعبیر
        </Button>
        <Button
          onClick={onClear}
          variant="outline"
          size="sm"
          className="border-indigo-300 text-indigo-800 hover:bg-indigo-100 icon-text-sm"
        >
          <Moon size={16} className="ml-1" />
          خواب جدید
        </Button>
    </div>
  );
};

export default DreamActionButtons;
