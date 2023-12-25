import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Input, Switch } from "@material-tailwind/react";
import Modal from "@mui/material/Modal";
import { BiSolidUser } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import GetAdminCredentials from "../../firebase/hooks/GetAdminCredentials";
import { useAppSelector } from "../../utils/redux/hooks";
import { ProfileIcon } from "../Icons";
import { EditAdminData } from "../../firebase/services/AdminDataManager";

interface ProfileState {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const ProfileModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileState>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const { userId } = useAppSelector((state) => state.user);
  const adminData = GetAdminCredentials(userId);

  useEffect(() => {
    if (adminData) {
      setProfile({
        username: adminData.username || "",
        password: adminData.password || "",
        firstname: adminData.firstName || "",
        lastname: adminData.lastName || "",
      });
    }
  }, [adminData]);

  const handleChange =
    (prop: keyof ProfileState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfile({ ...profile, [prop]: event.target.value });
    };

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId) {
      await EditAdminData({
        userId: userId.toString(), // Assuming userId is a number and EditAdminData expects a string
        username: profile.username,
        password: profile.password,
        firstName: profile.firstname,
        lastName: profile.lastname,
        // Include other fields you want to update
      });
    } else {
      console.error("No userId available to update data");
    }
  };

  return (
    <div>
      <Tooltip title="Profile" placement="bottom">
        <IconButton aria-label="Profile" onClick={() => setOpen(true)}>
          {ProfileIcon}
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <h1 className="text-xl font-bold">Admin Profile</h1>
          <form className="mt-6 space-y-4" onSubmit={handleSave}>
            <Input
              label="Firstname"
              crossOrigin={undefined}
              icon={<BiSolidUser color="white" />}
              required
              type="text"
              value={profile.firstname}
              onChange={handleChange("firstname")}
              size="lg"
              color="black"
            />
            <Input
              label="Lastname"
              crossOrigin={undefined}
              icon={<BiSolidUser color="white" />}
              required
              type="text"
              value={profile.lastname}
              onChange={handleChange("lastname")}
              size="lg"
              color="black"
            />
            <Input
              label="Username"
              crossOrigin={undefined}
              icon={<BiSolidUser color="white" />}
              required
              type="text"
              value={profile.username}
              onChange={handleChange("username")}
              size="lg"
              color="black"
            />
            <Input
              crossOrigin={undefined}
              label="Password"
              icon={<AiFillLock color="white" />}
              required
              type={showPassword ? "text" : "password"}
              value={profile.password}
              onChange={handleChange("password")}
              size="lg"
              color="black"
            />

            <div className="flex justify-end mt-4 text-xs">
              <Switch
                crossOrigin={undefined}
                id="show-password"
                color="blue"
                label="Show Password"
                checked={showPassword}
                onChange={handleTogglePasswordVisibility}
              />
            </div>
            {/* Cancel and save button */}
            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
