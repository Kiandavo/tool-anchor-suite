
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { GradeEntry } from "@/utils/calculator/types";

const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<GradeEntry[]>([
    { course: 'درس 1', grade: 18, credits: 3 },
    { course: 'درس 2', grade: 16, credits: 2 },
  ]);
  const [gpa, setGpa] = useState<string>('17.4');
  const [totalCredits, setTotalCredits] = useState<number>(5);

  const handleAddCourse = () => {
    setCourses([...courses, { course: `درس ${courses.length + 1}`, grade: 0, credits: 0 }]);
  };

  const handleRemoveCourse = (index: number) => {
    if (courses.length > 1) {
      const newCourses = [...courses];
      newCourses.splice(index, 1);
      setCourses(newCourses);
    } else {
      toast({
        title: "خطا",
        description: "حداقل یک درس باید وجود داشته باشد.",
        duration: 2000,
      });
    }
  };

  const handleCourseChange = (index: number, field: keyof GradeEntry, value: string) => {
    const newCourses = [...courses];
    
    if (field === 'course') {
      newCourses[index][field] = value;
    } else {
      // Parse value as number for grade and credits
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        newCourses[index][field] = numValue;
      }
    }
    
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalWeightedGrade = 0;
    let totalCred = 0;

    for (const course of courses) {
      if (course.credits > 0) {
        totalWeightedGrade += course.grade * course.credits;
        totalCred += course.credits;
      }
    }

    if (totalCred === 0) {
      toast({
        title: "خطا",
        description: "واحدهای درسی باید بیشتر از صفر باشد.",
        variant: "destructive",
      });
      return;
    }

    const calculatedGpa = totalWeightedGrade / totalCred;
    setGpa(calculatedGpa.toFixed(2));
    setTotalCredits(totalCred);

    toast({
      title: "محاسبه شد",
      description: `معدل شما ${calculatedGpa.toFixed(2)} می‌باشد.`,
    });
  };

  const copyResult = () => {
    navigator.clipboard.writeText(`معدل: ${gpa} (تعداد واحد: ${totalCredits})`);
    toast({
      title: "کپی شد!",
      description: "معدل در کلیپ‌بورد ذخیره شد.",
      duration: 2000,
    });
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <School className="h-5 w-5" />
          محاسبه‌گر معدل
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <Label htmlFor={`course-${index}`}>نام درس</Label>
                <Input
                  id={`course-${index}`}
                  value={course.course}
                  onChange={(e) => handleCourseChange(index, 'course', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`grade-${index}`}>نمره (0-20)</Label>
                <Input
                  id={`grade-${index}`}
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={course.grade}
                  onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`credits-${index}`}>تعداد واحد</Label>
                <Input
                  id={`credits-${index}`}
                  type="number"
                  min="0"
                  step="0.5"
                  value={course.credits}
                  onChange={(e) => handleCourseChange(index, 'credits', e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  variant="destructive" 
                  onClick={() => handleRemoveCourse(index)}
                  className="w-full"
                >
                  حذف
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAddCourse} variant="outline" className="flex-1">
            افزودن درس
          </Button>
          <Button onClick={calculateGPA} className="flex-1">
            محاسبه معدل
          </Button>
        </div>

        <div className="space-y-2">
          <Label>نتیجه</Label>
          <div className="flex gap-2">
            <div className="p-3 border rounded-md flex-1 bg-gray-50">
              معدل: {gpa} (تعداد واحد: {totalCredits})
            </div>
            <Button onClick={copyResult}>
              کپی
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GpaCalculator;
