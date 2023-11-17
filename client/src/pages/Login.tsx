import React, { useEffect } from "react";
import { AUTH_CONTAINER_CLASS, INPUT_CLASS } from "../utils";
import { useForm } from "react-hook-form";
import { AuthCards, AuthNavigation } from "../components";
import { useAuthContext } from "../context";
import { AuthNavigationLabel, FormLabel } from "../types";
import { useAlerts } from "../hooks";
import { useNavigate } from "react-router-dom";

export interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const navigate = useNavigate();
  const { errors: signinErrors, signin } = useAuthContext();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const handleToast = useAlerts();

  useEffect(() => {
    if (signinErrors) {
      handleToast(signinErrors);
    }
  }, [signinErrors]);

  const onSubmit = handleSubmit(async (values) => {
    await signin(values);
    navigate("/tasks");
  });

  return (
    <div className={`${AUTH_CONTAINER_CLASS}`}>
      <AuthCards title={FormLabel.LOGIN}>
        <form onSubmit={onSubmit}>
          <input
            className={`${INPUT_CLASS}`}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            className={`${INPUT_CLASS}`}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 2,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="btn btn-outline my-2 p-2"
          >
            Login
          </button>
        </form>
        <AuthNavigation goTo={AuthNavigationLabel.Register} />
      </AuthCards>
    </div>
  );
};

export default Login;
