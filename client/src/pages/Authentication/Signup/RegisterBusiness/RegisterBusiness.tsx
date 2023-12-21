import { useEffect, useRef, useState } from "react";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { createBusinessProfile, getAllBusinessCategories, getUploadSignature, getUserBusinessProfileDetail, updateUserBusinessProfileDetail } from "api/business";
import { BusinessCategories, BusinessCreationBody, BusinessProfileFormikPropsValues, CloudinaryUploadResponse, IOption, UploadSignature, UserBusinessDetailsResponse, UserBusinessList } from "types/business";
import { CloudinaryConfig } from "config";
import { isAuthenticated } from "api/auth";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import BusinessProfile from "./BusinessProfile";
import OperationInfo from "./OperationInfo";
import axios from "axios";
import Modal from 'react-modal';
import Button from "components/Button/Button";
import { Country, State, City }  from 'country-state-city';
import * as yup from "yup";
import "./Register.scss";
import { FILTERED_COUNTRY } from "utils/business-profile-utils";


const dayOrder: { [key: string]: number } = { 
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6,
};

const validationSchema = yup.object({
    businessName: yup.string().min(1, "Enter valid Business Name").required("Business Name is required!"),
    businessCategory: yup.string().required("Business Category is required!"),
    country: yup.string().required("Country is required!"),
    stateAndProvince: yup.string().required("State and Province is required!"),
    city: yup.string().required("city is required!")
})

const RegisterBusiness = ()=> {
    const authToken = localStorage.getItem(TOKEN_NAME) as string;
    const parsedToken: JwtPayload = authToken? JSON.parse(atob(authToken?.split('.')[1])) : {};
    const tabsRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTab, setSelectedTab] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(false);
    const [successfulSubmission, setSuccessfulSubmission] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [searchParams] = useSearchParams();
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [deleteLogo, setDeleteLogo] = useState(false)
    const [country, setCountry] = useState<IOption[]>([]);
    const [stateAndProvince, setStateAndProvince] = useState<IOption[]>([]);
    const [city, setCity] = useState<IOption[]>([]);
    const businessId = searchParams.get('update');

    useEffect(()=>{
        isAuthenticated(authToken, parsedToken.id)
        .then(()=>{
          setAuthenticated(true);
          if(businessId){
            getUserBusinessProfileDetail(authToken, businessId).then((res)=>{
                const resData: UserBusinessDetailsResponse = res.data;
                const businessDetailsData: UserBusinessList = resData.data.details

                // Set Formik Values
                formik.setFieldValue('businessName',businessDetailsData.name)
                formik.setFieldValue('description',formatInput(businessDetailsData.description))
                formik.setFieldValue('businessCategory',formatInput(businessDetailsData?.businessCategory.description))
                formik.setFieldValue('country',formatInput(businessDetailsData.country))
                formik.setFieldValue('stateAndProvince',formatInput(businessDetailsData.stateAndProvince))
                formik.setFieldValue('city',formatInput(businessDetailsData.city))
                formik.setFieldValue('street',formatInput(businessDetailsData.street))
                formik.setFieldValue('postalCode',formatInput(businessDetailsData.postalCode))
                formik.setFieldValue('instagramUrl',formatInput(businessDetailsData.instagramUrl))
                formik.setFieldValue('websiteUrl',formatInput(businessDetailsData.websiteUrl))
                formik.setFieldValue('linkedinUrl',formatInput(businessDetailsData.linkedinUrl))
                formik.setFieldValue('facebookUrl',formatInput(businessDetailsData.facebookUrl))
                formik.setFieldValue('phoneNumber',formatInput(businessDetailsData.phoneNumber))
                formik.setFieldValue('businessEmail',formatInput(businessDetailsData.businessEmail))
                formik.setFieldValue('openTime',formatInput(businessDetailsData.openTime))
                formik.setFieldValue('closeTime',formatInput(businessDetailsData.closeTime))
                formik.setFieldValue('daysOfOperation',formatInput(businessDetailsData.daysOfOperation))


                setLogoUrl(businessDetailsData.logoUrl)
                setCountry(Country.getAllCountries()
                    .map((ct)=>{return {uuid: ct.isoCode, value: ct.name}})
                    .filter((ct)=>{
                        return FILTERED_COUNTRY.includes(ct.value)
                    }))
                
                const selectedCountry = country?.find((ct)=>{return ct.value === businessDetailsData.country })
                const states = State.getStatesOfCountry(selectedCountry?.uuid)
                setStateAndProvince(states.map((st)=> {return {uuid: st.isoCode, value: st.name}}))

                const selectedState = stateAndProvince?.find((st)=>{return st.value === businessDetailsData.stateAndProvince})
                const cities = City.getCitiesOfState(selectedCountry?.uuid as string, selectedState?.uuid as string)
                setCity(cities.map((ct)=>{return {uuid: ct.name, value: ct.name}}))

                
                // Cause a Re-render and refresh the formik setFields
                switchTab(1); setSelectedTab(false);
                setTimeout(()=>{
                    switchTab(0); setSelectedTab(true);
                },0.1)
            })
          }else{
            // Set Formik Values to null
            formik.setFieldValue('businessName','')
            formik.setFieldValue('description','')
            formik.setFieldValue('businessCategory','')
            formik.setFieldValue('country','')
            formik.setFieldValue('stateAndProvince','')
            formik.setFieldValue('city','')
            formik.setFieldValue('street','')
            formik.setFieldValue('postalCode','')
            formik.setFieldValue('instagramUrl','')
            formik.setFieldValue('websiteUrl','')
            formik.setFieldValue('linkedinUrl','')
            formik.setFieldValue('facebookUrl','')
            formik.setFieldValue('phoneNumber','')
            formik.setFieldValue('businessEmail','')
            formik.setFieldValue('openTime','')
            formik.setFieldValue('closeTime','')
            formik.setFieldValue('daysOfOperation',[])

            // Cause a Re-render and refresh the formik setFields
            switchTab(1); setSelectedTab(false);
            setTimeout(()=>{
                switchTab(0); setSelectedTab(true);
            },0.1)
          }
        })
        .catch((err)=>{
          setAuthenticated(false);
          console.error(err)
        })
    }, [businessId]);

    const formatInput = (value: any) => {
        return value ? value : ""
    }

    const switchTab = (tab: number) => {
        setActiveTab(tab);
    };

    const orderDays = (values: any) => {
        try{
            let days = values as Array<string>
            return days.sort((a, b)=>dayOrder[a] - dayOrder[b])
        }catch(error){
            console.error(error)
            return []
        }
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setError(false);
    };

    const onSubmit = async (values: BusinessProfileFormikPropsValues) => {
        const folderPath = `BizConnect/Logo/${parsedToken.id}`;

        // Task1: Check required field and run error toast if not provided
        // Task2: Create spinner for submition 
        // Task3: Run error toast when submition doesn't go through
        // Task4: Check UK- Cities
        // Task5: change social Input logo
        // Task6: Days of operation dropdown
        // Task7: Double Upload issue
        // Task8: Remove excess register business bottom space
        // Task9: Dynamically render social media
        // Task10: Add default image for no logo upload

        const payload: BusinessCreationBody = {
            name: values.businessName,
            description: values.description,
            businessCategoryUuid: "",
            country: values.country,
            stateAndProvince: values.stateAndProvince,
            city: values.city,
            street: values.street,
            postalCode: values.postalCode,
            instagramUrl: values.instagramUrl,
            websiteUrl: values.websiteUrl,
            linkedinUrl: values.linkedinUrl,
            facebookUrl: values.facebookUrl,
            twitterUrl: null,
            phoneNumber: values.phoneNumber,
            businessEmail: values.businessEmail,
            openTime: values.openTime,
            closeTime: values.closeTime,
            daysOfOperation: orderDays(values.daysOfOperation),
            publicId: null,
            version: null,
            signature: null,
            deleteLogo: deleteLogo,
            logoUrl: logoUrl
        }

        try{
            const allCat: BusinessCategories = (await getAllBusinessCategories()).data
            payload.businessCategoryUuid = allCat.data.businessCategories.find((bCat)=> bCat.description === values.businessCategory)?.uuid as string
        }catch (error){
            console.log(error)
            setError(true)
            alert('There was an error submitting the form. Please Check your Business Categories option Please try again.');
        }

        try{
            if(imageFile){
                let cloudinaryResponseData: CloudinaryUploadResponse;
                const signature: UploadSignature = (await getUploadSignature(authToken,folderPath)).data;
                const imageData = new FormData()
                imageData.append("file", imageFile as Blob)
                imageData.append("api_key", CloudinaryConfig.apiKey)
                imageData.append("folder", folderPath)
                imageData.append("signature", signature.data.signature)
                imageData.append("timestamp", `${signature.data.timestamp}`)

                const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloudName}/auto/upload`, imageData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })
                cloudinaryResponseData = cloudinaryResponse.data

                payload.publicId = cloudinaryResponseData.public_id;
                payload.version = cloudinaryResponseData.version;
                payload.signature = cloudinaryResponseData.signature;

            }    
        }catch(error){
            console.error(error)
            //trigger an alert or notify the logo wasn't uploaded
            setError(true)
            alert(`There was an error while uploading your Logo. Error: ${error}`);
        }

        // Submit to BizConnect Create API if error doesn't exsist
        if(!error && !businessId){
            createBusinessProfile(authToken, payload).then(()=>{
                setIsModalOpen(true);
                setSuccessfulSubmission(true)
            }).catch((err)=>{
                alert(`There was an error submitting the form. Error: ${err}`)
                console.error(err)
            })
        }     

        // Update Business details if error doesn't exsist
        if(!error && businessId){
            updateUserBusinessProfileDetail(authToken, businessId, payload)
            .then(()=>{
                setIsModalOpen(true);
                setSuccessfulSubmission(true)
            }).catch((err)=>{
                alert(`There was an error submitting the form. Error: ${err}`)
                console.error(err)
            })
        }
    }

    const formik = useFormik({
        initialValues: {
          businessName: "", 
          description: "", 
          businessCategory: "", 
          country: "", 
          stateAndProvince: "", 
          city: "", 
          street: "", 
          postalCode: "", 
          instagramUrl: "", 
          websiteUrl: "", 
          linkedinUrl: "", 
          facebookUrl: "", 
          phoneNumber: "", 
          businessEmail: "", 
          openTime: "", 
          closeTime: "", 
          daysOfOperation: []
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema
    });

    //Inline styles
    const tabDisplayStyles = {
        color: '#0E2D52',
        borderBottom: '1px solid #0E2D52'
    }

    const customStyles = {
        content: {
            top: '35%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-90%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
        },
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
    };

    return (
        authenticated && (
            <div ref={tabsRef} className='register'>
            <div className='tabs'>
                <span style={selectedTab? tabDisplayStyles: {}} onClick={() => {switchTab(0); setSelectedTab(true);}}>Business Profile</span>
                <span style={!selectedTab? tabDisplayStyles: {}} onClick={() => {switchTab(1); setSelectedTab(false);}}>Operations info</span>
            </div>

            {activeTab === 0 && 
            !successfulSubmission && 
            (<BusinessProfile 
                    formik={formik}
                    setActiveTab={setActiveTab} 
                    setSelectedTab={setSelectedTab} 
                    tabsRef={tabsRef}
                    setImageFile={setImageFile}
                    imageFile={imageFile}
                    businessId={businessId}
                    logoUrl={logoUrl} 
                    deleteLogo={deleteLogo}
                    setDeleteLogo={setDeleteLogo}
                    country={country}
                    setCountry={setCountry}
                    setStateAndProvince={setStateAndProvince}
                    stateAndProvince={stateAndProvince}
                    city={city}
                    setCity={setCity}
                    />)}
            {activeTab === 1 && 
            !successfulSubmission && (<OperationInfo formik={formik} businessId={businessId} />)}      

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Success Modal"
                style={customStyles}
            >
                <div className="modal">
                    <h2 style={{display: 'flex', justifyContent: 'center', fontSize:'16px', fontWeight:'700', marginBottom:'10px'}}>{businessId?'Update Succesful':"You'e in!"}</h2>
                    <p style={{display: 'flex', justifyContent: 'center', fontSize:'12px', fontWeight:'400', marginBottom:'20px'}}>{businessId?'You have successfully updated your business account.':'You have successfully created your business account.'}</p>
                <Button type='submit' label='Click to Continue' variant='primary' size='lg' to='/'/>
                </div>
            </Modal>
        </div>
        )
    )
}

export default RegisterBusiness;