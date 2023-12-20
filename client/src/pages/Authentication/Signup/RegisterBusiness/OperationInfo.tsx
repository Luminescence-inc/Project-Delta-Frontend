/** @format */

import { BusinessProfileFormikPropsValues } from './RegisterBusiness';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { DAYS_OF_OPERATIONS_OPTIONS, OPERATING_TIME_OPTIONS } from 'utils/business-profile-utils';
import PhoneIcon from 'assets/icons/phone-icon.svg?react';
import MailIcon from 'assets/icons/mail-icon.svg?react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Select from 'components/Input/Select';
import MultiSelect from 'components/Input/MultiSelect';
import '../Signup.scss';

interface OperationInfoProps {
  formik: FormikProps<BusinessProfileFormikPropsValues>;
}


const OperationInfo: FC<OperationInfoProps> = ({formik}) => {
  
  return (
    <div className='signup'>
      <div className='card'>
        <h4>Operation Info</h4>

        <Input
          type='tel'
          name='phoneNumber'
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          label='Business Phone Number'
          icon={<PhoneIcon className='input-icon' />}
          placeholder='Enter Phone Number'
        />

        <Input
          type='email'
          name='businessEmail'
          value={formik.values.businessEmail}
          onChange={formik.handleChange}
          label='Business Email'
          icon={<MailIcon className='input-icon' />}
          placeholder='Enter Business Email'
        />

        <Select
          label='Business open time'
          name='openTime'
          formikValue={formik.values.openTime}
          formik={formik}
          placeholder={'Business open time'}
          options={OPERATING_TIME_OPTIONS}
        />

        <Select
          label='Business close time'
          name='closeTime'
          formikValue={formik.values.closeTime}
          formik={formik}
          placeholder={'Business close time'}
          options={OPERATING_TIME_OPTIONS}
        />

        <MultiSelect
          label='Days of operation'
          placeholder={'Days of operation'}
          name='daysOfOperation'
          formik={formik}
          options={DAYS_OF_OPERATIONS_OPTIONS}
        />

        <Button type='submit' onClick={formik.submitForm} label='Submit Profile' variant='primary' size='lg' />
      </div>
    </div>
  );
};

export default OperationInfo;
