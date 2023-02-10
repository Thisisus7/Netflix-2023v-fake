import Head from "next/head"
import Image from "next/legacy/image"
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";


import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
};

function Login() {
  // hook form
  const [login, setLogin] = useState(false); 
  const { signIn, signUp } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (login) {
      await signIn(data.email, data.password)
    } else {
      signUp(data.email, data.password)
    };
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg image */}
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"  // Netflix config
        objectFit="cover"
      />
      {/* logo */}
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-8 md:top-5"
        width={166.5}
        height={166.5}
      />
      {/* login */}
      { /* "handleSubmit" will validate your inputs before invoking "onSubmit" */ }
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        {/* input */}
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input 
              type="email" 
              placeholder="Email" 
              className="input" {...register("email", { required:true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input 
              type="password" 
              placeholder="Password" 
              className="input" {...register("password", { required:true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        {/* Sign in button */}
        <button 
          type="submit"
          className="w-full rounded bg-[#e50914]"
          onClick={() => {setLogin(true)}}
        >Sign In
        </button>
        {/* Sign up */}
        <div className="text-[gray]">
          New to Netflix?{" "}
          <button 
            type="submit" 
            className="text-white hover:underline" 
            onClick={() => {setLogin(false)}}
          >Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login