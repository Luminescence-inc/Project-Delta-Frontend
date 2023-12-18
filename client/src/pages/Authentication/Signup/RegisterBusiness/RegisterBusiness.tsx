import { useEffect, useRef, useState } from "react";
import { JwtPayload, TOKEN_NAME } from "types/auth";
import { allBusinessCategories, createBusinessProfile, getUploadSignature } from "api/business";
import { BusinessCategories, BusinessCreationBody, CloudinaryUploadResponse, UploadSignature } from "types/business";
import { CloudinaryConfig } from "config";
import { isAuthenticated } from "api/auth";
import { useFormik } from "formik";
import BusinessProfile from "./BusinessProfile";
import OperationInfo from "./OperationInfo";
import axios from "axios";
import Modal from 'react-modal';
import Button from "components/Button/Button";
import * as yup from "yup";
import "./Register.scss";


export type BusinessProfileFormikPropsValues = {
    businessName: string;
    description: string; 
    businessCategory: string;
    country: string;
    stateAndProvince: string;
    city: string;
    street: string;
    postalCode: string;
    instagramUrl: string;
    websiteUrl: string;
    linkedinUrl: string;
    facebookUrl: string;
    phoneNumber: string;
    businessEmail: string;
    openTime: string;
    closeTime: string;
    daysOfOperation: any;
}

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

    useEffect(()=>{
        isAuthenticated(authToken, parsedToken.id)
        .then(()=>{
          setAuthenticated(true);
        })
        .catch((err)=>{
          setAuthenticated(false);
          console.error(err)
        })
    }, []);

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
            signature: null
        }

        try{
            const allCat: BusinessCategories = (await allBusinessCategories()).data
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
        if(!error){
            createBusinessProfile(authToken, payload).then(()=>{
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
          daysOfOperation:[]
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
                    imageFile={imageFile} />)}
            {activeTab === 1 && 
            !successfulSubmission && (<OperationInfo formik={formik} />)}      

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Success Modal"
                style={customStyles}
            >
                <div className="modal">
                    <h2 style={{display: 'flex', justifyContent: 'center', fontSize:'16px', fontWeight:'700', marginBottom:'10px'}}>You'e in!</h2>
                    <p style={{display: 'flex', justifyContent: 'center', fontSize:'12px', fontWeight:'400', marginBottom:'20px'}}>You have successfully created your business account.</p>
                <Button type='submit' label='Click to Continue' variant='primary' size='lg' to='/'/>
                </div>
            </Modal>
        </div>
        )
    )
}

export default RegisterBusiness;