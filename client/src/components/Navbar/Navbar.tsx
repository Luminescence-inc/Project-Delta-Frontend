/** @format */

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import MenuIcon from 'assets/icons/menu-icon.svg?react';
import CancelIcon from 'assets/icons/cancel-icon.svg?react';
import ArrowUpIcon from 'assets/icons/arrow-up.svg?react';
import EditIcon from 'assets/icons/edit-icon.svg?react';
import PlusIcon from 'assets/icons/uil_plus.svg?react';
import Button from 'components/Button/Button';
import { JwtPayload, TOKEN_NAME } from 'types/auth';
import { isAuthenticated, logOut } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [tokenData, setTokenData] = useState<JwtPayload | null>(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
    try {
      const authToken = localStorage.getItem(TOKEN_NAME) as string;
      const parsedToken: JwtPayload = authToken? JSON.parse(atob(authToken?.split('.')[1])) : {};
      setTokenData(parsedToken);
      

      isAuthenticated(authToken, parsedToken.id)
      .then(()=>{
        setAuthenticated(true);
      })
      .catch((err)=>{
        setAuthenticated(false);
        console.log("navbar-auth")
        // console.error(err)
      })
  
    } catch (error) {
      console.error('Error parsing token: ', error);
    }
  }, []);

  const handleLogOut = ()=>{
    const authToken = localStorage.getItem(TOKEN_NAME) as string;
    logOut(authToken, tokenData?.id || '').then(()=>{
      localStorage.removeItem(TOKEN_NAME);
      setAuthenticated(false);
      // setMenuOpen(false);
      window.location.reload();
      navigate('/');
    }).catch((err)=>{
      console.error(err)
    })
    
  }

  
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const isAuth = localStorage.getItem('isAuth');

  return (
    <div className='navbar'>
      {!menuOpen && (
        <nav>
          <Link to='/'>
            <h2>Logo</h2>
          </Link>
          <MenuIcon className='icon-menu' onClick={() => setMenuOpen(true)} />
        </nav>
      )}
      {menuOpen && (
        <div className='nav-content'>
          <CancelIcon
            className='icon-cancel'
            onClick={() => setMenuOpen(false)}
          />

          <ul className='nav-content-items'>
            <li>
              <p onClick={()=>{navigate('/'); setMenuOpen(false);}}>About us</p>
            </li>
            <li>
              <p>Discover Businesses</p>
            </li>
            {authenticated && (
              <>
                <li
                  className='edit-business'
                  onClick={() => setEditProfileOpen((prev) => !prev)}
                >
                  <p>Edit Businesses Profile</p>
                  <ArrowUpIcon
                    className={editProfileOpen ? '' : 'arrow-down'}
                    width={14}
                    height={14}
                  />
                </li>
                {editProfileOpen && (
                  <>
                    <li className='business-list-item'>
                      <p>Ngozi Cooks</p>
                      <EditIcon width={22} height={22} />
                    </li>
                    <li className='business-list-item'>
                      <p>Shenmine Pudding</p>
                      <EditIcon width={22} height={22} />
                    </li>
                    <li className='business-list-item'>
                      <p>Uzoma's Pudding</p>
                      <EditIcon width={22} height={22} />
                    </li>
                    <li className='business-list-item'>
                      <p>Coffee and Tea Chi</p>
                      <EditIcon width={22} height={22} />
                    </li>
                  </>
                )}

                <Button
                  className='add-bus-btn'
                  label='Add a new business'
                  variant='transparent'
                  size='lg'
                  icon={<PlusIcon />}
                />
              </>
            )}
            <hr />
            {!authenticated && (
              <>
                <Button
                  label='Sign up'
                  className='mb-4'
                  variant='primary'
                  to='/signup'
                  onClick={() => setMenuOpen(false)}
                />
                <Button
                label='Login'
                variant='transparent'
                to='/login'
                onClick={() => {
                  setMenuOpen(false);
                }}
                />
              </>
            )}
            {authenticated && (
              <Button
              label='Log out'
              variant='transparent'
              onClick={() => {
                setMenuOpen(false);
                handleLogOut();
              }}
              />
            )}

            <p className='my-account'>My Account</p>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
