import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../service/usersService";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Missing email and password");
      return;
    }
    setLoginLoading(true);
    let res = await loginApi(email.trim(), password);
    console.log("Login", res);
    if (res && res.data && res.data.token) {
      context.login(email, res.data.token);
      navigate("/");
      toast.success("Login successfully");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoginLoading(false);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login">
      <div className="col-lg-5 col-md-8 col-sm-10 bg-white mx-auto my-0 p-4 ">
        <div className="login-title text-[30px] font-extrabold text-center mb-4">
          Login
        </div>
        <div>
          <div className="login-label font-semibold mb-2">
            Email: eve.holt@reqres.in
          </div>
          <input
            className="login-input bg-[#e4e4e4] border-[1px] border-[#b9b9b9] rounded-[5px] h-[47px] w-full outline-none px-3 caret-[#666565]  "
            placeholder="Enter your email..."
            value={email}
            type="email"
            onChange={(e) => handleEmailInput(e)}
          />
          <div className="relative mt-2">
            <input
              className="login-input bg-[#e4e4e4] border-[1px] border-[#b9b9b9] rounded-[5px] h-[47px] w-full outline-none px-3 caret-[#666565]  "
              placeholder="Password..."
              value={password}
              type={isShowPassword === true ? "text" : "password"}
              onChange={(e) => handlePasswordInput(e)}
              onKeyDown={(e) => handlePressEnter(e)}
            />
            <div
              className="absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <div className={`${!isShowPassword && "hidden"}`}>
                <i className={`fa-solid fa-eye`}></i>
              </div>
              <div className={`${isShowPassword && "hidden"}`}>
                <i className="fa-solid fa-eye-slash"></i>
              </div>
            </div>
          </div>
          <button
            className={`${
              email && password
                ? "bg-[#e43d3d] hover:bg-[#d85454] cursor-pointer"
                : "bg-slate-200 cursor-not-allowed text-[#797575] disabled"
            } h-[52px] w-full flex justify-center items-center  mt-4 font-medium  rounded-lg transition-all `}
            onClick={handleLogin}
            disabled={email && password ? false : true}
          >
            {loginLoading && (
              <div className="animate-spin mr-2">
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              </div>
            )}
            Login
          </button>
          <div className="mt-3 font-medium cursor-pointer text-center">
            {"<<"}
            <Link to="/">Go back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
