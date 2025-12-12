import React, { useState, useEffect, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { StickyNote, Plus, Trash2, Search, FolderPlus, Pin, Copy, Download, Tag, FileText, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  createdAt: number;
  updatedAt: number;
}

const defaultCategories = ['یادداشت‌ها', 'کار', 'شخصی', 'ایده‌ها'];
const defaultTags = ['مهم', 'فوری', 'پروژه', 'مطالعه', 'جلسه'];

const NoteTaking: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes-v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('note-categories-v2');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    localStorage.setItem('notes-v2', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('note-categories-v2', JSON.stringify(categories));
  }, [categories]);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'یادداشت جدید',
      content: '',
      category: categories[0],
      tags: [],
      isPinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    toast({ title: 'یادداشت جدید ایجاد شد' });
  };

  const updateNote = (updates: Partial<Note>) => {
    if (!activeNote) return;
    const updated = { ...activeNote, ...updates, updatedAt: Date.now() };
    setActiveNote(updated);
    setNotes(notes.map(n => n.id === updated.id ? updated : n));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
    toast({ title: 'یادداشت حذف شد' });
  };

  const togglePin = (id: string) => {
    setNotes(notes.map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    ));
  };

  const toggleTag = (tag: string) => {
    if (!activeNote) return;
    const newTags = activeNote.tags.includes(tag)
      ? activeNote.tags.filter(t => t !== tag)
      : [...activeNote.tags, tag];
    updateNote({ tags: newTags });
  };

  const addCategory = () => {
    if (!newCategory.trim() || categories.includes(newCategory.trim())) return;
    setCategories([...categories, newCategory.trim()]);
    setNewCategory('');
    setShowNewCategory(false);
    toast({ title: 'دسته‌بندی اضافه شد' });
  };

  const copyNote = () => {
    if (!activeNote) return;
    navigator.clipboard.writeText(`${activeNote.title}\n\n${activeNote.content}`);
    toast({ title: 'یادداشت کپی شد' });
  };

  const exportNote = () => {
    if (!activeNote) return;
    const content = `# ${activeNote.title}\n\n${activeNote.content}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'یادداشت دانلود شد' });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const getCharCount = (text: string) => {
    return text.length;
  };

  // Filtering and sorting
  const filteredNotes = useMemo(() => {
    let result = notes;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(n => 
        n.title.toLowerCase().includes(term) || 
        n.content.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== 'all') {
      result = result.filter(n => n.category === categoryFilter);
    }

    if (tagFilter !== 'all') {
      result = result.filter(n => n.tags.includes(tagFilter));
    }

    // Sort: pinned first, then by update date
    return result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
  }, [notes, searchTerm, categoryFilter, tagFilter]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-4">
          <CalculatorCard title="یادداشت‌ها" icon={StickyNote}>
            <Button onClick={createNote} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              یادداشت جدید
            </Button>

            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو..."
                className="pr-9"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={tagFilter} onValueChange={setTagFilter}>
                <SelectTrigger className="flex-1">
                  <Tag className="h-3 w-3 ml-1" />
                  <SelectValue placeholder="برچسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  {defaultTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* New Category */}
            {!showNewCategory ? (
              <Button variant="ghost" size="sm" onClick={() => setShowNewCategory(true)} className="w-full gap-2">
                <FolderPlus className="h-4 w-4" />
                دسته‌بندی جدید
              </Button>
            ) : (
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="نام دسته‌بندی"
                  onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                />
                <Button size="sm" onClick={addCategory}>افزودن</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowNewCategory(false)}>×</Button>
              </div>
            )}
          </CalculatorCard>

          {/* Notes List */}
          <VisualizationCard>
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              <AnimatePresence>
                {filteredNotes.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    <p>یادداشتی یافت نشد</p>
                  </div>
                ) : (
                  filteredNotes.map(note => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onClick={() => setActiveNote(note)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        activeNote?.id === note.id 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {note.isPinned && <Pin className="h-3 w-3 text-primary" />}
                          <span className="font-medium truncate">{note.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {note.content || 'بدون محتوا'}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="secondary" className="text-xs">{note.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(note.updatedAt)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </VisualizationCard>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {activeNote ? (
            <VisualizationCard>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <Input
                    value={activeNote.title}
                    onChange={(e) => updateNote({ title: e.target.value })}
                    className="text-lg font-bold border-0 shadow-none p-0 h-auto focus-visible:ring-0"
                    placeholder="عنوان..."
                  />
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePin(activeNote.id)}
                      className={activeNote.isPinned ? 'text-primary' : ''}
                    >
                      <Pin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={copyNote}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={exportNote}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3">
                  <Select
                    value={activeNote.category}
                    onValueChange={(v) => updateNote({ category: v })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex flex-wrap gap-1">
                    {defaultTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={activeNote.tags.includes(tag) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <Textarea
                  value={activeNote.content}
                  onChange={(e) => updateNote({ content: e.target.value })}
                  placeholder="یادداشت خود را اینجا بنویسید..."
                  className="min-h-[400px] resize-none"
                />

                {/* Footer stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <AlignLeft className="h-3 w-3" />
                      {getWordCount(activeNote.content)} کلمه
                    </span>
                    <span>{getCharCount(activeNote.content)} کاراکتر</span>
                  </div>
                  <span>آخرین ویرایش: {formatDate(activeNote.updatedAt)}</span>
                </div>
              </div>
            </VisualizationCard>
          ) : (
            <VisualizationCard>
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <StickyNote className="h-16 w-16 mb-4 opacity-30" />
                <h3 className="text-lg font-medium mb-2">یادداشتی انتخاب نشده</h3>
                <p className="mb-4 text-sm">یک یادداشت را انتخاب کنید یا یادداشت جدید بسازید</p>
                <Button onClick={createNote} className="gap-2">
                  <Plus className="h-4 w-4" />
                  یادداشت جدید
                </Button>
              </div>
            </VisualizationCard>
          )}
        </div>
      </div>

      {/* Stats */}
      {notes.length > 0 && (
        <VisualizationCard title="آمار">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold">{notes.length}</div>
              <div className="text-sm text-muted-foreground">کل یادداشت‌ها</div>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold">{notes.filter(n => n.isPinned).length}</div>
              <div className="text-sm text-muted-foreground">سنجاق شده</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">دسته‌بندی</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold">
                {notes.reduce((acc, n) => acc + getWordCount(n.content), 0)}
              </div>
              <div className="text-sm text-muted-foreground">کل کلمات</div>
            </div>
          </div>
        </VisualizationCard>
      )}
    </div>
  );
};

export default NoteTaking;
