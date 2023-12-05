/** @format */

import PlusIcon from 'assets/icons/plus-icon.svg?react';
import BagIcon from 'assets/icons/bag-icon.svg?react';
import SearchIcon from 'assets/icons/search-icon.svg?react';
import Pill from './components/Pill/Pill';

import './Onboarding.scss';

const Onboarding = () => {
  return (
    <div className='onboarding'>
      <div className='card'>
        <h4>Select the option that suits you</h4>

        <Pill icon={<PlusIcon />} title='New business' variant='red' />
        <Pill icon={<BagIcon />} title='Existing businesses' variant='pink' />
        <Pill
          icon={<SearchIcon />}
          title='Discover businesses'
          variant='green'
        />
      </div>
    </div>
  );
};

export default Onboarding;
