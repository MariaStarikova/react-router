import { Link, useParams, useSearchParams } from 'react-router-dom';
import './Category.scss';

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

interface CategoryProps {
  data: Character[] | Episode[] | Location[];
}

export function Category(props: CategoryProps) {
  const { data } = props;
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');

  const sortedData = [...data].sort((a, b) => {
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

  const title = titleMap[category ?? ''] || '';
  return (
    <div className="category">
      <h1 className="category__title">{title}</h1>
      <div className="category__sort">
        <button onClick={() => setSearchParams({ sort: 'createdASC' })}>Сначала старые</button>
        <button onClick={() => setSearchParams({ sort: 'createdDESC' })}>Сначала новые</button>
      </div>
      <ul className="category__list">
        {sortedData.map(val => (
          <li className="category__item" key={val.id}>
            <Link className="category__link" to={`/${category}/${val.id}`}>
              <p className="category__name">{val.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
