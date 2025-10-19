// File: apps/web/components/TaskManager.tsx
'use client';
import { useState, useEffect } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  images?: string[];
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [errors, setErrors] = useState<{title?: string; description?: string; dueDate?: string}>({});
  
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState<'title' | 'description' | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        if (activeField === 'title') {
          setTitle(prev => prev + text);
        } else if (activeField === 'description') {
          setDescription(prev => prev + text);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setActiveField(null);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    }
  }, [activeField, isListening]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
    setLoading(false);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startListening = (field: 'title' | 'description') => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }
    
    setIsListening(true);
    setActiveField(field);
    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
    setActiveField(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const fileArray = Array.from(files);
    setImages(prev => [...prev, ...fileArray]);
    
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('dueDate', dueDate);
      
      images.forEach((image, index) => {
        formData.append('images', image);
      });
      
      await fetch('/api/tasks', {
        method: 'POST',
        body: formData,
      });
      
      setTitle('');
      setDescription('');
      setDueDate('');
      setImages([]);
      setImagePreviews([]);
      setErrors({});
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setLoading(true);
    try {
      await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
    setLoading(false);
  };

  const handleToggleStatus = async (task: Task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    setLoading(true);
    try {
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task._id, status: newStatus }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    setLoading(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const isOverdue = (task: Task) => {
    return new Date(task.dueDate) < new Date() && task.status === 'pending';
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => isOverdue(t)).length,
  };

  const styles = {
    container: {
      background: '#f8fafc',
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '2rem'
    },
    titleSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    addButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      transition: 'transform 0.2s'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
      transition: 'transform 0.2s'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '800',
      marginBottom: '0.25rem'
    },
    statLabel: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    filterSection: {
      background: 'white',
      borderRadius: '16px',
      padding: '1rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    filterLabel: {
      fontWeight: '600',
      color: '#475569',
      fontSize: '0.9rem'
    },
    filterButton: {
      padding: '0.5rem 1.25rem',
      borderRadius: '10px',
      border: 'none',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s',
      textTransform: 'capitalize' as const
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },
    modalContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto' as const,
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#64748b',
      padding: '0.25rem',
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      transition: 'background 0.2s'
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.25rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#475569',
      fontWeight: '600',
      fontSize: '0.875rem'
    },
    inputWrapper: {
      position: 'relative' as const
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      paddingRight: '3rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box' as const,
      transition: 'border-color 0.2s'
    },
    inputError: {
      width: '100%',
      padding: '0.75rem',
      paddingRight: '3rem',
      border: '2px solid #ef4444',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      background: '#fef2f2',
      boxSizing: 'border-box' as const
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      paddingRight: '3rem',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box' as const,
      resize: 'vertical' as const,
      minHeight: '100px',
      transition: 'border-color 0.2s'
    },
    textareaError: {
      width: '100%',
      padding: '0.75rem',
      paddingRight: '3rem',
      border: '2px solid #ef4444',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      background: '#fef2f2',
      boxSizing: 'border-box' as const,
      resize: 'vertical' as const,
      minHeight: '100px'
    },
    voiceButton: {
      position: 'absolute' as const,
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: isListening ? '#ef4444' : '#10b981',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      padding: '8px 12px',
      borderRadius: '8px',
      color: 'white',
      transition: 'all 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    voiceButtonTextarea: {
      position: 'absolute' as const,
      right: '12px',
      top: '16px',
      background: isListening ? '#ef4444' : '#10b981',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.25rem',
      padding: '8px 12px',
      borderRadius: '8px',
      color: 'white',
      transition: 'all 0.2s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '0.8rem',
      marginTop: '0.5rem',
      display: 'block'
    },
    imagePreviewContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '0.75rem',
      marginTop: '0.75rem'
    },
    imagePreview: {
      position: 'relative' as const,
      width: '100%',
      paddingBottom: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid #e2e8f0'
    },
    imagePreviewImg: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const
    },
    removeImageButton: {
      position: 'absolute' as const,
      top: '4px',
      right: '4px',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    },
    submitButton: {
      padding: '0.875rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
      transition: 'transform 0.2s'
    },
    submitButtonDisabled: {
      padding: '0.875rem',
      background: '#cbd5e0',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '700',
      cursor: 'not-allowed'
    },
    tasksGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '1.25rem'
    },
    taskCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column' as const
    },
    taskCardOverdue: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
      border: '2px solid #ef4444',
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column' as const
    },
    taskCardCompleted: {
      background: '#f8fafc',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0',
      opacity: 0.7,
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column' as const
    },
    taskTitle: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    taskTitleCompleted: {
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#94a3b8',
      marginBottom: '0.5rem',
      textDecoration: 'line-through'
    },
    taskDescription: {
      fontSize: '0.9375rem',
      color: '#64748b',
      marginBottom: '1rem',
      lineHeight: '1.5'
    },
    taskDescriptionCompleted: {
      fontSize: '0.9375rem',
      color: '#cbd5e0',
      marginBottom: '1rem',
      lineHeight: '1.5',
      textDecoration: 'line-through'
    },
    taskImagesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    taskImage: {
      width: '100%',
      paddingBottom: '100%',
      position: 'relative' as const,
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      border: '1px solid #e2e8f0'
    },
    taskImageImg: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const
    },
    taskFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
      paddingTop: '1rem',
      borderTop: '1px solid #e2e8f0'
    },
    taskMeta: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap' as const
    },
    badge: {
      fontSize: '0.75rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '8px',
      fontWeight: '600'
    },
    taskActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    actionButton: {
      padding: '0.5rem 0.75rem',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'transform 0.2s'
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '4rem 2rem',
      gridColumn: '1 / -1'
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: 0.3
    },
    emptyText: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#64748b',
      marginBottom: '0.5rem'
    },
    emptySubtext: {
      fontSize: '0.9375rem',
      color: '#94a3b8'
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .task-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .add-button:hover {
          transform: scale(1.05);
        }
        .action-btn:hover {
          transform: scale(1.1);
        }
        .close-btn:hover {
          background: #f1f5f9;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .input:focus, .textarea:focus {
          border-color: #667eea;
        }
        @media (max-width: 768px) {
          .tasks-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.header}>
            <div style={styles.titleSection}>
              <h1 style={styles.title}>✨ My Tasks</h1>
              <button
                onClick={() => setShowForm(true)}
                style={styles.addButton}
                className="add-button"
              >
                <span style={{ fontSize: '1.25rem' }}>+</span>
                New Task
              </button>
            </div>

            <div style={styles.statsGrid}>
              {[
                { label: 'Total Tasks', value: stats.total, color: '#3b82f6', bg: '#eff6ff' },
                { label: 'In Progress', value: stats.pending, color: '#f59e0b', bg: '#fffbeb' },
                { label: 'Completed', value: stats.completed, color: '#10b981', bg: '#f0fdf4' },
                { label: 'Overdue', value: stats.overdue, color: '#ef4444', bg: '#fef2f2' },
              ].map((stat, idx) => (
                <div key={idx} style={styles.statCard} className="stat-card">
                  <div style={{...styles.statValue, color: stat.color}}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.filterSection}>
            <span style={styles.filterLabel}>Filter:</span>
            {(['all', 'pending', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  ...styles.filterButton,
                  background: filter === f ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f1f5f9',
                  color: filter === f ? 'white' : '#475569',
                  boxShadow: filter === f ? '0 2px 8px rgba(102, 126, 234, 0.3)' : 'none'
                }}
              >
                {f === 'all' ? 'All Tasks' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div style={styles.tasksGrid} className="tasks-grid">
            {loading && (
              <div style={styles.emptyState}>
                <div style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            )}

            {!loading && filteredTasks.length === 0 && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📝</div>
                <p style={styles.emptyText}>No tasks yet</p>
                <p style={styles.emptySubtext}>
                  {filter !== 'all' ? `No ${filter} tasks found` : 'Click "New Task" to get started!'}
                </p>
              </div>
            )}

            {!loading && filteredTasks.map((task) => {
              const overdue = isOverdue(task);
              return (
                <div
                  key={task._id}
                  style={
                    task.status === 'completed'
                      ? styles.taskCardCompleted
                      : overdue
                      ? styles.taskCardOverdue
                      : styles.taskCard
                  }
                  className="task-card"
                >
                  <h3 style={task.status === 'completed' ? styles.taskTitleCompleted : styles.taskTitle}>
                    {task.title}
                  </h3>
                  <p style={task.status === 'completed' ? styles.taskDescriptionCompleted : styles.taskDescription}>
                    {task.description}
                  </p>

                  {task.images && task.images.length > 0 && (
                    <div style={styles.taskImagesGrid}>
                      {task.images.map((img, idx) => (
                        <div key={idx} style={styles.taskImage}>
                          <img
                            src={img}
                            alt={`Task ${idx + 1}`}
                            style={styles.taskImageImg}
                            onClick={() => window.open(img, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={styles.taskFooter}>
                    <div style={styles.taskMeta}>
                      <span style={{...styles.badge, background: '#f1f5f9', color: '#475569'}}>
                        📅 {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      {overdue && (
                        <span style={{...styles.badge, background: '#ef4444', color: 'white'}}>
                          ⚠️ Overdue
                        </span>
                      )}
                    </div>
                    
                    <div style={styles.taskActions}>
                      <button
                        onClick={() => handleToggleStatus(task)}
                        disabled={loading}
                        style={{
                          ...styles.actionButton,
                          background: task.status === 'pending' ? '#10b981' : '#8b5cf6'
                        }}
                        className="action-btn"
                        title={task.status === 'pending' ? 'Mark as complete' : 'Reopen task'}
                      >
                        {task.status === 'pending' ? '✓' : '↺'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(task._id)}
                        disabled={loading}
                        style={{...styles.actionButton, background: '#ef4444'}}
                        className="action-btn"
                        title="Delete task"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showForm && (
        <div style={styles.modal} onClick={() => setShowForm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Task</h2>
              <button
                onClick={() => setShowForm(false)}
                style={styles.closeButton}
                className="close-btn"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddTask} style={styles.form}>
              <div>
                <label style={styles.label}>Task Title</label>
                <div style={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder="Enter task title..."
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors({...errors, title: undefined});
                    }}
                    style={errors.title ? styles.inputError : styles.input}
                    className="input"
                  />
                  <button
                    type="button"
                    onClick={() => isListening && activeField === 'title' ? stopListening() : startListening('title')}
                    style={styles.voiceButton}
                    title={isListening && activeField === 'title' ? "Stop recording" : "Start voice input"}
                  >
                    {isListening && activeField === 'title' ? '⏹' : '🎤'}
                  </button>
                </div>
                {errors.title && (
                  <span style={styles.errorText}>{errors.title}</span>
                )}
              </div>

              <div>
                <label style={styles.label}>Description</label>
                <div style={styles.inputWrapper}>
                  <textarea
                    placeholder="Add task details..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({...errors, description: undefined});
                    }}
                    style={errors.description ? styles.textareaError : styles.textarea}
                    className="textarea"
                  />
                  <button
                    type="button"
                    onClick={() => isListening && activeField === 'description' ? stopListening() : startListening('description')}
                    style={styles.voiceButtonTextarea}
                    title={isListening && activeField === 'description' ? "Stop recording" : "Start voice input"}
                  >
                    {isListening && activeField === 'description' ? '⏹' : '🎤'}
                  </button>
                </div>
                {errors.description && (
                  <span style={styles.errorText}>{errors.description}</span>
                )}
              </div>

              <div>
                <label style={styles.label}>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    setErrors({...errors, dueDate: undefined});
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  style={errors.dueDate ? styles.inputError : styles.input}
                  className="input"
                />
                {errors.dueDate && (
                  <span style={styles.errorText}>{errors.dueDate}</span>
                )}
              </div>

              <div>
                <label style={styles.label}>Attach Images (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{...styles.input, padding: '0.5rem 0.75rem'}}
                />
                
                {imagePreviews.length > 0 && (
                  <div style={styles.imagePreviewContainer}>
                    {imagePreviews.map((preview, index) => (
                      <div key={index} style={styles.imagePreview}>
                        <img 
                          src={preview} 
                          alt={`Preview ${index}`}
                          style={styles.imagePreviewImg}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={styles.removeImageButton}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={loading ? styles.submitButtonDisabled : styles.submitButton}
                className="submit-btn"
              >
                {loading ? 'Creating Task...' : '✨ Create Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}