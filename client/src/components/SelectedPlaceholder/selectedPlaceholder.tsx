import { X } from "lucide-react";
import "./placeholder.scss";

type Props = {
  selectedValues: {
    uuid: string;
    value: string;
  }[];
  visible: boolean;
  getSelectedHoler: (id: string) => void;
  type: "category" | "day";
};

export default function SelectedPlaceholder({
  selectedValues,
  getSelectedHoler,
  visible,
  type,
}: Props) {
  if (!selectedValues) return null;

  return (
    <>
      {selectedValues.length > 0 && !visible && (
        <div className="days-of-operation-container">
          {selectedValues.map((d) => (
            <div key={d.uuid} className="dop-placeholder">
              <span>{type === "day" ? d.value.slice(0, 3) : d.value}</span>
              <button
                className="close-btn"
                onClick={() => {
                  getSelectedHoler(d.uuid);
                }}
              >
                <X className="icon" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
