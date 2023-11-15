import React from "react";
import { AUTH_CONTAINER_CLASS, INPUT_CLASS } from "../utils";
import { useForm } from "react-hook-form";
import { Alerts, AuthCards } from "../components";

export interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((values) => {
    console.log(values);
  });

  return (
    <div className={`${AUTH_CONTAINER_CLASS}`}>
      {/* <Alerts registerErrors={registerErrors} /> */}

      <AuthCards title="Login">
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
              minLength: 6,
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
      </AuthCards>
    </div>
  );
};

export default Login;
