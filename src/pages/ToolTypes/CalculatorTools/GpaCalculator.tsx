import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Trash2, Copy, Check, Award, BookOpen, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const getGradeColor = (grade: number) => {
  if (grade >= 17) return 'from-green-500 to-emerald-500';
  if (grade >= 14) return 'from-blue-500 to-cyan-500';
  if (grade >= 12) return 'from-amber-500 to-orange-500';
  return 'from-red-500 to-rose-500';
};

const getGradeLabel = (grade: number) => {
  if (grade >= 17) return 'عالی';
  if (grade >= 14) return 'خوب';
  if (grade >= 12) return 'قبول';
  if (grade >= 10) return 'مشروط';
  return 'مردود';
};

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'ریاضی ۱', grade: '18', credits: '3' },
    { id: 2, name: 'فیزیک ۱', grade: '16', credits: '3' },
    { id: 3, name: 'برنامه‌نویسی', grade: '19', credits: '2' },
  ]);
  const [copied, setCopied] = useState(false);
  const [nextId, setNextId] = useState(4);

  const result = useMemo(() => {
    let totalWeightedGrade = 0;
    let totalCredits = 0;
    const validCourses: { name: string; grade: number; credits: number }[] = [];

    for (const course of courses) {
      const grade = parseFloat(course.grade);
      const credits = parseFloat(course.credits);
      
      if (!isNaN(grade) && !isNaN(credits) && credits > 0 && grade >= 0 && grade <= 20) {
        totalWeightedGrade += grade * credits;
        totalCredits += credits;
        validCourses.push({ name: course.name || `درس ${course.id}`, grade, credits });
      }
    }

    if (totalCredits === 0) return null;

    const gpa = totalWeightedGrade / totalCredits;
    const passed = validCourses.filter(c => c.grade >= 10).length;
    const failed = validCourses.filter(c => c.grade < 10).length;

    return {
      gpa: Math.round(gpa * 100) / 100,
      totalCredits,
      totalCourses: validCourses.length,
      passed,
      failed,
      courses: validCourses,
      chartData: validCourses.map((c, i) => ({ name: c.name, grade: c.grade, fill: COLORS[i % COLORS.length] })),
      pieData: [
        { name: 'قبول', value: passed, color: '#22c55e' },
        { name: 'مردود', value: failed, color: '#ef4444' }
      ].filter(d => d.value > 0)
    };
  }, [courses]);

  const addCourse = () => {
    setCourses([...courses, { id: nextId, name: '', grade: '', credits: '' }]);
    setNextId(nextId + 1);
  };

  const removeCourse = (id: number) => {
    if (courses.length <= 1) {
      toast.error('حداقل یک درس باید وجود داشته باشد');
      return;
    }
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const handleReset = () => {
    setCourses([{ id: 1, name: '', grade: '', credits: '' }]);
    setNextId(2);
    toast.success('فرم پاک شد');
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `معدل: ${result.gpa}\nتعداد واحد: ${result.totalCredits}\nدروس قبول: ${result.passed}\nدروس مردود: ${result.failed}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('نتیجه کپی شد');
  };

  return (
    <CalculatorCard
      title="محاسبه‌گر معدل تحصیلی"
      icon={GraduationCap}
      onReset={handleReset}
    >
      <div className="space-y-6">
        {/* Course List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-2 items-end p-3 bg-muted/30 rounded-xl border border-border/50"
              >
                <div className="col-span-12 md:col-span-4 space-y-1">
                  <Label className="text-xs text-muted-foreground">نام درس</Label>
                  <Input
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                    placeholder={`درس ${index + 1}`}
                    className="text-sm"
                  />
                </div>
                <div className="col-span-5 md:col-span-3 space-y-1">
                  <Label className="text-xs text-muted-foreground">نمره (۰-۲۰)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="20"
                    step="0.25"
                    value={course.grade}
                    onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                    placeholder="۱۸"
                    dir="ltr"
                    className="text-sm"
                  />
                </div>
                <div className="col-span-5 md:col-span-3 space-y-1">
                  <Label className="text-xs text-muted-foreground">واحد</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={course.credits}
                    onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                    placeholder="۳"
                    dir="ltr"
                    className="text-sm"
                  />
                </div>
                <div className="col-span-2 md:col-span-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                    className="w-full h-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Course Button */}
        <Button
          variant="outline"
          onClick={addCourse}
          className="w-full gap-2"
        >
          <Plus size={18} />
          افزودن درس
        </Button>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* GPA Display */}
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${getGradeColor(result.gpa)} text-white text-center`}>
              <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
              <p className="text-sm opacity-90 mb-1">معدل کل</p>
              <p className="text-5xl font-bold mb-2">{formatPersianNumber(result.gpa)}</p>
              <p className="text-lg opacity-90">{getGradeLabel(result.gpa)}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'تعداد دروس', value: result.totalCourses, icon: BookOpen },
                { label: 'مجموع واحدها', value: result.totalCredits, icon: TrendingUp },
                { label: 'دروس قبول', value: result.passed, color: 'text-green-500' },
                { label: 'دروس مردود', value: result.failed, color: 'text-red-500' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-card rounded-xl border border-border text-center"
                >
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || 'text-primary'}`}>
                    {formatPersianNumber(stat.value)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Grades Bar Chart */}
              <VisualizationCard title="نمرات دروس">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={result.chartData} layout="vertical">
                    <XAxis type="number" domain={[0, 20]} stroke="hsl(var(--muted-foreground))" />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      width={80} 
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatPersianNumber(value), 'نمره']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="grade" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </VisualizationCard>

              {/* Pass/Fail Pie Chart */}
              {result.pieData.length > 0 && (
                <VisualizationCard title="وضعیت دروس">
                  <div className="flex items-center justify-center gap-8">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={result.pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {result.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2">
                      {result.pieData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.name}: {formatPersianNumber(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </VisualizationCard>
              )}
            </div>

            {/* Copy Button */}
            <Button
              variant="outline"
              onClick={handleCopy}
              className="w-full gap-2"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'کپی شد' : 'کپی نتیجه'}
            </Button>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}
