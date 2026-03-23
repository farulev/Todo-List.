import { createRoot, Root } from 'react-dom/client';
import { App } from './App';

const container: HTMLElement | null = document.getElementById('app');
if (container === null) {
  throw new Error('Root element not found');
}

const root: Root = createRoot(container);
root.render(<App />);
