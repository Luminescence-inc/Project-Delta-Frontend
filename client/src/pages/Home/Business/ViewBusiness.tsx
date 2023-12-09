/** @format */

import Button from 'components/Button/Button';
import businessImage from 'assets/images/business_img.png';
import './ViewBusiness.scss';

const ViewBusiness = () => {
  return (
    <>
      <div className='view-business'>
        <header>
          <h2>Business</h2>
          <p>
            Here is a list of all business associated with your account. you can
            update or delete your business
          </p>
        </header>
        <div className='businesses'>
          <div className='card card-home card-business'>
            <img src={businessImage} alt='businessImage' />
            <h3>Mama Ngozi's Joint</h3>
            <p>
              Value proposition will go here -- Describing in a very concise
              sentence what the business is all about
            </p>

            <Button label='Update Business' variant='primary' size='lg' />
          </div>

          <div className='card card-home card-business'>
            <img src={businessImage} alt='businessImage' />
            <h3>Mama Ngozi's Joint</h3>
            <p>
              Value proposition will go here -- Describing in a very concise
              sentence what the business is all about
            </p>

            <Button label='Update Business' variant='primary' size='lg' />
          </div>

          <div className='card card-home card-business'>
            <img src={businessImage} alt='businessImage' />
            <h3>Mama Ngozi's Joint</h3>
            <p>
              Value proposition will go here -- Describing in a very concise
              sentence what the business is all about
            </p>

            <Button label='Update Business' variant='primary' size='lg' />
          </div>

          <div className='card card-home card-business'>
            <img src={businessImage} alt='businessImage' />
            <h3>Mama Ngozi's Joint</h3>
            <p>
              Value proposition will go here -- Describing in a very concise
              sentence what the business is all about
            </p>

            <Button label='Update Business' variant='primary' size='lg' />
          </div>
        </div>
      </div>

      <div className='add-new-business'>
        <h4>Want to Add more businesses?</h4>
        <p>
          You can add as many businesses as you wish. Click on the button below.
        </p>
        <Button label='Add a new business' variant='transparent' size='lg' />
      </div>
    </>
  );
};

export default ViewBusiness;
