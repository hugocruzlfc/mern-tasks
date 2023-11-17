import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../context";
import { AuthNavigationLabel, FormLabel, UserInput } from "../types";
import { useNavigate } from "react-router-dom";
import { AUTH_CONTAINER_CLASS, INPUT_CLASS } from "../utils";
import { AuthCards, AuthNavigation } from "../components";
import { useAlerts } from "../hooks";

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const { signup, authStatus, errors: registerErrors } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const handleToast = useAlerts();

  useEffect(() => {
    if (registerErrors) {
      handleToast(registerErrors);
    }
  }, [registerErrors]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/tasks");
    }
  }, [authStatus]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values as UserInput);
  });

  return (
    <div className={`${AUTH_CONTAINER_CLASS}`}>
      <AuthCards title={FormLabel.REGISTER}>
        <form onSubmit={onSubmit}>
          <input
            className={`${INPUT_CLASS}`}
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
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
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="btn btn-outline p-2 my-2"
          >
            Register
          </button>
        </form>
        <AuthNavigation goTo={AuthNavigationLabel.Login} />
      </AuthCards>
    </div>
  );
};

export default Register;
