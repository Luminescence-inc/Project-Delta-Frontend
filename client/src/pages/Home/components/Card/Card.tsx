/** @format */

import './Card.scss';

interface Icard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: Icard) => {
  return (
    <div className='card card-home'>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
