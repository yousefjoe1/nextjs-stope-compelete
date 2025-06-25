"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { useState } from "react";
import { toast } from "sonner";
import { Answers } from "@/types/types";
import {
  arabicAlphabet,
  inputStyle,
  religinQuestoins,
} from "@/app/_constants/GameData";
import { isTokenExist } from "@/actions/isTokenExist";
import { addAnswer } from "@/actions/addAnswer";
import { Toaster } from "@/components/ui/sonner";

interface ReliginFormProps {
  grRef: string | null;
  refetchFunction: () => void; // or () => Promise<void> if async
}

const ReliginForm = ({ grRef, refetchFunction }: ReliginFormProps) => {

  const showToast = (msg: string, time: number = 5000) => {
    toast(msg, {
      duration: time,
    });
  };
  const [isSubmit, setIsSubmit] = useState(false);
  const [character, setCharacter] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Answers>();

  const onSubmit: SubmitHandler<Answers> = async (data) => {
    const token = await isTokenExist();
    if (token.bool == false) {
      showToast("سجل معانا او ادخل بحسابك لو عندك");
      return;
    }
    if (character == '') {
      showToast(`اختر حرف اولا`);
      return;
    }

    setIsSubmit(true);

    try {
      const resp = await addAnswer({
        ...data,
        character: character,
        group: grRef,
        answer_type: "religin",
      });

      if (resp.code == 201) {
        showToast(`${resp.msg} -- تم الاضافة `);
        refetchFunction()
        reset();
      }
      if (resp.code == 400 || resp.code != 201) {
        showToast(`${resp.msg} او هناك خطا اخر -- انت لست مسجل عندنا`);
      }
    } catch (error) {
      console.log("🚀 ~ constonSubmit:SubmitHandler<Answers>= ~ error:", error);
      showToast(`Unexpected error occurred.`);
    }
    setCharacter('')
    setIsSubmit(false);
  };

  const onCharacterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacter(event.target.value);
  };

  return (
    
    <>
    <Toaster closeButton position="bottom-center" />
      <form className="mt-8 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="الحروف">الحروف : </label>
        <select
          id="الحروف"
          className="w-[120px] p-1 rounded-xl px-2 mx-2 text-black "
          onChange={onCharacterChange}
        >
          <option value={""}>اختر حرف</option>
          {arabicAlphabet.map((alpha) => (
            <option key={alpha} value={alpha}>
              {alpha}
            </option>
          ))}
        </select>
        <div className="grid gap-4 lg:grid-cols-3 grid-cols-2">
          {religinQuestoins.map(({ id, label }) => (
            <div key={id}>
              <label htmlFor={id} className="sr-only">
                {label}
              </label>
              <label htmlFor={id}>{label}</label>

              <input
                id={id}
                {...register(id as keyof Answers, {
                  required: true,
                  maxLength: 15,
                  minLength: 2,
                })}
                type="text"
                className={inputStyle}
                placeholder={label}
              />
              {errors[id as keyof Answers] && (
                <p className="text-red-500 text-sm mt-1">
                  اكتب الاجابة او اي حاجة زي لا
                </p>
              )}
            </div>
          ))}
        </div>
        <label className="mt-8 block" htmlFor="ايه">
          ايه او جزء من الايه ولكن لا يفسد المعني
        </label>
        <textarea
          id="ايه"
          className={`${inputStyle}`}
          {...register(`ayah` as keyof Answers, {
            required: true,
            maxLength: 30,
          })}
          placeholder="الايه"
        />
        {errors[`ayah` as keyof Answers] && (
          <p className="text-red-500 text-sm mt-1">
            اكتب الاجابة او اي حاجة زي لا
          </p>
        )}
        <motion.button
          type="submit"
          disabled={isSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
        >
          {isSubmit ? <div className="loader"></div> : <span>خلصت</span>}
        </motion.button>
      </form>
    </>
  );
};

export default ReliginForm;
