import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

interface ChipProps {
    text?: string 
    selected?: boolean
    setSelected?:  Dispatch<SetStateAction<string>>
    tabs?: {
      title: string,
      content: JSX.Element
    }[]
}
const ChipTabs = ({tabs}: ChipProps) => {
  const [selected, setSelected] = useState(tabs && tabs[0]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const Render = () => tabs && tabs[activeTabIndex].content;

  return (
    <div  className="flex flex-col md:items-center">

    <div className="px-0 my-5  flex items-center gap-x-2 !overflow-x-scroll no-scrollbar border-b border-">
      {tabs?.map((tab: {title: string}, idx: number) => (
        <Chip
        text={tab.title}
        selected={activeTabIndex === idx}
        setSelected={() => {setSelected(selected); setActiveTabIndex(idx)}}
        key={idx}
        />
      ))}
    </div>
    <div className="overflow-x-scroll">
      <Render />
    </div>
      </div>
  );
};

const Chip = ({ text, selected, setSelected}: ChipProps) => {
  return (
    <button
      onClick={() => setSelected && setSelected(text || '')} 
      className={`${
        selected
          ? "p-3  rounded-lg"
          : "text-blue-200 hover: hover: w-full h-full"
      } text-sm transition-colors p-3 py-2 relative px-0 whitespace-nowrap mx-1 md:mx-2 w-full`}
    >
      <span className={`relative block w-full z-10 ${selected ? 'text-[#1ABEBB] block p-3 rounded-lg !w-full ' : 'p-3'}`}>{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          // className="absolute inset-0 z-0 bg-gradient-to- border-b border-[]  from-[#1ABEBB] to-[#1ABEBB] rounded-md"
          className="absolute inset-0 z-0 bg-gradient-to- border-b-2 border-[#1ABEBB]"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;