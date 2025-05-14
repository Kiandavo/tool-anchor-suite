
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckSquare, Trash2, Edit, CheckCircle, Circle, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: number;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTodoPriority, setNewTodoPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [sortBy, setSortBy] = useState<'priority' | 'created' | 'alphabetical'>('created');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      priority: newTodoPriority,
      createdAt: Date.now(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
    toast({
      title: "فعالیت اضافه شد",
      description: `"${inputValue}" به لیست اضافه شد.`,
      duration: 2000,
    });
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "فعالیت حذف شد",
      description: `"${todoToDelete?.text}" از لیست حذف شد.`,
      duration: 2000,
    });
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editingId) return;
    if (editText.trim() === '') {
      toast({
        title: "خطا",
        description: "متن فعالیت نمی‌تواند خالی باشد.",
        variant: "destructive",
      });
      return;
    }

    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null);
    setEditText('');
    toast({
      title: "فعالیت ویرایش شد",
      description: "فعالیت با موفقیت بروزرسانی شد.",
      duration: 2000,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const setPriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index - 1]] = [newTodos[index - 1], newTodos[index]];
    setTodos(newTodos);
  };

  const moveDown = (index: number) => {
    if (index === todos.length - 1) return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    if (completedCount === 0) {
      toast({
        title: "اطلاعات",
        description: "هیچ فعالیت تکمیل‌شده‌ای برای پاک کردن وجود ندارد.",
        duration: 2000,
      });
      return;
    }
    
    setTodos(todos.filter(todo => !todo.completed));
    toast({
      title: "پاکسازی انجام شد",
      description: `${completedCount} فعالیت تکمیل‌شده حذف شد.`,
      duration: 2000,
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    } else if (sortBy === 'created') {
      return a.createdAt - b.createdAt;
    } else { // alphabetical
      return a.text.localeCompare(b.text);
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'بالا';
      case 'medium': return 'متوسط';
      case 'low': return 'پایین';
      default: return '';
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <CheckSquare className="h-5 w-5" />
          فهرست کارها
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={addTodo} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="new-todo">فعالیت جدید</Label>
            <div className="flex gap-2">
              <Input
                id="new-todo"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="افزودن فعالیت جدید..."
                className="flex-1"
              />
              <Button type="submit">افزودن</Button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="priority">اولویت</Label>
            <RadioGroup 
              id="priority"
              value={newTodoPriority}
              onValueChange={(value) => setNewTodoPriority(value as 'high' | 'medium' | 'low')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="text-red-500">بالا</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="text-yellow-500">متوسط</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="text-green-500">پایین</Label>
              </div>
            </RadioGroup>
          </div>
        </form>

        <div className="flex flex-wrap justify-between items-center gap-2 pb-2 border-b">
          <div className="flex flex-wrap gap-2">
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
              انجام نشده ({todos.filter(todo => !todo.completed).length})
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              تکمیل شده ({todos.filter(todo => todo.completed).length})
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSortBy('priority')}
              className={sortBy === 'priority' ? 'bg-gray-100' : ''}
            >
              مرتب‌سازی: اولویت
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSortBy('created')}
              className={sortBy === 'created' ? 'bg-gray-100' : ''}
            >
              مرتب‌سازی: زمان ایجاد
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSortBy('alphabetical')}
              className={sortBy === 'alphabetical' ? 'bg-gray-100' : ''}
            >
              مرتب‌سازی: الفبایی
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {sortedTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              هیچ فعالیتی وجود ندارد.
            </div>
          ) : (
            sortedTodos.map((todo, index) => (
              <div 
                key={todo.id} 
                className={`flex items-center gap-2 p-3 border rounded-md ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => toggleComplete(todo.id)}
                    className="focus:outline-none"
                  >
                    {todo.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <Input 
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                      />
                      <Button size="sm" onClick={saveEdit}>ذخیره</Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>لغو</Button>
                    </div>
                  ) : (
                    <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      <span>{todo.text}</span>
                      <span className={`ms-2 text-xs ${getPriorityColor(todo.priority)}`}>
                        (اولویت: {getPriorityText(todo.priority)})
                      </span>
                    </div>
                  )}
                </div>
                
                {editingId !== todo.id && (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => moveUp(index)}
                      className="p-1 text-gray-600 hover:text-gray-900"
                      title="انتقال به بالا"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => moveDown(index)}
                      className="p-1 text-gray-600 hover:text-gray-900"
                      title="انتقال به پایین"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      title="ویرایش"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {todos.filter(todo => todo.completed).length > 0 && (
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={clearCompleted}>
              پاک کردن تکمیل‌شده‌ها
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;
