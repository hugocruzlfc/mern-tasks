import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { UserInput } from "../types";
import { useNavigate } from "react-router-dom";

export interface RegisterProps {}

const INPUT_CLASS =
  "w-full bg-zinc-700 border px-4 p-2 rounded-md text-white my-2";

const Register: React.FC<RegisterProps> = ({}) => {
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values as UserInput);
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors?.map((error, index) => (
        <div
          className="alert alert-error my-2"
          key={index}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ))}
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
          className="btn btn-outline"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
