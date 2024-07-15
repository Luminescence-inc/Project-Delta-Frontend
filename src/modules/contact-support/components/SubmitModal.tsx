"use client";
import Modal from "react-modal";
import { FlexRowCenter } from "@components/Flex";

interface IContactSupportSubmitModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  successMessage: string;
  errorMessage: string;
}

export default function ContactSupportSubmitModal({
  isModalOpen,
  closeModal,
  successMessage,
  errorMessage,
}: IContactSupportSubmitModalProps) {
  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-90%",
      transform: "translate(-50%, -50%)",
      maxWidth: "90%",
      maxHeight: "80vh",
      overflow: "auto",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Success Modal"
        style={customStyles}
      >
        <FlexRowCenter className="w-full">
          <h2 className="text-[16px] mb-[10px] font-bold font-pp text-center">
            {successMessage && successMessage}
            {errorMessage && errorMessage}
          </h2>
        </FlexRowCenter>
      </Modal>
    </div>
  );
}
