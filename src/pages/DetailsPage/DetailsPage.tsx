import { useParams } from 'react-router-dom';
import { characters } from '@/data/characters';
import { episode } from '@/data/episode';
import { location } from '@/data/location';
import { Card } from '@/components/Card';

export function DetailsPage() {
  const { category, id } = useParams();

  const dataMap = {
    characters,
    episodes: episode,
    locations: location
  };

  const data = dataMap[category as keyof typeof dataMap];
  const item = data?.find(el => el.id === Number(id));

  if (!item) return <p>Объект не найден</p>;

  return <Card {...item} />;
}
