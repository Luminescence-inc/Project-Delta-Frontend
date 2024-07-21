import ForgotPassword from "@/modules/auth/reset/forgot-password";
// import { useParams } from "next/navigation";

interface ForgotPasswordPageProps {
  params: { userId: string; uniqueString: string };
}

export async function generateStaticParams() {
  return [{userId: "a13a1890-b49f-4ae6-88b3-970fe6822a69", uniqueString: "f4a83595-6b6a-4478-b0bc-a83591614753"}];
}

const ForgotPasswordPage = ({params}:ForgotPasswordPageProps) => {
  // const params = useParams();
  // return <ForgotPassword userId={params.userId as string} uniqueString={params.uniqueString as string} />;
  return <ForgotPassword userId={params.userId} uniqueString={params.uniqueString} />;
};

export default ForgotPasswordPage;
