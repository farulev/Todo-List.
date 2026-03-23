import { useState, useCallback, JSX } from 'react';
import { Todo } from './types';
import { styles } from './styles';
import { TodoInput, TodoList, TodoStats } from './components';

export const App: () => JSX.Element = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo: (text: string) => void = useCallback((text: string): void => {
    setTodos((prev: Todo[]): Todo[] => {
      const nextId: number =
        prev.length === 0
          ? 1
          : prev.reduce(
              (maxId: number, todo: Todo): number => Math.max(maxId, todo.id),
              0
            ) + 1;

      return [...prev, { id: nextId, text, completed: false }];
    });
  }, []);

  const toggleTodo: (id: number) => void = useCallback((id: number): void => {
    setTodos((prev: Todo[]): Todo[] =>
      prev.map((todo: Todo): Todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo: (id: number) => void = useCallback((id: number): void => {
    setTodos((prev: Todo[]): Todo[] => prev.filter((todo: Todo): boolean => todo.id !== id));
  }, []);

  const completedCount: number = todos.filter((t: Todo): boolean => t.completed).length;

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <header style={styles.header}>
          <h1 style={styles.title}>Todo List</h1>
          <p style={styles.subtitle}>Организуй свой день</p>
        </header>

        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {todos.length > 0 && (
          <TodoStats total={todos.length} completed={completedCount} />
        )}
      </div>
    </div>
  );
};
