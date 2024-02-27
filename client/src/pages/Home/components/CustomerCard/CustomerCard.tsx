interface CustomerCardProps {
    className: string;
    header: string;
    subTitle: string;
    icon: JSX.Element;
    style?: object;
}

const CustomerCard = ({className, icon, header, subTitle, style}:CustomerCardProps)=> {
    return (
        <div className={`${className}`} style={style}>
            <div className="icon">{icon}</div>
            <div>
                <h2>{header}</h2>
                <p>{subTitle}</p>
            </div>
        </div>
    )
}

export default CustomerCard;