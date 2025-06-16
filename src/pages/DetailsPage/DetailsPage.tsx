import { useLocation } from 'react-router-dom';
import { Card } from '@/components';

export function DetailsPage() {
  const location = useLocation();

  const item = location.state?.item;

  if (!item) return <p>Объект не найден</p>;

  return <Card {...item} />;
}
