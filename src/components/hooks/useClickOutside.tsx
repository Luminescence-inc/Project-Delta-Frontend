import React, {
    useRef,
    useEffect,
    RefObject,
    HTMLAttributes,
    PropsWithChildren,
  } from 'react';
  
  function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: () => void,
    ref: RefObject<T>
  ): void {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          handler();
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, handler]);
  }
  
  interface ClickOutsideProps extends HTMLAttributes<HTMLDivElement> {
    onClickOutside: () => void;
  }
  
  export function ClickOutside({
    children,
    onClickOutside,
    ...rest
  }: PropsWithChildren<ClickOutsideProps>): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(onClickOutside, ref);
  
    return (
      <div {...rest} ref={ref} className='w-full'>
        {children}
      </div>
    );
  }
  
  export default useClickOutside;