/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Tooltip } from "@material-tailwind/react";

const defaultStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalComponentProps {
  children: React.ReactNode;
  buttonName: React.ReactNode;

  icon?: any;

  customStyle?: any; // Accept custom style

  variant?: any;
  isOpen: boolean;
  color?: any;
  onClose: () => void; // Add onClose prop to handle closing the modal
  onOpen: () => void; // Add onOpen
}

export default function ModalComponent({
  children,
  buttonName,
  icon,
  customStyle,
  variant = "filled",
  isOpen,
  onClose, // Add onClose prop
  onOpen, // Add onOpen prop
  color = "blue",
}: ModalComponentProps) {
  const mergedStyle = { ...defaultStyle, ...customStyle }; // Merge default and custom styles

  return (
    <div>
      <Tooltip content={buttonName} placement="bottom">
        <Button
          onClick={onOpen} // Use the onClose prop to close the modal
          placeholder={undefined}
          color={color}
          variant={variant}
        >
          {icon ? icon : buttonName}
        </Button>
      </Tooltip>
      <Modal
        open={isOpen}
        onClose={onClose} // Use the onClose prop to close the modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mergedStyle}>{children}</Box>
      </Modal>
    </div>
  );
}
