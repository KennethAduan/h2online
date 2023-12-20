import React from "react";
import { useState } from "react";
import {
  Input,
  Button,
  Switch,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../utils/redux/hooks";
import { useNavigate } from "react-router-dom";
import { checkUserData } from "../../firebase/services";
import { BiSolidUser } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlepasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const checkUserCredentials = await checkUserData(userName, password);
      if (!checkUserCredentials.empty) {
        const userData = checkUserCredentials.docs[0].data();

        // dispatch(
        //   UserInfoRedux({
        //     userName: userData.userName,
        //     userFirstName: userData.firstName,
        //     userLastName: userData.lastName,
        //     userPassword: userData.password,
        //     userId: userData.userId,
        //   })
        // );
        localStorage.setItem("userData", JSON.stringify(userData));
        setLoading(false);
        navigate("/dashboard");
        // console.log(userData);
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid username or password",
        });
      }
      // setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-blue-100">
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md drop-shadow-xl border-1">
          <Typography variant="h4" color="black" placeholder={undefined}>
            Admin
          </Typography>
          <Typography
            color="gray"
            className="mt-1 font-normal"
            placeholder={undefined}
          >
            Enter your details to Sign In.
          </Typography>

          <form className="mt-6" onSubmit={handleLogin}>
            <div>
              <Input
                crossOrigin={undefined}
                label="Username"
                icon={<BiSolidUser color="white" />}
                required
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                size="lg"
                color="black"
              />
            </div>
            <div className="mt-4">
              <Input
                crossOrigin={undefined}
                label="Password"
                icon={<AiFillLock color="white" />}
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlepasswordChange}
                size="lg"
                color="black"
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              {loading ? (
                <Spinner color="blue" className="w-10 h-10" />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  color="blue"
                  placeholder={undefined}
                >
                  Sign In
                </Button>
              )}
            </div>
          </form>
          <div className="flex justify-end mt-4 text-xs">
            <Switch
              crossOrigin={undefined}
              id="purple"
              color="blue"
              label="Show Password"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
