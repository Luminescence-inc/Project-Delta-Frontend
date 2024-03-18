interface BusinessCardProps {
    className: string;
    header: string;
    subTitle: string;
    icon: JSX.Element;

}

const BusinessCard = ({className, icon, header, subTitle}:BusinessCardProps)=> {
    return (
        <div className={`${className}`} style={{marginBottom:"5px"}}>
            {icon}
            <h2>{header}</h2>
            <p>{subTitle}</p>
        </div>
    )
}

export default BusinessCard;