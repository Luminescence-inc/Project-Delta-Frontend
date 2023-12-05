/** @format */

import homeBgImage from 'assets/images/homebg-img.png';
import BulbIcon from 'assets/icons/bulb-icon.svg?react';
import HandshakeIcon from 'assets/icons/handshake-icon.svg?react';
import MoneybagIcon from 'assets/icons/moneybag-icon.svg?react';
import Button from 'components/Button/Button';
import Card from './components/Card/Card';

import './Home.scss';

const Home = () => {
  return (
    <div className='home'>
      <img src={homeBgImage} alt={homeBgImage} />
      <header>
        <h2>Welcome to Bizconnect</h2>
        <p>
          Connecting Global all small and medium Businesses with their customers
        </p>
        <Button label='Get Started' variant='primary' to='/onboarding' />
      </header>

      <section className='section-why'>
        <h2>Why BizConnect?</h2>

        <Card
          icon={<BulbIcon />}
          title='Discover Businesses'
          description='Shinning the spotlight on Immigrant businesses in your neighbourhood
      with ease.'
        />
        <Card
          icon={<HandshakeIcon />}
          title='Connect with Businesses'
          description='BizConnect brings the best of local services to your fingertips, engage with businesses'
        />
        <Card
          icon={<MoneybagIcon />}
          title='Transact with Businesses'
          description='Transact with connected businesses...'
        />
      </section>
    </div>
  );
};

export default Home;
