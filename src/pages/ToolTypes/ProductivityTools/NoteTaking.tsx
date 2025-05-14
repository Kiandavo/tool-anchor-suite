
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Edit, Save, Plus, FolderPlus, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: number;
  updatedAt: number;
}

const NoteTaking: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [categories, setCategories] = useState<string[]>(() => {
    const savedCategories = localStorage.getItem('note-categories');
    return savedCategories ? JSON.parse(savedCategories) : ['یادداشت‌ها', 'کار', 'شخصی'];
  });
  
  const [newCategory, setNewCategory] = useState<string>('');
  const [showNewCategory, setShowNewCategory] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('note-categories', JSON.stringify(categories));
  }, [categories]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'یادداشت جدید',
      content: '',
      category: categories[0] || 'یادداشت‌ها',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
    
    toast({
      title: "یادداشت جدید",
      description: "یک یادداشت جدید ایجاد شد.",
      duration: 2000,
    });
  };

  const deleteNote = (id: string) => {
    const noteToDelete = notes.find(note => note.id === id);
    setNotes(notes.filter(note => note.id !== id));
    
    if (activeNote?.id === id) {
      setActiveNote(null);
    }
    
    toast({
      title: "یادداشت حذف شد",
      description: `"${noteToDelete?.title}" از لیست حذف شد.`,
      duration: 2000,
    });
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: Date.now() } 
        : note
    ));
  };

  const addCategory = () => {
    if (newCategory.trim() === '') return;
    
    if (categories.includes(newCategory.trim())) {
      toast({
        title: "خطا",
        description: "این دسته‌بندی قبلاً اضافه شده است.",
        variant: "destructive",
      });
      return;
    }
    
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    setShowNewCategory(false);
    
    toast({
      title: "دسته‌بندی اضافه شد",
      description: `"${newCategory}" به دسته‌بندی‌ها اضافه شد.`,
      duration: 2000,
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fa-IR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeFilter === 'all' || note.category === activeFilter;
    
    return matchesSearch && matchesCategory;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Pencil className="h-5 w-5" />
          یادداشت‌برداری
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">یادداشت‌ها</h3>
              <Button onClick={createNewNote} size="sm" className="flex gap-1 items-center">
                <Plus className="h-4 w-4" /> جدید
              </Button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="جستجو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeFilter} onValueChange={setActiveFilter}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">همه</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="flex-1">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {!showNewCategory ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNewCategory(true)}
                className="flex gap-1 items-center w-full"
              >
                <FolderPlus className="h-4 w-4" /> دسته‌بندی جدید
              </Button>
            ) : (
              <div className="flex gap-2 mt-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="نام دسته‌بندی"
                  className="flex-1"
                />
                <Button size="sm" onClick={addCategory}>افزودن</Button>
                <Button size="sm" variant="outline" onClick={() => setShowNewCategory(false)}>لغو</Button>
              </div>
            )}

            <div className="border rounded-md overflow-hidden mt-4 h-[400px] overflow-y-auto">
              {sortedNotes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'هیچ یادداشتی پیدا نشد.' : 'هیچ یادداشتی وجود ندارد.'}
                </div>
              ) : (
                <div className="divide-y">
                  {sortedNotes.map((note) => (
                    <div 
                      key={note.id} 
                      className={`p-3 cursor-pointer hover:bg-gray-50 ${
                        activeNote?.id === note.id ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => setActiveNote(note)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium truncate">{note.title}</div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 truncate">{note.content || 'بدون محتوا'}</div>
                      <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                        <span>{note.category}</span>
                        <span>{formatDate(note.updatedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            {activeNote ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">ویرایش یادداشت</h3>
                  <div className="text-sm text-gray-500">
                    آخرین ویرایش: {formatDate(activeNote.updatedAt)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="note-title">عنوان</Label>
                    <Input 
                      id="note-title"
                      value={activeNote.title}
                      onChange={(e) => updateNote({ ...activeNote, title: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="note-category">دسته‌بندی</Label>
                    <select 
                      id="note-category"
                      value={activeNote.category}
                      onChange={(e) => updateNote({ ...activeNote, category: e.target.value })}
                      className="w-full border border-input bg-background rounded-md px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="note-content">محتوا</Label>
                    <Textarea 
                      id="note-content"
                      value={activeNote.content}
                      onChange={(e) => updateNote({ ...activeNote, content: e.target.value })}
                      rows={10}
                      placeholder="متن یادداشت خود را اینجا بنویسید..."
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={() => {
                        updateNote(activeNote);
                        toast({
                          title: "یادداشت ذخیره شد",
                          description: "تغییرات شما با موفقیت ذخیره شد.",
                          duration: 2000,
                        });
                      }}
                      className="flex gap-1 items-center"
                    >
                      <Save className="h-4 w-4" /> ذخیره
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-gray-500">
                <Edit className="h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">یادداشتی انتخاب نشده است</h3>
                <p className="mb-4">لطفاً یک یادداشت را انتخاب کنید یا یک یادداشت جدید ایجاد کنید.</p>
                <Button onClick={createNewNote}>ایجاد یادداشت جدید</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteTaking;
