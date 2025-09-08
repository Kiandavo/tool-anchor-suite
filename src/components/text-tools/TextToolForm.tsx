
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TextToolFormProps {
  textInput: string;
  textOutput: string;
  setTextInput: (text: string) => void;
  handleProcess: () => void;
  showSortOptions?: boolean;
  sortOrder?: "asc" | "desc";
  setSortOrder?: (order: "asc" | "desc") => void;
  setOutcomeMsg: (msg: string | null) => void;
  inputPlaceholder?: string;
  processButtonText?: string;
}

export function TextToolForm({
  textInput,
  textOutput,
  setTextInput,
  handleProcess,
  showSortOptions,
  sortOrder,
  setSortOrder,
  setOutcomeMsg,
  inputPlaceholder = "متن خود را وارد کنید...",
  processButtonText = "اجرا"
}: TextToolFormProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    if (textOutput) {
      navigator.clipboard.writeText(textOutput);
      toast({
        title: "کپی شد!",
        description: "نتیجه در کلیپ‌بورد کپی شد.",
        duration: 2000,
      });
      setOutcomeMsg("خروجی پس از اجرا با موفقیت کپی شد.");
    }
  };

  return (
    <div dir="rtl" className="flex flex-col items-stretch gap-4">
      <Label htmlFor="textTool">متن ورودی</Label>
      <Textarea
        id="textTool"
        placeholder={inputPlaceholder}
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
        rows={7}
      />
      {showSortOptions && sortOrder && setSortOrder && (
        <RadioGroup
          value={sortOrder}
          onValueChange={val => setSortOrder(val as "asc" | "desc")}
          className="flex gap-4"
        >
          <Label>مرتب سازی:</Label>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="asc" id="asc" />
            <Label htmlFor="asc">صعودی</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="desc" id="desc" />
            <Label htmlFor="desc">نزولی</Label>
          </div>
        </RadioGroup>
      )}
      <Button type="button" onClick={handleProcess} size="lg" className="w-full">{processButtonText}</Button>
      <Label>خروجی:</Label>
      <Textarea value={textOutput} readOnly rows={7} />
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={handleCopy}
        disabled={!textOutput}
        className="w-full"
      >
        کپی خروجی
      </Button>
    </div>
  );
}
