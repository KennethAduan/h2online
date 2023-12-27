import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import {
  Input,
  Button,
  Switch,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/utils/redux/hooks";
import { useNavigate } from "react-router-dom";
import { checkUserData } from "@/firebase/services/authManager";
import { BiSolidUser } from "react-icons/bi";
import { AiFillLock } from "react-icons/ai";
import { UserInfoRedux } from "@/utils/redux/slice/userSlice";

type Credentials = {
  userName: string;
  password: string;
};

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setCredentials((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userName, password } = credentials;
    try {
      setLoading(true);
      const checkUserCredentials = await checkUserData(userName, password);
      if (!checkUserCredentials.empty) {
        const userData = checkUserCredentials.docs[0].data();
        dispatch(
          UserInfoRedux({
            userFirstName: userData.firstName,
            userLastName: userData.lastName,
            userName: userData.username,
            userId: userData.userId,
            userPassword: userData.password,
          })
        );
        localStorage.setItem("userData", JSON.stringify(checkUserCredentials));
        navigate("/pos");
      } else {
        Swal.fire("Oops...", "Invalid username or password", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-full max-w-sm p-6 m-auto bg-white rounded-lg shadow-md">
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

        <form className="my-4 space-y-6" onSubmit={handleLogin}>
          <Input
            label="Username"
            icon={<BiSolidUser color="white" />}
            required
            name="userName"
            type="text"
            value={credentials.userName}
            onChange={handleInputChange}
            size="lg"
            color="black"
            crossOrigin={undefined}
          />
          <Input
            crossOrigin={undefined}
            label="Password"
            icon={<AiFillLock color="white" />}
            required
            name="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={handleInputChange}
            size="lg"
            color="black"
          />
          <div className="flex items-center justify-center mt-6">
            {loading ? (
              <Spinner color="blue" className="w-10 h-10" />
            ) : (
              <Button
                type="submit"
                color="blue"
                fullWidth
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
  );
};

export default Login;
