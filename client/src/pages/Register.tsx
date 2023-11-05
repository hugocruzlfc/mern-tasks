import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/auth";

export interface RegisterProps {}

const INPUT_CLASS =
  "w-full bg-zinc-700 border px-4 p-2 rounded-md text-white my-2";

const Register: React.FC<RegisterProps> = ({}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const user = await registerUser(values);
    console.log(user);
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
          className="text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
