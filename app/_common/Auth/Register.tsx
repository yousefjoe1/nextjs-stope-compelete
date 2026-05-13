"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { registerAction } from "@/actions/loginAcation";

type Inputs = {
    name: string;
    email: string;
    password: string;
};

const RegisterForm = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const showToast = (msg: string, color: "green" | "red") => {
        toast(msg, {
            duration: 4000,
            unstyled: true,
            className: `border-t-4 ${color === "green" ? "border-green-500 text-green-900" : "border-red-500 text-red-900"
                } rounded-b bg-white px-4 py-3 shadow-md`,
        });
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsSubmit(true);
        try {
            const resp = await registerAction(data);

            if (resp.code === 400) {
                // لو السيرفر بيرجع أخطاء في مصفوفة (Validation)
                if (resp.errors && Array.isArray(resp.errors)) {
                    resp.errors.forEach((err: { msg: string }) => showToast(err.msg, "red"));
                } else {
                    showToast(resp.msg || "خطأ في البيانات", "red");
                }
            } else if (resp.token) {
                // نجاح التسجيل
                localStorage.setItem("playerToken", resp.token);
                showToast("تم التسجيل بنجاح، جاري التوجيه...", "green");

                // توجيه للصفحة الرئيسية بعد ثانية
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                showToast(resp.msg || "حدث خطأ غير متوقع", "red");
            }
        } catch (err) {
            console.log("🚀 ~ onSubmit ~ err:", err)
            showToast("عذراً، حدث خطأ ما", "red");
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <>
            <Toaster closeButton position="bottom-center" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                اعمل حساب بسهولة
            </h2>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {/* حقل الاسم */}
                <div>
                    <input
                        {...register("name", { required: true, minLength: 2, maxLength: 20 })}
                        type="text"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition duration-300"
                        placeholder="الاسم"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">الاسم مطلوب (2-20 حرف)</p>
                    )}
                </div>

                {/* حقل الايميل */}
                <div>
                    <input
                        {...register("email", { required: true })}
                        type="email"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition duration-300"
                        placeholder="الايميل"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">الايميل مطلوب</p>
                    )}
                </div>

                {/* حقل الباسورد */}
                <div>
                    <input
                        {...register("password", { required: true, minLength: 6 })}
                        type="password"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition duration-300"
                        placeholder="رقم المرور"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">كلمة المرور يجب ألا تقل عن 6 أحرف</p>
                    )}
                </div>

                {/* زر الإرسال مع الأنيميشن */}
                <motion.button
                    type="submit"
                    disabled={isSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300"
                >
                    {isSubmit ? <div className="loader"></div> : <span>تسجيل</span>}
                </motion.button>
            </form>
        </>
    );
};

export default RegisterForm;