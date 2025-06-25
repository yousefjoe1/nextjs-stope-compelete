"use client";
import { addGroup } from "@/actions/addGroup";
import { isTokenExist } from "@/actions/isTokenExist";
import { GroupInputs } from "@/types/types";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


class CustomError extends Error {
  code?: number;
  msg?: number;

  constructor(msg: string, code?: number) {
    super(msg);
    this.name = "CustomError";
    this.code = code;
  }
}


const GroupForm = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const showToast = (msg: string, color: string = "", time: number = 5000) => {
    toast(msg, {
      duration: time,
      //   unstyled: true,
      className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupInputs>();

  const groupType = useRef<string | undefined>("");

  const onSubmit: SubmitHandler<GroupInputs> = async (data) => {


    const tk = await isTokenExist()
    if(tk.bool == false) {
      showToast(`انت لست مسجل عندنا او هناك خطا اخر`, "red", 5000);
      return;
    }

    if (groupType.current == "") {
      showToast(`اختر نوع اولا`);
      return;
    }

    const userdata = {
      name: data.name,
      groupType: groupType.current || "",
    };
    setIsSubmit(true);

    try {
      const resp = await addGroup(userdata);

      if (resp.code == 201) {
        showToast(`${resp.msg} -- تم الاضافة `);
        reset()
      }
      if (resp.code == 400 || resp.code != 201) {
        showToast(`${resp.msg} او هناك خطا اخر -- انت لست مسجل عندنا`);
      }

      groupType.current = "";
    } catch (error) {
      if (error instanceof CustomError) {
        showToast(`${error.msg} انت لست مسجل عندنا او هناك خطا اخر`);
      } else {
        showToast(`Unexpected error occurred.`);
      }
      showToast(`انت لست مسجل عندنا او هناك خطا اخر`);
    }
    setIsSubmit(false);
  };

  return (
    <>
      <div
        dir="rtl"
        aos-duration="1000"
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl mx-auto shadow-2xl"
      >
      {
        isSubmit ?
        <div className="loader"></div>:

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="group-name" className="sr-only">
              اسم مجموعه اللعب
            </label>
            <input
              id="group-name"
              {...register("name", {
                required: true,
                maxLength: 20,
                minLength: 2,
              })}
              type="text"
              className="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out"
              placeholder="اسم مجموعه اللعب"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                هذا الحقل مطلوب - اكتب حرفين على الاقل
              </p>
            )}
          </div>
          <div className="type-select">
            <label htmlFor="group-type">اختر النوع</label>
            <div className="select mt-2">
              <select title="اختر النوع" name="group-type" onChange={(e) => (groupType.current = e.target.value)}>
                <option value=""></option>
                <option value="دينية">دينية</option>
                <option value="عامة">ثقافة عامة</option>
              </select>
            </div>
          </div>
          <div>
            <button
            title="إضافة"
              type="submit"
              disabled={isSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            >
              {isSubmit ? <div className="loader"></div> : <span>إضافة</span>}
            </button>
          </div>
        </form>
      }
      </div>
    </>
  );
};

export default GroupForm;
