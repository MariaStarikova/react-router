import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { paths } from './routes/routes';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/components/HomePage';
import { Category } from '@/components/Category';
import type { Character, Episode, Location } from '@/components/Category';
import { DetailsPage } from '@/components/DetailsPage';
import { NotFound } from '@/components/NotFound';
import './App.css';

function App() {
  const [data, setData] = useState<Character[] | Episode[] | Location[]>([]);
  return (
    <BrowserRouter>
      <header className="header">
        <Navbar setData={setData} />
      </header>
      <Routes>
        <Route path={paths.home} element={<HomePage />} />
        <Route path="/:category" element={<Category data={data} />} />
        <Route path="/:category/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
