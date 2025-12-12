import React, { useState, useEffect } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { CheckSquare, Plus, Trash2, Edit2, Check, X, Calendar, Tag, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { format } from 'date-fns';
import { faIR } from 'date-fns/locale';

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  tags: string[];
  subtasks: Subtask[];
  createdAt: number;
}

const priorityConfig = {
  high: { label: 'بالا', color: 'bg-red-500/10 text-red-600 border-red-200' },
  medium: { label: 'متوسط', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
  low: { label: 'پایین', color: 'bg-green-500/10 text-green-600 border-green-200' },
};

const defaultTags = ['کار', 'شخصی', 'خرید', 'مطالعه', 'ورزش'];

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos-v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((t: Todo) => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
      }));
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date>();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [expandedTodos, setExpandedTodos] = useState<Set<string>>(new Set());

  useEffect(() => {
    localStorage.setItem('todos-v2', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      priority,
      dueDate,
      tags: selectedTags,
      subtasks: [],
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
    setSelectedTags([]);
    setDueDate(undefined);
    toast({ title: 'کار جدید اضافه شد' });
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
    toast({ title: 'کار حذف شد' });
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) return;
    setTodos(todos.map(t => 
      t.id === editingId ? { ...t, text: editText.trim() } : t
    ));
    setEditingId(null);
    setEditText('');
  };

  const addSubtask = (todoId: string) => {
    const text = prompt('متن زیرکار:');
    if (!text?.trim()) return;
    
    setTodos(todos.map(t => 
      t.id === todoId 
        ? { ...t, subtasks: [...t.subtasks, { id: Date.now().toString(), text: text.trim(), completed: false }] }
        : t
    ));
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos(todos.map(t => 
      t.id === todoId 
        ? { ...t, subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s) }
        : t
    ));
  };

  const deleteSubtask = (todoId: string, subtaskId: string) => {
    setTodos(todos.map(t => 
      t.id === todoId 
        ? { ...t, subtasks: t.subtasks.filter(s => s.id !== subtaskId) }
        : t
    ));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedTodos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearCompleted = () => {
    const count = todos.filter(t => t.completed).length;
    if (count === 0) return;
    setTodos(todos.filter(t => !t.completed));
    toast({ title: `${count} کار تکمیل‌شده حذف شد` });
  };

  // Filtering
  let filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  if (tagFilter !== 'all') {
    filteredTodos = filteredTodos.filter(t => t.tags.includes(tagFilter));
  }

  // Stats
  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;
  const completionRate = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;

  const isOverdue = (date?: Date) => {
    if (!date) return false;
    return new Date(date) < new Date(new Date().setHours(0, 0, 0, 0));
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="فهرست کارها" icon={CheckSquare} onReset={() => setTodos([])}>
        {/* Add Form */}
        <form onSubmit={addTodo} className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="کار جدید..."
              className="flex-1"
            />
            <Button type="submit" disabled={!inputValue.trim()}>
              <Plus className="h-4 w-4 ml-1" />
              افزودن
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Priority */}
            <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(priorityConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Due Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {dueDate ? format(dueDate, 'dd MMM', { locale: faIR }) : 'تاریخ'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                />
              </PopoverContent>
            </Popover>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {defaultTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            همه ({todos.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            انجام نشده ({activeCount})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            تکمیل شده ({completedCount})
          </Button>

          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-28">
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

          {completedCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCompleted} className="mr-auto text-destructive">
              <Trash2 className="h-3 w-3 ml-1" />
              پاک کردن تکمیل‌شده
            </Button>
          )}
        </div>
      </CalculatorCard>

      {/* Todo List */}
      <VisualizationCard>
        <Reorder.Group axis="y" values={filteredTodos} onReorder={setTodos} className="space-y-2">
          <AnimatePresence>
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>هیچ کاری وجود ندارد</p>
              </motion.div>
            ) : (
              filteredTodos.map((todo) => (
                <Reorder.Item key={todo.id} value={todo}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className={`p-3 rounded-lg border ${todo.completed ? 'bg-muted/30' : 'bg-card'}`}
                  >
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-5 w-5 text-muted-foreground/50 cursor-grab mt-0.5" />
                      
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => toggleComplete(todo.id)}
                        className="mt-0.5"
                      />

                      <div className="flex-1 min-w-0">
                        {editingId === todo.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              autoFocus
                              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                            />
                            <Button size="sm" onClick={saveEdit}><Check className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="h-4 w-4" /></Button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <span className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {todo.text}
                              </span>
                              <Badge variant="outline" className={priorityConfig[todo.priority].color}>
                                {priorityConfig[todo.priority].label}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {todo.dueDate && (
                                <span className={`text-xs flex items-center gap-1 ${isOverdue(todo.dueDate) && !todo.completed ? 'text-destructive' : 'text-muted-foreground'}`}>
                                  <Calendar className="h-3 w-3" />
                                  {format(new Date(todo.dueDate), 'dd MMM', { locale: faIR })}
                                </span>
                              )}
                              {todo.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                              {todo.subtasks.length > 0 && (
                                <button
                                  onClick={() => toggleExpand(todo.id)}
                                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground"
                                >
                                  {expandedTodos.has(todo.id) ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                  {todo.subtasks.filter(s => s.completed).length}/{todo.subtasks.length} زیرکار
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {editingId !== todo.id && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => addSubtask(todo.id)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(todo)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteTodo(todo.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Subtasks */}
                    <AnimatePresence>
                      {expandedTodos.has(todo.id) && todo.subtasks.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 mr-10 space-y-1 overflow-hidden"
                        >
                          {todo.subtasks.map(subtask => (
                            <div key={subtask.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                              <Checkbox
                                checked={subtask.completed}
                                onCheckedChange={() => toggleSubtask(todo.id, subtask.id)}
                              />
                              <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {subtask.text}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => deleteSubtask(todo.id, subtask.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Reorder.Item>
              ))
            )}
          </AnimatePresence>
        </Reorder.Group>
      </VisualizationCard>

      {/* Stats */}
      {todos.length > 0 && (
        <VisualizationCard title="آمار">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold">{todos.length}</div>
              <div className="text-sm text-muted-foreground">کل</div>
            </div>
            <div className="p-4 bg-green-500/10 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
              <div className="text-sm text-muted-foreground">تکمیل شده</div>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-sm text-muted-foreground">پیشرفت</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </VisualizationCard>
      )}
    </div>
  );
};

export default TodoList;
