import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@/components';
import { ErrorBoundary } from '@/components';
import { AppRouter } from '@/components';
import { AuthProvider } from '@/context/AuthProvider';
import './App.scss';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="header">
          <Navbar />
        </header>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
