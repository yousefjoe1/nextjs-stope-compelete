import LoginForm from "@/app/_common/Auth/LoginForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
      >
        <div className="flex items-center justify-center">
          <div className="text-sm">
            <Link className="text-blue-600" href='/register' >معندكش حساب ? طب سجل من هنا عندك حساب</Link>
          </div>
        </div>
          <h2 className="text-3xl font-bold text-center">تسجيل الدخول</h2>
          <LoginForm />
      </div>
    </section>
  );
};

export default page;
