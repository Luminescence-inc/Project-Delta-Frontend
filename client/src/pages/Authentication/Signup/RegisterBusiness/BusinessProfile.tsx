/** @format */

import { FC, useEffect, useRef, useState } from 'react';
import { FormikProps } from 'formik';
import { BusinessProfileFormikPropsValues } from './RegisterBusiness';
import { allBusinessCategories } from 'api/business';
import { BusinessCategories, IOption } from 'types/business';
import { Country, State, City }  from 'country-state-city';
import { FILE_TYPES } from 'utils/business-profile-utils';
import ContactIcon from 'assets/icons/contact-icon.svg?react';
import UploadIcon from 'assets/icons/upload-logo.svg?react';
import CancelIcon from 'assets/icons/cancel-select-icon.svg?react';
import InstagramIcon from 'assets/icons/instagram-icon.svg?react';
import LinkedinIcon from 'assets/icons/linkedin-icon.svg?react';
import FaceBookIcon from 'assets/icons/facebook-icon.svg?react';
import WebIcon from 'assets/icons/web-icon.svg?react';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Select from 'components/Input/Select';
import '../Signup.scss';

interface BusinessProfileProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<boolean>>;
  setImageFile:  React.Dispatch<React.SetStateAction<File | null | undefined>>;
  imageFile: File | null | undefined;
  tabsRef: React.RefObject<HTMLDivElement>;
  formik: FormikProps<BusinessProfileFormikPropsValues>;
}

const BusinessProfile: FC<BusinessProfileProps> = ({setActiveTab, setSelectedTab, setImageFile, imageFile, tabsRef, formik}) => {
  const [businessCategory, setBusinessCategory] = useState<IOption[]>();
  const [country, setCountry] = useState<IOption[]>();
  const [stateAndProvince, setStateAndProvince] = useState<IOption[]>();
  const [city, setCity] = useState<IOption[]>();
  const [error, setError] = useState<Boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    try{
      allBusinessCategories().then((res)=>{
        const resData:BusinessCategories = res.data;
        
        setBusinessCategory(resData.data.businessCategories
          .map((businessCat)=>{return {uuid: businessCat.uuid, value: businessCat.description}}))

        setCountry(Country.getAllCountries().map((ct)=>{return {uuid: ct.isoCode, value: ct.name}}));
        
      })
    }catch (error){
      console.log(error)
    }
  },[]);

  useEffect(()=>{
    if(formik.values.country != ''){
      const selectedCountry = country?.find((ct)=>{return ct.value === formik.values.country })
      const states = State.getStatesOfCountry(selectedCountry?.uuid)
      setStateAndProvince(states.map((st)=> {return {uuid: st.isoCode, value: st.name}}))

      //reset state and city
      formik.setFieldValue('stateAndProvince', '')
      formik.setFieldValue('city', '')
      setCity([])
    }
  },[formik.values.country])

  useEffect(()=>{
    if(formik.values.country != '' && formik.values.stateAndProvince != ''){
      const selectedCountry = country?.find((ct)=>{return ct.value === formik.values.country })
      const selectedState = stateAndProvince?.find((st)=>{return st.value === formik.values.stateAndProvince})
      const cities = City.getCitiesOfState(selectedCountry?.uuid as string, selectedState?.uuid as string)
      setCity(cities.map((ct)=>{return {uuid: ct.name, value: ct.name}}))

      //reset city
      formik.setFieldValue('city', '')
    }
  },[formik.values.stateAndProvince])

  const handleNextButton = ()=> {
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveTab(1); 
    setSelectedTab(false);
  }

  const handleImage = (files: FileList | null)=> {
    if(files){
      const uploadedFile: File = files[0];
      const fileTypeExsit = FILE_TYPES.find((ft)=>{return ft === uploadedFile.type})
      if(fileTypeExsit){
        setImageFile(uploadedFile)
        setError(false)
      }else{
        setError(true)
      }
    }
  }

  const handleDelete = () => {
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Custom Styles
  const errorMessageStyle = {
    color: 'red',
    display: 'flex',
    fontSize: '13px',
    margin: '0px'
  }

  
  return (
    <div className='signup'>
      <div className='card'>
        <h4>Complete Business Profile</h4>
        
        <span style={errorMessageStyle}>{formik.touched.businessName && formik.errors.businessName
              ? formik.errors.businessName
              : ""}
        </span>
        <Input
          type='text'
          label='Business Name'
          name='businessName'
          value={formik.values.businessName}
          onChange={formik.handleChange}
          icon={<ContactIcon className='input-icon' />}
          placeholder='Enter Business Name'
        />

        <div className='form-group'>
          <label htmlFor=''>Describe your business</label>
          <textarea 
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4} 
            placeholder='Short sentence about your business' 
          />
        </div>

        <span style={errorMessageStyle}>{formik.touched.businessCategory && formik.errors.businessCategory
              ? formik.errors.businessCategory
              : ""}
        </span>
        <Select
          label='Business Category'
          name='businessCategory'
          formikValue={formik.values.businessCategory}
          formik={formik}
          placeholder={'Business Category'}
          options={businessCategory} />

        <span style={errorMessageStyle}>{formik.touched.country && formik.errors.country
              ? formik.errors.country
              : ""}
        </span>
        <Select
          label='Select Country'
          name='country'
          formikValue={formik.values.country}
          formik={formik}
          placeholder={'Select Country'}
          options={country}
        />

        <span style={errorMessageStyle}>{formik.touched.stateAndProvince && formik.errors.stateAndProvince
              ? formik.errors.stateAndProvince
              : ""}
        </span>
        <Select
          label='State and Province'
          name='stateAndProvince'
          formikValue={formik.values.stateAndProvince}
          formik={formik}
          placeholder={'State and Province'}
          options={stateAndProvince}
        />

        <span style={errorMessageStyle}>{formik.touched.city && formik.errors.city
              ? formik.errors.city
              : ""}
        </span>
        <Select
          label='Select City'
          name='city'
          formikValue={formik.values.city}
          formik={formik}
          placeholder={'Select City'}
          options={city}
        />

        <Input 
          name='street' 
          type='text' 
          label='Street'
          value={formik.values.street}
          onChange={formik.handleChange}
          placeholder='Enter Street Name' 
        />

        <Input
          type='text'
          name='postalCode'
          label='Zip code/Postal code'
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          placeholder='Enter Postal Code'
        />

        {error && (<span style={errorMessageStyle}>File Type not Supported</span>)}
        {error && (<span style={errorMessageStyle}>Supported format: jpg/jpeg/png</span>)}
        <div className="file-upload">
          <label className="file-upload-label">
            <span className="placeholder-text">
              {imageFile ? imageFile.name : 'Upload Your Logo (jpg/jpeg/png)'}
              <UploadIcon className="upload-arrow" onClick={() => fileInputRef.current?.click()} />
            </span>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e)=>{
                handleImage(e.target.files)
              }}
              style={{ display: 'none' }}
            />
            {imageFile && (
              <button className="delete-button" onClick={handleDelete}>
                <CancelIcon width={14}
                height={14} />
              </button>
            )}
          </label>
        </div>

        <h4 style={{paddingTop: "40px"}}>Upload social media links</h4>

        <div className='form-group'>
          <div className='input-wrapper'>
            {<InstagramIcon className='input-icon-social' />}
            <input 
              className='input-text-social'
              name="instagramUrl" 
              type="text" 
              placeholder="Upload Instagram Link" 
              value={formik.values.instagramUrl} 
              onChange={formik.handleChange} 
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='input-wrapper'>
            {<WebIcon className='input-icon-social' style={{left:"30px"}} />}
            <input 
              className='input-text-social'
              name="websiteUrl" 
              type="text" 
              placeholder="Upload Website Link" 
              value={formik.values.websiteUrl} 
              onChange={formik.handleChange} 
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='input-wrapper'>
            {<LinkedinIcon className='input-icon-social' />}
            <input 
              className='input-text-social'
              name="linkedinUrl" 
              type="text" 
              placeholder="Upload Linkedin Link" 
              value={formik.values.linkedinUrl} 
              onChange={formik.handleChange} 
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='input-wrapper'>
            {<FaceBookIcon className='input-icon-social' />}
            <input 
              className='input-text-social'
              name="facebookUrl" 
              type="text" 
              placeholder="Upload Facebook Link" 
              value={formik.values.facebookUrl} 
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <Button
          label='Next'
          variant='primary'
          size='lg'
          onClick={handleNextButton}
        />
      </div>
    </div>
  );
};

export default BusinessProfile;
