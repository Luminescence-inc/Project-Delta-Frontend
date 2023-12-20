/** @format */

import homeBgImage from 'assets/images/homebg-img.png';
import BulbIcon from 'assets/icons/bulb-icon.svg?react';
import HandshakeIcon from 'assets/icons/handshake-icon.svg?react';
import MoneybagIcon from 'assets/icons/moneybag-icon.svg?react';
import SearchIcon from 'assets/icons/mag-glass.svg?react';
import PlusIcon from 'assets/icons/uil_plus.svg?react';
import Button from 'components/Button/Button';
import Card from './components/Card/Card';

import './Home.scss';
import { useEffect, useState } from 'react';
import { JwtPayload, TOKEN_NAME } from 'types/auth';
import { isAuthenticated } from 'api/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUserBusinessProfileList } from 'api/business';
import { UserBusinessListResponse } from 'types/business';

const Home = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const [searchParams] = useSearchParams();
  const [businessPresent, setBusinessPresent] = useState(false);
  const login = searchParams.get('login');

  const authToken = localStorage.getItem(TOKEN_NAME) as string;
  const parsedToken: JwtPayload = authToken? JSON.parse(atob(authToken?.split('.')[1])): {}; //check atob

  // window.location.reload();
  
  useEffect(()=>{
    try {
      
      setTokenData(parsedToken);

      isAuthenticated(authToken, parsedToken.id)
      .then(()=>{
        setAuthenticated(true);
      })
      .catch((err)=>{
        setAuthenticated(false);
        console.error(err)
        // console.log("home-aut")
      });

      getUserBusinessProfileList(authToken).then((res)=>{
        const businessListResponse: UserBusinessListResponse = res.data
        
        setBusinessPresent(businessListResponse.data?.businessProfiles.length > 0 || false)
      })

      // const timer = setTimeout(() => {
      //   setShowComponent(true);
      // }, 1000); // Delay for 2 seconds
  
      // return () => clearTimeout(timer);
  
    } catch (error) {
      console.error('Error parsing token: ', error);
    }
  }, []);

  if(authenticated && !tokenData?.verified){
    navigate("/verify-account");
  }

  if(login === "true" || login === "false"){
    // console.log("login: ",login)
    // console.log("typeOf: ",typeof(login))

    isAuthenticated(authToken, parsedToken.id)
      .then(()=>{
        setAuthenticated(true);
      })
      .catch((err)=>{
        setAuthenticated(false);
        console.error(err)
        // console.log("home-aut")
      });
  }

  // console.log("authenticated: ",authenticated)

  return (
    <div className='home'>
      <img src={homeBgImage} alt={homeBgImage} />
      <header>
        <h2>Welcome to Bizconnect</h2>
        <p>
          Connecting Global small and medium Businesses with their customers
        </p>

        {!authenticated && <Button label='Get Started' variant='primary' to='/onboarding' />}
        
        {authenticated && (
          <div className='button-wrapper'>
            {businessPresent && (<Button
              label='View your business'
              variant='primary'
              size='lg'
              to='/view-your-business'
              icon={<SearchIcon />}
            />)}
            <Button
              label='Add a new business'
              variant='transparent'
              size='lg'
              to='/signup/register-business'
              icon={<PlusIcon />}
            />
          </div>
        )}
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
