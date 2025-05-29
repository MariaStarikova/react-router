interface CardProps {
  id: number;
  name: string;
  created: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  image?: string;
  air_date?: string;
  episode?: string;
  dimension?: string;
}

export function Card(props: CardProps) {
  const { name, created, status, species, type, gender, image, air_date, episode, dimension } =
    props;
  return (
    <div>
      <h2>{name}</h2>
      <div>
        {image && <img src={image} />}
        <div>
          {status && <p>Статус: {status}</p>}
          {species && <p>Вид: {species}</p>}
          {type && <p>Тип: {type}</p>}
          {gender && <p>Пол: {gender}</p>}
          {air_date && <p>Дата выхода в эфир: {air_date}</p>}
          {episode && <p>Эпизод: {episode}</p>}
          {dimension && <p>Измерение: {dimension}</p>}
          <p>Создано: {created}</p>
        </div>
      </div>
    </div>
  );
}
