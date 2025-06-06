import { Route, Routes } from 'react-router-dom';
import { paths } from '../../routes/routes';
import { type Character, type Episode, type Location } from '../Category';
import { PrivateRoute } from '@/components/PrivateRoute';
import { lazy } from 'react';

const HomePage = lazy(() =>
  import('@/pages/HomePage').then(module => ({
    default: module.HomePage
  }))
);
const Category = lazy(() =>
  import('@/components/Category').then(module => ({
    default: module.Category
  }))
);
const DetailsPage = lazy(() =>
  import('@/pages/DetailsPage').then(module => ({
    default: module.DetailsPage
  }))
);
const NotFound = lazy(() =>
  import('@/components/NotFound').then(module => ({
    default: module.NotFound
  }))
);

// export function LazyComponent({ data }: { data: (Character | Episode | Location)[] }) {
export function LazyComponent({ data }: { data: Character[] | Episode[] | Location[] }) {
  return (
    <Routes>
      <Route path={paths.home} element={<HomePage />} />
      <Route
        path="/:category"
        element={
          <PrivateRoute>
            <Category data={data} />
          </PrivateRoute>
        }
      />
      <Route
        path="/:category/:id"
        element={
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
