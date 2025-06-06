import { Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import type { Character, Episode, Location } from '@/components/Category';
import { Signin } from '@/components/Signin';
import { AuthProvider } from '@/context/AuthProvider';
import { LazyComponent } from '@/components/LazyComponent';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import './App.scss';

function App() {
  const [data, setData] = useState<Character[] | Episode[] | Location[]>([]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="header">
          <Navbar setData={setData} />
        </header>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route
            path="*"
            element={
              <ErrorBoundary>
                <Suspense fallback={<p>Загрузка страницы...</p>}>
                  <LazyComponent data={data} />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
