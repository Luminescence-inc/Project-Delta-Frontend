<Popover>
        <PopoverTrigger className="w-full h-[46px] disabled:bg-white-106 disabled:cursor-not-allowed border-[1px] border-solid border-white-200 bg-none text-xs font-pp px-3 py-1 rounded-md">
          <FlexRowStartBtw className="w-full">
            <span className="mt-1">{placeholder}</span>
            <ChevronDown size={20} color="#000" className="stroke-dark-100" />
          </FlexRowStartBtw>
        </PopoverTrigger>
        <PopoverContent className="w-full max-h-[300px] overflow-auto">
          <div className="w-[370px]">
            {selectedValue && (
              <FlexRowStartBtw className="w-full py-2 border-b-[1px] bordcer-b-solid border-b-white-40 mb-2">
                <span className="font-pp text-sm text-dark-100">
                  {selectedValue.value}
                </span>
                <button className="text-xs font-pp" onClick={handleCancel}>
                  <X
                    size={18}
                    strokeWidth={3}
                    color="#000"
                    className="stroke-dark-100"
                  />
                </button>
              </FlexRowStartBtw>
            )}
            {options?.map((option) => {
              const isSelected = selectedValue?.uuid === option.uuid;
              const isMatchingValue =
                value.length > 0 &&
                option.value.toLowerCase().includes(value?.toLowerCase());

              return (
                <button
                  className={cn(
                    "w-full py-[8px] px-3 text-left cursor-pointer leading-[20px] tracking-normal text-dark-103 text-[14px] font-inter font-medium rounded-md ",
                    isSelected ? "bg-blue-200 text-white-100" : "text-dark-106"
                  )}
                  key={option.uuid}
                  onClick={() => handleSelect(option)}
                >
                  <span>{option.value}</span>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
