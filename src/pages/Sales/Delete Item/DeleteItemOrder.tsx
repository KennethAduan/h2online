/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ModalComponent from "../../../components/Modal/ModalComponent";
import { DeleteItemPurchaseOrderById } from "../../../firebase/services";
import Swal from "sweetalert2";
const Icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  // bgcolor: colors.primary,
  // borderColor: colors.tertiary,
  border: "3px solid",
  borderRadius: 2,
  p: 3,
};

const DeleteItemOrder = (id: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const ConfirmDelete = async () => {
    try {
      await DeleteItemPurchaseOrderById(id.id);
      await handleCancel();
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <ModalComponent
        buttonName={"Delete"}
        icon={Icon}
        variant={"text"}
        customStyle={style}
        isOpen={isModalOpen}
        onClose={handleCancel}
        onOpen={handleOpenModal}
        color={"red"}
      >
        <div>
          <h1 className="md:text-lg lg:text-xl">
            Are you sure you want to delete this item?
          </h1>
          <h1 className="md:text-lg lg:text-xl">Item ID: {id.id}</h1>
        </div>
        {/* Button */}
        <div className="flex justify-center mt-4 space-x-12">
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            onClick={ConfirmDelete}
          >
            Confirm
          </button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default DeleteItemOrder;
