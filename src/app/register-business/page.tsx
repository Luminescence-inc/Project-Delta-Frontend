"use client";
import { useEffect, useRef, useState } from "react";
import { JwtPayload, TOKEN_NAME } from "@/types/auth";
import {
  createBusinessProfile,
  getAllBusinessCategories,
  getUploadSignature,
  getUserBusinessProfileDetail,
  updateUserBusinessProfileDetail,
} from "@/api/business";
import {
  BusinessCategories,
  BusinessCreationBody,
  BusinessProfileFormikPropsValues,
  CloudinaryUploadResponse,
  IOption,
  RegisterBusinessTabs,
  UploadSignature,
  UserBusinessDetailsResponse,
  UserBusinessList,
} from "@/types/business";
import { CloudinaryConfig } from "@/config";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import BusinessProfile from "@/modules/register-business/components/BusinessProfile";
import OperationInfo from "@/modules/register-business/components/OperationInfo";
import axios from "axios";
import Modal from "react-modal";
import Button from "@components/ui/button";
import Country from "@/helpers/countries-states-city/country";
import City from "@/helpers/countries-states-city/city";
import State from "@/helpers/countries-states-city/state";
import * as yup from "yup";
import { FILTERED_COUNTRY } from "@/utils/business-profile-utils";
import { useBusinessCtx } from "@context/BusinessCtx";
import { isUrlValid } from "@/utils";
import { cn } from "@/lib/utils";
import { FlexRowCenter } from "@components/Flex";
import { useAuth } from "@hooks/useAuth";
import { LoaderComponent } from "@components/Loader";
import { toast } from "react-toastify";
import withAuth from "@/utils/auth-helpers/withAuth";
import { useRouter } from "next/navigation";

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
  businessName: yup
    .string()
    .min(1, "Enter valid Business Name")
    .required("Business Name is required!"),
  businessCategory: yup.string().required("Business Category is required!"),
  country: yup.string().required("Country is required!"),
  stateAndProvince: yup.string().required("State and Province is required!"),
  city: yup.string().required("city is required!"),
});

const tabs = [
  { name: "business-profile", title: "Business Profile" },
  { name: "operations-info", title: "Operations Info" },
] as { name: RegisterBusinessTabs; title: string }[];

const RegisterBusiness = () => {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const { setSocialLinksError } = useBusinessCtx();
  const [pageLoading, setPageLoading] = useState(false);
  const authToken = localStorage.getItem(TOKEN_NAME) as string;
  const parsedToken: JwtPayload = authToken
    ? JSON.parse(atob(authToken?.split(".")[1]))
    : {};
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTab, setSelectedTab] =
    useState<RegisterBusinessTabs>("business-profile");
  const [imageFile, setImageFile] = useState<File | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [deleteLogo, setDeleteLogo] = useState(false);
  const [country, setCountry] = useState<IOption[]>([]);
  const [stateAndProvince, setStateAndProvince] = useState<IOption[]>([]);
  const [city, setCity] = useState<IOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const { userDetails, loading } = useAuth();

  // socialMediaErrorEndRef
  const socialErrorEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    setBusinessId(param.get("update"));
  }, [window]);

  useEffect(() => {
    if (userDetails && businessId) {
      setPageLoading(true);
      getUserBusinessProfileDetail(businessId)
        .then((res) => {
          setPageLoading(false);
          const resData: UserBusinessDetailsResponse = res.data;
          const businessDetailsData: UserBusinessList = resData.data.details;

          // Set Formik Values
          formik.setFieldValue("businessName", businessDetailsData.name);
          formik.setFieldValue(
            "description",
            formatInput(businessDetailsData.description)
          );
          formik.setFieldValue(
            "businessCategory",
            formatInput(businessDetailsData?.businessCategory.description)
          );
          formik.setFieldValue(
            "country",
            formatInput(businessDetailsData.country)
          );
          formik.setFieldValue(
            "stateAndProvince",
            formatInput(businessDetailsData.stateAndProvince)
          );
          formik.setFieldValue("city", formatInput(businessDetailsData.city));
          formik.setFieldValue(
            "street",
            formatInput(businessDetailsData.street)
          );
          formik.setFieldValue(
            "postalCode",
            formatInput(businessDetailsData.postalCode)
          );
          formik.setFieldValue(
            "instagramUrl",
            formatInput(businessDetailsData.instagramUrl)
          );
          formik.setFieldValue(
            "websiteUrl",
            formatInput(businessDetailsData.websiteUrl)
          );
          formik.setFieldValue(
            "linkedinUrl",
            formatInput(businessDetailsData.linkedinUrl)
          );
          formik.setFieldValue(
            "facebookUrl",
            formatInput(businessDetailsData.facebookUrl)
          );
          formik.setFieldValue(
            "phoneNumber",
            formatInput(businessDetailsData.phoneNumber)
          );
          formik.setFieldValue(
            "businessEmail",
            formatInput(businessDetailsData.businessEmail)
          );
          formik.setFieldValue(
            "openTime",
            formatInput(businessDetailsData.openTime)
          );
          formik.setFieldValue(
            "closeTime",
            formatInput(businessDetailsData.closeTime)
          );
          formik.setFieldValue(
            "daysOfOperation",
            formatInput(businessDetailsData.daysOfOperation)
          );

          setLogoUrl(businessDetailsData.logoUrl);
          setCountry(
            Country.getAllCountries()
              .map((ct) => {
                return { uuid: ct.isoCode, value: ct.name };
              })
              .filter((ct) => {
                return FILTERED_COUNTRY.includes(ct.value);
              })
          );

          const selectedCountry = country?.find((ct) => {
            return ct.value === businessDetailsData.country;
          });
          const states = State.getStatesOfCountry(selectedCountry?.uuid);
          setStateAndProvince(
            states.map((st) => {
              return { uuid: st.isoCode, value: st.name };
            })
          );

          const selectedState = stateAndProvince?.find((st) => {
            return st.value === businessDetailsData.stateAndProvince;
          });
          const cities = City.getCitiesOfState(
            selectedCountry?.uuid as string,
            selectedState?.uuid as string
          );
          setCity(
            cities.map((ct) => {
              return { uuid: ct.name, value: ct.name };
            })
          );

          // Cause a Re-render and refresh the formik setFields
          switchTab(1);
          setSelectedTab("operations-info");
          setTimeout(() => {
            switchTab(0);
            setSelectedTab("business-profile");
          }, 0.1);
        })
        .catch((err: any) => {
          setPageLoading(false);
          console.log(err);
        });
    } else {
      // Set Formik Values to null
      formik.setFieldValue("businessName", "");
      formik.setFieldValue("description", "");
      formik.setFieldValue("businessCategory", "");
      formik.setFieldValue("country", "");
      formik.setFieldValue("stateAndProvince", "");
      formik.setFieldValue("city", "");
      formik.setFieldValue("street", "");
      formik.setFieldValue("postalCode", "");
      formik.setFieldValue("instagramUrl", "");
      formik.setFieldValue("websiteUrl", "");
      formik.setFieldValue("linkedinUrl", "");
      formik.setFieldValue("facebookUrl", "");
      formik.setFieldValue("phoneNumber", "");
      formik.setFieldValue("businessEmail", "");
      formik.setFieldValue("openTime", "");
      formik.setFieldValue("closeTime", "");
      formik.setFieldValue("daysOfOperation", []);

      // Cause a Re-render and refresh the formik setFields
      switchTab(1);
      setTimeout(() => {
        switchTab(0);
        setSelectedTab("business-profile");
      }, 0.1);
    }
  }, [businessId, userDetails]);

  const scrollToBottom = () => {
    socialErrorEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatInput = (value: any) => {
    return value ? value : "";
  };

  const switchTab = (tab: number, selectedTab?: RegisterBusinessTabs) => {
    setActiveTab(tab);
    selectedTab && setSelectedTab(selectedTab as any);
  };

  const orderDays = (values: any) => {
    try {
      let days = values as Array<string>;
      return days.sort((a, b) => dayOrder[a] - dayOrder[b]);
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(false);
  };

  const onSubmit = async (values: BusinessProfileFormikPropsValues) => {
    const folderPath = `BizConnect/Logo/${parsedToken.id}`;
    setIsLoading(true);

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
      logoUrl: logoUrl,
    };

    // validate all social links
    // This would need some readjustments
    if (payload.instagramUrl && !isUrlValid(payload.instagramUrl!)) {
      toast.error("Invalid Instagram URL");
      setIsLoading(false);
      switchTab(0, "business-profile");
      scrollToBottom();
      return;
    }
    if (payload.websiteUrl && !isUrlValid(payload.websiteUrl!)) {
      toast.error("Invalid Website URL");
      setIsLoading(false);
      switchTab(0, "business-profile");
      return;
    }
    if (payload.linkedinUrl && !isUrlValid(payload.linkedinUrl!)) {
      toast.error("Invalid LinkedIn URL");
      setIsLoading(false);
      switchTab(0, "business-profile");
      return;
    }
    if (payload.facebookUrl && !isUrlValid(payload.facebookUrl!)) {
      toast.error("Invalid Facebook URL");
      setIsLoading(false);
      switchTab(0, "business-profile");
      return;
    }

    try {
      const allCat: BusinessCategories = (await getAllBusinessCategories())
        .data;
      payload.businessCategoryUuid = allCat.data.businessCategories.find(
        (bCat) => bCat.description === values.businessCategory
      )?.uuid as string;
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error(
        "There was an error submitting the form. Please Check your Business Categories option Please try again."
      );
    }

    try {
      if (imageFile) {
        let cloudinaryResponseData: CloudinaryUploadResponse;
        const signature: UploadSignature = (
          await getUploadSignature(folderPath)
        ).data;
        const imageData = new FormData();
        imageData.append("file", imageFile as Blob);
        imageData.append("api_key", CloudinaryConfig.apiKey);
        imageData.append("folder", folderPath);
        imageData.append("signature", signature.data.signature);
        imageData.append("timestamp", `${signature.data.timestamp}`);

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloudName}/auto/upload`,
          imageData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        cloudinaryResponseData = cloudinaryResponse.data;

        payload.publicId = cloudinaryResponseData.public_id;
        payload.version = cloudinaryResponseData.version;
        payload.signature = cloudinaryResponseData.signature;
      }
    } catch (error) {
      console.error(error);
      //trigger an alert or notify the logo wasn't uploaded
      setError(true);
      toast.error(
        `There was an error while uploading your Logo. Error: ${error}`
      );
    }

    // Submit to BizConnect Create API if error doesn't exsist
    if (!error && !businessId) {
      createBusinessProfile(payload)
        .then(() => {
          setIsModalOpen(true);
          setSuccessfulSubmission(true);
          setIsLoading(false);
          setSocialLinksError(null);
        })
        .catch((error: any) => {
          const err = error?.response?.message ?? error?.response?.statusText;
          toast.error(`There was an error submitting the form. Error: ${err}`);
          console.error(error?.response);
          setIsLoading(false);
        });
    }

    // Update Business details if error doesn't exsist
    if (!error && businessId) {
      updateUserBusinessProfileDetail(businessId, payload)
        .then(() => {
          setIsModalOpen(true);
          setSuccessfulSubmission(true);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(`There was an error submitting the form. Error: ${err}`);
          console.error(err);
          setIsLoading(false);
        });
    }
  };

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
      daysOfOperation: [],
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-90%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90%",
      maxHeight: "80vh",
      overflow: "auto",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  };

  if (loading || pageLoading) {
    return <LoaderComponent />;
  }

  const isRequiredFieldEmpty = () => {
    const requiredFields = [
      "businessName",
      "businessCategory",
      "country",
      "stateAndProvince",
      "city",
    ];
    let error = false;
    for (let field of requiredFields) {
      // @ts-expect-error
      if (!formik.values[field]) {
        error = true;
      }
    }
    return error;
  };

  return (
    <div ref={tabsRef} className="w-full pt-[30px] px-[16px] pb-[150px] ">
      <FlexRowCenter className="w-full h-full gap-10">
        {tabs.map((tab, idx) => (
          <span
            key={idx}
            className={cn(
              "text-[16px] font-bold font-pp cursor-pointer leading-[24px]",
              selectedTab?.toLowerCase() === tab.name.toLowerCase()
                ? "border-b-2 border-blue-200 text-blue-200"
                : "text-blue-200/60"
            )}
            onClick={() => {
              if (isRequiredFieldEmpty() && idx === 1) {
                toast.error("Please fill in all required business details.");
                return;
              }
              switchTab(idx);
              setSelectedTab(tab.name as any);
            }}
          >
            {tab.title}
          </span>
        ))}
      </FlexRowCenter>

      {activeTab === 0 && !successfulSubmission && (
        <BusinessProfile
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
          socialEndRef={socialErrorEndRef}
          isRequiredFieldEmpty={isRequiredFieldEmpty}
        />
      )}
      {activeTab === 1 && !successfulSubmission && (
        <OperationInfo
          formik={formik}
          businessId={businessId}
          isLoading={isLoading}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        style={customStyles}
      >
        <div
          className="modal"
          style={{ display: "block", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            {businessId ? "Update Succesful" : "You're in!"}
          </h2>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "400",
              marginBottom: "20px",
            }}
          >
            {businessId
              ? "You have successfully updated your business account."
              : "You have successfully created your business account."}
          </p>

          <Button
            intent={"primary"}
            size={"lg"}
            className="w-full rounded-[5px] mt-5"
            onClick={() => {
              setIsModalOpen(false);
              window.location.href = "/view-business";
            }}
          >
            <span className="text-[14px] font-semibold font-pp">
              Click to Continue
            </span>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default withAuth(RegisterBusiness);
