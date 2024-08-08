import { cn } from "@/lib/utils";
import { Loader } from "@components/icons";

const Spinner = ({
  className,
  size,
}: {
  className: React.ComponentProps<"div">["className"];
  size?: number;
}) => {
  return <Loader size={size ?? 20} className={cn("animate-spin", className)} />;
};

export default Spinner;
