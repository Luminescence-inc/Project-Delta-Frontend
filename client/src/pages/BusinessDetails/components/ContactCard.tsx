import { FlexRowStartCenter, FlexColStart } from "components/Flex";

type ContactCardProps = {
  title: string;
  tagline: string;
  icon: React.ReactNode;
};

export default function ContactCard({
  title,
  tagline,
  icon,
}: ContactCardProps) {
  return (
    <FlexRowStartCenter className="w-full mt-10 gap-10">
      <div className="ntw w-17 h-18">{icon}</div>
      <FlexColStart className="w-auto gap-1">
        <h3 className="ntw text-11 leading-15 font-normal font-hn-light category-name">
          {title}
        </h3>
        <h3
          className="ntw text-13 leading-13 font-normal font-hn-light category-name"
          style={{
            color: "#67A2F1",
          }}
        >
          {tagline}
        </h3>
      </FlexColStart>
    </FlexRowStartCenter>
  );
}
