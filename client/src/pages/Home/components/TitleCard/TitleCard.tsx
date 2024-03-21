interface TitleCardProps {
    className: string;
    title: string;
    header: string;
    subTitle: string;
}

const TitleCard = ({className, title, header, subTitle}:TitleCardProps)=> {
    return (
        <div className={`${className}`}>
            <h5>{title}</h5>
            <h1>{header}</h1>
            <p>{subTitle}</p>
        </div>
    )
}

export default TitleCard;