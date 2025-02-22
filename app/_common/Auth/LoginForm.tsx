"use client";
import { loginAction } from "@/actions/loginAcation";
import { toast } from "sonner";
import React, { useEffect,  useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "@/components/ui/sonner";
import { isTokenExist } from "@/actions/isTokenExist";
import Link from "next/link";

// import { useRouter } from "next/navigation";
type Inputs = {
  email: string;
  password: string;
};

type errors = {
  msg: string
}

const LoginForm = () => {
  // const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const showToast = (msg: string, color: string, time: number = 5000) => {
    toast(msg, {
      duration: time,
      unstyled: true,
      className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
    });
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const effectRan = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await isTokenExist();
      if (token.bool) {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userdata = {
      email: data.email,
      password: data.password,
    };

    setIsSubmit(true);

    try {
      const resp = await loginAction(userdata);
      if (resp.code == 400) {
        showToast(resp.msg, "red");
        setIsSubmit(false);
        return;
      }
      if (resp.data.code == 400) {
        if (Array.isArray(resp.data.errros)) {
          resp.data.errros.map((error:errors) => {
            showToast(error.msg, "red");
          });
        }
      } else {
        showToast(resp.msg, "red");
        
        // showToast(`يتم توجيهك الى الصفحه الرئيسية`, "green");
        
        setTimeout(() => {
          window.location.reload();
          // router.push("/");
        }, 2000);
      }
    } catch (er) {
      console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ er:", er);
    }

    setIsSubmit(false);
  };


  

  return (
    <div>
      <Toaster closeButton position="bottom-center" />
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            {...register("email", { required: true })}
            type="email"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">هذا الحقل مطلوب</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            {...register("password", { required: true, minLength: 8 })}
            type="password"
            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {" "}
              اكتب عدد من الحروف لا يقل عن 8{" "}
            </p>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <button
            type="submit"
            disabled={isSubmit}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
          >
            {isSubmit ? <div className="loader"></div> : <span>دخول</span>}
          </button>
          {isAuthenticated && (
        <Link
          href="/"
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out"
        >
          الذهاب للرئيسية
        </Link>
      )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
