import { Link, useParams, useSearchParams } from 'react-router-dom';
import './Category.scss';
import { useCategoryList } from '@/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  created: string;
}

export function Category() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState('');

  const { loading, error, items, hasMore } = useCategoryList({ pageNumber, url });

  const sort = searchParams.get('sort');

  const sortedData = [...items].sort((a, b) => {
    const dateA = new Date(a.created).getTime();
    const dateB = new Date(b.created).getTime();

    if (sort === 'createdASC') {
      return dateA - dateB;
    } else if (sort === 'createdDESC') {
      return dateB - dateA;
    }

    return 0;
  });

  const titleMap: Record<string, string> = {
    characters: 'Список персонажей',
    episodes: 'Список эпизодов',
    locations: 'Список локаций'
  };

  const urlMap: Record<string, string> = {
    characters: 'https://rickandmortyapi.com/api/character',
    locations: 'https://rickandmortyapi.com/api/location',
    episodes: 'https://rickandmortyapi.com/api/episode'
  };

  const title = titleMap[category ?? ''] || '';

  const observer = useRef<IntersectionObserver | null>(null);
  const lastNodeRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevState => prevState + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    console.log('category:', category);
    console.log('urlMap[category]', category && urlMap[category]);
    if (category && urlMap[category]) {
      setUrl(urlMap[category]);
      setPageNumber(1);
    }
  }, [category]);

  return (
    <div className="category">
      <h1 className="category__title">{title}</h1>
      <div className="category__sort">
        <button onClick={() => setSearchParams({ sort: 'createdASC' })}>Сначала старые</button>
        <button onClick={() => setSearchParams({ sort: 'createdDESC' })}>Сначала новые</button>
      </div>
      <ul className="category__list">
        {sortedData.map((val, index) => {
          if (sortedData.length === index + 1) {
            return (
              <li className="category__item" key={val.id} ref={lastNodeRef}>
                <Link className="category__link" to={`/${category}/${val.id}`}>
                  <p className="category__name">{val.name}</p>
                </Link>
              </li>
            );
          } else {
            return (
              <li className="category__item" key={val.id}>
                <Link className="category__link" to={`/${category}/${val.id}`}>
                  <p className="category__name">{val.name}</p>
                </Link>
              </li>
            );
          }
        })}
        {loading && <h4>Загрузка...</h4>}
        {error && <h4>Ошибка</h4>}
      </ul>
    </div>
  );
}
