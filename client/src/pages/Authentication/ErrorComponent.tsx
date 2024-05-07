interface IErrorComponent {
  value: string;
  _ref?: React.RefObject<HTMLDivElement>;
}

const ErrorComponent = ({ value, _ref }: IErrorComponent) => {
  return (
    <span ref={_ref} className="text-red-305 flex text-[13px]">
      {value}
    </span>
  );
};

export default ErrorComponent;
