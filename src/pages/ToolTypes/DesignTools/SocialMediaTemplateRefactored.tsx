
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, ImageIcon, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

const SocialMediaTemplateRefactored = () => {
  const [template, setTemplate] = useState({
    title: '',
    subtitle: '',
    body: '',
    image: null,
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTemplate(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTemplate(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setTemplate(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateTemplate = async () => {
    setLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Canvas dimensions
      const width = 800;
      const height = 400;
      canvas.width = width;
      canvas.height = height;

      // Background color
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, width, height);

      // Image
      if (template.imageUrl) {
        const img = new Image();
        img.src = template.imageUrl;
        await new Promise((resolve) => {
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            let imgWidth = width;
            let imgHeight = width / aspectRatio;

            if (imgHeight < height) {
              imgHeight = height;
              imgWidth = height * aspectRatio;
            }

            const x = (width - imgWidth) / 2;
            const y = (height - imgHeight) / 2;

            ctx.drawImage(img, x, y, imgWidth, imgHeight);
            resolve(null);
          };
        });
      }

      // Title
      ctx.font = 'bold 40px sans-serif';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText(template.title, width / 2, 70);

      // Subtitle
      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText(template.subtitle, width / 2, 120);

      // Body
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#444';
      ctx.textAlign = 'left';
      const lineHeight = 25;
      const x = 50;
      let y = 180;
      const words = template.body.split(' ');
      let line = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > width - 100 && i > 0) {
          ctx.fillText(line, x, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);

      toast.success("Template generated successfully!");
    } catch (error) {
      console.error("Error generating template:", error);
      toast.error("Failed to generate template.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'social-media-template.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTemplate = () => {
    setTemplate({
      title: '',
      subtitle: '',
      body: '',
      image: null,
      imageUrl: '',
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Social Media Template Generator</h2>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" name="title" value={template.title} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input type="text" id="subtitle" name="subtitle" value={template.subtitle} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="body">Body</Label>
            <Textarea id="body" name="body" value={template.body} onChange={handleInputChange} rows={5} />
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="flex justify-between">
            <Button onClick={generateTemplate} disabled={loading} className="bg-blue-500 text-white">
              {loading ? <RefreshCw className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
              Generate
            </Button>
            <Button variant="outline" onClick={resetTemplate}>Reset</Button>
          </div>
        </div>
        <div className="space-y-4">
          <canvas ref={canvasRef} className="w-full h-auto border border-gray-300" />
          <Button onClick={downloadTemplate} className="bg-green-500 text-white w-full">
            <Download className="mr-2" />
            Download Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaTemplateRefactored;
