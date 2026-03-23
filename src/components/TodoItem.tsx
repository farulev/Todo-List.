import { JSX } from 'react';
import { Todo } from '../types';
import { styles } from '../styles';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: (props: TodoItemProps) => JSX.Element = ({ todo, onToggle, onDelete }: TodoItemProps): JSX.Element => {
  const handleToggle: () => void = (): void => {
    onToggle(todo.id);
  };

  const handleDelete: () => void = (): void => {
    onDelete(todo.id);
  };

  return (
    <li style={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        style={styles.checkbox}
      />
      <span style={todo.completed ? styles.todoTextCompleted : styles.todoText}>
        {todo.text}
      </span>
      <button
        onClick={handleDelete}
        style={styles.deleteButton}
      >
        Удалить
      </button>
    </li>
  );
};
