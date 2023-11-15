import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { UserInput } from "../types";
import { useNavigate } from "react-router-dom";

export interface RegisterProps {}

const INPUT_CLASS =
  "w-full bg-zinc-700 border px-4 p-2 rounded-md text-white my-2";

const Register: React.FC<RegisterProps> = ({}) => {
  const { signup, isAuthenticated } = useAuth();
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
    console.log(values);
    await signup(values as UserInput);
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
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
        <input
          className={`${INPUT_CLASS}`}
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />
        <input
          className={`${INPUT_CLASS}`}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
        />
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
