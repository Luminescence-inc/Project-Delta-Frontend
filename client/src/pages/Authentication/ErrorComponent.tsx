const ErrorComponent = ({ value }: { value: string }) => {
  return <span className="text-red-305 flex text-[13px]">{value}</span>;
};

export default ErrorComponent;
