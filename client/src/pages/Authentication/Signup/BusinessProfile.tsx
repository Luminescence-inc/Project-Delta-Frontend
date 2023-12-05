/** @format */

import ContactIcon from 'assets/icons/contact-icon.svg?react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Select from 'components/Input/Select';
import './Signup.scss';

const BusinessProfile = () => {
  return (
    <div className='signup'>
      <div className='card'>
        <h4>Complete Business Profile</h4>

        <Input
          type='text'
          label='Business Name'
          icon={<ContactIcon className='input-icon' />}
          placeholder='Enter Business Name'
        />

        <div className='form-group'>
          <label htmlFor=''>Describe your business</label>
          <textarea rows={4} placeholder='Short sentence about your business' />
        </div>

        <Select
          label='Business Category'
          options={['Select Business Category', 'Option 1', 'Option 2']}
        />

        <Select
          label='Select Country'
          options={['Select Country', 'Country 1', 'Country 2']}
        />

        <Select
          label='State and Province'
          options={['Select State/Province', 'Option 1', 'Option 2']}
        />

        <Select
          label='Select City'
          options={['Select City', 'Option 1', 'Option 2']}
        />

        <Input type='text' label='Street' placeholder='Enter Street Name' />

        <Input
          type='text'
          label='Zip code/Postal code'
          placeholder='Enter Postal Code'
        />

        <Button
          label='Next'
          variant='primary'
          size='lg'
          to='/signup/operation-info'
        />
      </div>
    </div>
  );
};

export default BusinessProfile;
