import React, {
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Loader, X } from "../icons";
import {
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowEndCenter,
  FlexRowStartCenter,
} from "../Flex";
import { cn } from "@/lib/utils";
import Spinner from "../Spinner";
import { LoaderComponent } from "../Loader";

interface RenderProps {
  searchResult: { value: string }[] | [];
  searchValue: string;
  value?: Record<string, string | null>;
  setValue?: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >;
  closePanel?: () => void;
  activeItem: string | null;
}

type Items = { value: string; id?: string; label?: string }[];

interface NSelectProps {
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: React.ComponentProps<"div">["className"];
  label?: string;
  items?: Items;
  searchKey?: "value" | "id";
  disabled?: boolean;
  error?: string | null;
  render: (props: RenderProps) => React.ReactElement;
  value?: string | null;
  loading?: boolean;
  onClick?: () => void;
  activeItem?: string | null;
}

export function NSelect({
  placeholder = "Select an option",
  leftIcon,
  rightIcon,
  className,
  label,
  items,
  searchKey,
  disabled,
  error,
  render,
  loading,
  onClick,
  activeItem,
  value,
}: NSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Items>([]);
  const parentRef = useRef<HTMLDivElement>(null);

  const onSearchChange = (value: string) => {
    if (items && items?.length > 0) {
      if (value.length > 0) {
        const result = items?.filter((item) => {
          // @ts-expect-error
          return item[searchKey ?? "value"]
            .toLowerCase()
            .includes(value.toLowerCase().trim());
        });
        setSearchResult(result);
      } else {
        setSearchResult(items);
      }
    }
  };

  return (
    <FlexColStart className="w-full" id="nselect-parent">
      <label className="text-[14px] font-normal font-pp text-blue-200">
        {label}
      </label>
      <Popover open={open}>
        <PopoverTrigger
          className={cn(
            "w-full h-[46px] border-[1.5px] border-solid tracking-[0px] text-[12px] text-blue-200 px-4 rounded-[5px] disabled:opacity-[.5] disabled:cursor-not-allowed disabled:bg-white-400/10",
            error && error?.length > 0 && "border-red-305",
            open ? "border-blue-200/60" : "border-white-400/30",
            className
          )}
          onClick={() => {
            setOpen(!open);
            onClick && onClick();
          }}
          disabled={disabled}
        >
          <FlexRowCenterBtw className="w-full">
            <FlexRowStartCenter className="w-auto">
              {leftIcon}
              <span
                className={cn(
                  "text-[14px] font-pp text-dark-100 font-medium",
                  placeholder && !value && "opacity-[.4] font-normal"
                )}
              >
                {value ?? placeholder ?? "Select..."}
              </span>
            </FlexRowStartCenter>
            <FlexRowEndCenter className="w-auto">
              {loading && (
                <Loader className="stroke-dark-100 animate-spin" size={20} />
              )}
              {rightIcon ? rightIcon : <ChevronDown size={20} />}
            </FlexRowEndCenter>
          </FlexRowCenterBtw>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]"
          ref={parentRef}
        >
          <FlexColStart className="w-full">
            <FlexRowStartCenter className="w-full">
              <input
                type="text"
                className="w-full px-[3px] py-[2px] text-[15px] border-b-[1px] bordcer-b-solid border-b-white-40 outline-none placeholder:text-blue-200/50"
                placeholder="Search..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchValue(e.target.value);
                  onSearchChange(e.target.value);
                }}
              />
            </FlexRowStartCenter>
            <ScrollArea className="w-full">
              {render &&
                render({
                  searchResult,
                  searchValue,
                  //   setValue: setInpValue!,
                  //   value: inpvalue,
                  closePanel: () => setOpen(false),
                  activeItem: activeItem!,
                })}
            </ScrollArea>
          </FlexColStart>
        </PopoverContent>
      </Popover>
    </FlexColStart>
  );
}

interface NSelectItemProps {
  value: string;
  onClick: () => void;
  active?: boolean;
  className?: React.ComponentProps<"div">["className"];
  href?: string;
}

export function NSelectItems({
  value,
  onClick,
  active,
  className,
  href,
}: NSelectItemProps) {
  return (
    <>
      {href ? (
        <a
          href={href}
          className={cn(
            "w-full h-[35px] px-3 rounded-md flex items-center gap-2 font-pp text-sm cursor-pointer",
            active ? "bg-blue-200 text-white-100" : " text-dark-100",
            className
          )}
        >
          {value}
        </a>
      ) : (
        <button
          className={cn(
            "w-full h-[35px] px-3 rounded-md flex items-center gap-2 font-pp text-sm cursor-pointer",
            active ? "bg-blue-200 text-white-100" : " text-dark-100",
            className
          )}
          onClick={onClick}
        >
          <span>{value}</span>
        </button>
      )}
    </>
  );
}

interface NItemNotFound {
  text?: string;
  className?: React.ComponentProps<"div">["className"];
}

export function NItemNotFound({ text, className }: NItemNotFound) {
  return (
    <p
      className={cn(
        "w-full h-[40px] text-sm font-pp text-white-400/60 flex items-center justify-center",
        className
      )}
    >
      {text ?? "No result found"}
    </p>
  );
}
