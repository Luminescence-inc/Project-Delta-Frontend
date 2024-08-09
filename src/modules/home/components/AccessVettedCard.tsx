"use client";
import { FlexColStart } from "@/components/Flex"
interface Props {
    className?: string;
    header: string;
    subTitle: string;
    icon: string;
    style?: object;
}
const AccessVettedCard = ({
    className,
    icon,
    header,
    subTitle,
    style,

}: Props) => {
    return (
        <FlexColStart className="gap-0">
            <div className="w-full p-4 md:p-6 shadow-lg rounded-[15px]">
                <div className=" rounded-[8px] w-full">
                    <img
                        src={icon}
                        className="min-h-[150px] bg-cover w-full rounded-[8px] bg-blue-205"
                        alt="access vetted"
                    />
                </div>
                <h3 className="text-[20px] font-pp font-medium leading-[26px] text-dark-501 mt-3 my-1">
                    {header}
                </h3>
                <h3 className="text-[13px] font-pp font-normal leading-[20px] text-gray-207">
                    {subTitle}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <img src="/acc-min-img.svg" alt="" />
                        <div className="flex flex-col">
                            <span className="text-[13px] leading-[20px] font-medium text-dark-501">Bizconnect24</span>
                            <span className="text-[11px] leading-[13.12px] font-normal  text-gray-207">3 mins read</span>
                        </div>
                    </div>

                <p className="text-[11px] leading-[13.12px] font-normal text-gray-207">
                    <img src="" alt="" />
                    <span>14th May, 2024</span>
                </p>
                </div>
            </div>

        </FlexColStart>
    )
}

export default AccessVettedCard