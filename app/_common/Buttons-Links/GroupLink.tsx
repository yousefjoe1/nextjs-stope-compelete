"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

const GroupLink = ({ grRef }: { grRef: string }) => {
  const showToast = (msg: string, color: string = "", time: number = 5000) => {
    toast(msg, {
      duration: time,
      className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
    });
  };
  const handleCopy = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        showToast("تم نسخ الرابط بنجاح!");
      })
      .catch((err) => {
        showToast("خطأ في نسخ الرابط: ", err);
      });
  };
  return (
    <Button
        className="mb-5 text-white py-2 px-4 rounded "
      onClick={() =>
        handleCopy(`https://nextjs-stope-compelete.vercel.app/group?t=religin&g=${grRef}`)
      }
    >
      اضغط لنسخ اللينك لترسلة لاصدقائك .. استمتعوا
    </Button>
  );
};

export default GroupLink;
