
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { LayoutGrid, Plus, X, Edit, AlertTriangle, Archive, MoreHorizontal, Trash2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Types
type Priority = 'low' | 'medium' | 'high' | 'urgent';
type Column = 'todo' | 'inProgress' | 'done';

interface Task {
  id: string;
  content: string;
  description: string;
  priority: Priority;
  column: Column;
  createdAt: number;
}

interface BoardState {
  tasks: Task[];
}

const columnInfo = {
  todo: { title: 'کارها', color: 'bg-gray-100' },
  inProgress: { title: 'در حال انجام', color: 'bg-blue-50' },
  done: { title: 'تکمیل شده', color: 'bg-green-50' },
};

const priorityInfo: Record<Priority, { label: string; color: string }> = {
  low: { label: 'کم', color: 'bg-gray-100 text-gray-700' },
  medium: { label: 'متوسط', color: 'bg-blue-100 text-blue-700' },
  high: { label: 'زیاد', color: 'bg-amber-100 text-amber-700' },
  urgent: { label: 'فوری', color: 'bg-red-100 text-red-700' },
};

export default function ProjectBoard() {
  const { toast } = useToast();
  const [board, setBoard] = useState<BoardState>({
    tasks: [],
  });
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('medium');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBoard = localStorage.getItem('projectBoard');
    if (savedBoard) {
      try {
        setBoard(JSON.parse(savedBoard));
      } catch (error) {
        console.error('Error parsing saved board:', error);
      }
    } else {
      // First time usage - add sample tasks
      const initialTasks: Task[] = [
        {
          id: '1',
          content: 'به برد پروژه خوش آمدید',
          description: 'با استفاده از این ابزار می‌توانید کارهای خود را سازماندهی کنید.',
          priority: 'medium',
          column: 'todo',
          createdAt: Date.now()
        },
        {
          id: '2',
          content: 'کارها را می‌توانید جابجا کنید',
          description: 'کشیدن و رها کردن کارت‌ها بین ستون‌ها را امتحان کنید.',
          priority: 'low',
          column: 'inProgress',
          createdAt: Date.now()
        },
        {
          id: '3',
          content: 'اطلاعات شما ذخیره می‌شود',
          description: 'اطلاعات برد به صورت خودکار در مرورگر شما ذخیره می‌شود.',
          priority: 'high',
          column: 'done',
          createdAt: Date.now()
        }
      ];
      setBoard({ tasks: initialTasks });
    }
  }, []);
  
  // Save board data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('projectBoard', JSON.stringify(board));
  }, [board]);
  
  // Filter tasks by column
  const getTasksByColumn = (column: Column): Task[] => {
    return board.tasks.filter(task => task.column === column);
  };
  
  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination, or if the task was dropped in the same position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    
    // Find the task
    const task = board.tasks.find(t => t.id === draggableId);
    if (!task) return;
    
    // Create new tasks array
    const newTasks = board.tasks.filter(t => t.id !== draggableId);
    
    // Update task's column
    const updatedTask = {
      ...task,
      column: destination.droppableId as Column
    };
    
    // Insert the task at the new position
    const targetColumnTasks = getTasksByColumn(updatedTask.column);
    const updatedColumnTasks = [
      ...targetColumnTasks.slice(0, destination.index),
      updatedTask,
      ...targetColumnTasks.slice(destination.index)
    ];
    
    // Create final tasks array
    const finalTasks = [
      ...newTasks.filter(t => t.column !== updatedTask.column),
      ...updatedColumnTasks
    ];
    
    // Update state
    setBoard({
      ...board,
      tasks: finalTasks
    });
    
    // Show toast if moving to "done" column
    if (destination.droppableId === 'done' && source.droppableId !== 'done') {
      toast({
        title: "کار تکمیل شد",
        description: `کار "${updatedTask.content}" به ستون تکمیل شده منتقل شد.`,
      });
    }
  };
  
  // Add new task
  const addTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "خطا",
        description: "عنوان کار را وارد کنید.",
        variant: "destructive"
      });
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      content: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      priority: newTaskPriority,
      column: 'todo',
      createdAt: Date.now()
    };
    
    setBoard({
      ...board,
      tasks: [...board.tasks, newTask]
    });
    
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskPriority('medium');
    setIsAddingTask(false);
    
    toast({
      title: "کار اضافه شد",
      description: `کار جدید "${newTask.content}" به ستون کارها اضافه شد.`,
    });
  };
  
  // Update task
  const updateTask = () => {
    if (!editingTask || !editingTask.content.trim()) {
      toast({
        title: "خطا",
        description: "عنوان کار را وارد کنید.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedTasks = board.tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    );
    
    setBoard({
      ...board,
      tasks: updatedTasks
    });
    
    setEditingTask(null);
    
    toast({
      title: "کار به‌روزرسانی شد",
      description: "تغییرات شما با موفقیت ذخیره شد.",
    });
  };
  
  // Delete task
  const deleteTask = (taskId: string) => {
    const taskToDelete = board.tasks.find(task => task.id === taskId);
    if (!taskToDelete) return;
    
    setBoard({
      ...board,
      tasks: board.tasks.filter(task => task.id !== taskId)
    });
    
    toast({
      title: "کار حذف شد",
      description: `کار "${taskToDelete.content}" با موفقیت حذف شد.`,
      variant: "destructive"
    });
  };
  
  // Clear all tasks in a column
  const clearColumn = (column: Column) => {
    const tasksToDelete = board.tasks.filter(task => task.column === column);
    if (tasksToDelete.length === 0) return;
    
    setBoard({
      ...board,
      tasks: board.tasks.filter(task => task.column !== column)
    });
    
    toast({
      title: "ستون پاکسازی شد",
      description: `${tasksToDelete.length} کار از ستون ${columnInfo[column].title} حذف شد.`,
      variant: "destructive"
    });
  };

  // Add @hello-pangea/dnd dependency
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@hello-pangea/dnd@latest/dist/hello-pangea-dnd.min.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="p-4">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-b from-blue-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-6 h-6 text-blue-600" />
              <CardTitle>برد پروژه</CardTitle>
            </div>
            <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  کار جدید
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>افزودن کار جدید</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">عنوان</label>
                    <Input 
                      id="title" 
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="عنوان کار را وارد کنید"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">توضیحات</label>
                    <Textarea 
                      id="description" 
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      placeholder="توضیحات کار را وارد کنید (اختیاری)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">اولویت</label>
                    <Select value={newTaskPriority} onValueChange={(value) => setNewTaskPriority(value as Priority)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(priorityInfo).map(([key, info]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${key === 'low' ? 'bg-gray-400' : key === 'medium' ? 'bg-blue-400' : key === 'high' ? 'bg-amber-400' : 'bg-red-400'}`} />
                              {info.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setIsAddingTask(false)}>انصراف</Button>
                    <Button onClick={addTask}>افزودن کار</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(columnInfo).map(([columnId, column]) => (
                <div key={columnId} className={`${column.color} rounded-md p-2 h-full`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium flex items-center gap-1">
                      {column.title}
                      <Badge variant="outline">{getTasksByColumn(columnId as Column).length}</Badge>
                    </h3>
                    
                    {getTasksByColumn(columnId as Column).length > 0 && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-red-500">
                            <X size={14} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>پاکسازی ستون {column.title}</AlertDialogTitle>
                            <AlertDialogDescription>
                              آیا مطمئن هستید که می‌خواهید تمام کارهای این ستون را حذف کنید؟
                              این عملیات قابل بازگشت نیست.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>انصراف</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => clearColumn(columnId as Column)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              حذف
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                  
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[200px] h-full"
                      >
                        {getTasksByColumn(columnId as Column).map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white rounded-md p-3 mb-2 shadow-sm border border-gray-100 ${
                                  snapshot.isDragging ? 'shadow-md' : ''
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-sm">{task.content}</h4>
                                  <div className="flex items-center">
                                    <Badge className={priorityInfo[task.priority].color}>
                                      {priorityInfo[task.priority].label}
                                    </Badge>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                                          <MoreHorizontal size={16} />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <DropdownMenuItem
                                              onSelect={(e) => {
                                                e.preventDefault();
                                                setEditingTask(task);
                                              }}
                                            >
                                              <Edit size={14} className="mr-2" />
                                              ویرایش
                                            </DropdownMenuItem>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>ویرایش کار</DialogTitle>
                                            </DialogHeader>
                                            {editingTask && (
                                              <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                  <label htmlFor="edit-title" className="text-sm font-medium">عنوان</label>
                                                  <Input 
                                                    id="edit-title" 
                                                    value={editingTask.content}
                                                    onChange={(e) => setEditingTask({...editingTask, content: e.target.value})}
                                                  />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                  <label htmlFor="edit-description" className="text-sm font-medium">توضیحات</label>
                                                  <Textarea 
                                                    id="edit-description" 
                                                    value={editingTask.description}
                                                    onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                                                  />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                  <label htmlFor="edit-priority" className="text-sm font-medium">اولویت</label>
                                                  <Select 
                                                    value={editingTask.priority} 
                                                    onValueChange={(value) => setEditingTask({...editingTask, priority: value as Priority})}
                                                  >
                                                    <SelectTrigger>
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      {Object.entries(priorityInfo).map(([key, info]) => (
                                                        <SelectItem key={key} value={key}>
                                                          <div className="flex items-center gap-2">
                                                            <span className={`w-2 h-2 rounded-full ${key === 'low' ? 'bg-gray-400' : key === 'medium' ? 'bg-blue-400' : key === 'high' ? 'bg-amber-400' : 'bg-red-400'}`} />
                                                            {info.label}
                                                          </div>
                                                        </SelectItem>
                                                      ))}
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                                
                                                <div className="flex justify-end gap-2 pt-2">
                                                  <Button variant="outline" onClick={() => setEditingTask(null)}>انصراف</Button>
                                                  <Button onClick={updateTask}>ذخیره تغییرات</Button>
                                                </div>
                                              </div>
                                            )}
                                          </DialogContent>
                                        </Dialog>
                                        
                                        <AlertDialog>
                                          <AlertDialogTrigger asChild>
                                            <DropdownMenuItem
                                              onSelect={(e) => e.preventDefault()}
                                              className="text-red-500 focus:text-red-500"
                                            >
                                              <Trash2 size={14} className="mr-2" />
                                              حذف
                                            </DropdownMenuItem>
                                          </AlertDialogTrigger>
                                          <AlertDialogContent>
                                            <AlertDialogHeader>
                                              <AlertDialogTitle>حذف کار</AlertDialogTitle>
                                              <AlertDialogDescription>
                                                آیا مطمئن هستید که می‌خواهید این کار را حذف کنید؟
                                                این عملیات قابل بازگشت نیست.
                                              </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                              <AlertDialogCancel>انصراف</AlertDialogCancel>
                                              <AlertDialogAction 
                                                onClick={() => deleteTask(task.id)}
                                                className="bg-red-500 hover:bg-red-600"
                                              >
                                                حذف
                                              </AlertDialogAction>
                                            </AlertDialogFooter>
                                          </AlertDialogContent>
                                        </AlertDialog>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </div>
                                {task.description && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        
                        {getTasksByColumn(columnId as Column).length === 0 && (
                          <div className="flex flex-col items-center justify-center h-full min-h-[100px] text-gray-400 text-sm">
                            <div className="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                              <Info size={20} />
                            </div>
                            <p>موردی وجود ندارد</p>
                            <p className="text-xs">برای افزودن، کار جدید بسازید یا از ستون دیگر بکشید</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </CardContent>
        
        <CardFooter className="bg-gray-50 text-xs text-gray-500 py-3">
          <p>از این برد برای مدیریت کارها و وظایف پروژه‌های خود استفاده کنید.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
