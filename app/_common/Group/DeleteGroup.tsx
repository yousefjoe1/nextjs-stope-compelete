"use client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteAction } from "@/actions/deleteAction";
import { toast } from "sonner";

const DeleteGroup = ({ group }: { group: string }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const showToast = (msg: string, color: string = "", time: number = 5000) => {
    toast(msg, {
      duration: time,
      //   unstyled: true,
      className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
    });
  };

  const deleteFunc = async () => {
    setIsSubmit(true);
    try {
      const resp = await deleteAction(group);
      
      if (resp.code == 201) {
        showToast(`${resp.msg} -- تم المسح `);
      }
    } catch (error) {
      console.log("🚀 ~ deleteFunc ~ error:", error);
    }
    setIsSubmit(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="bg-red-500 h-full text-white p-1 rounded-md "
          >
            <Trash2 size={15} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Delete Group </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button
              type="button"
              variant="destructive"
              disabled={isSubmit}
              className={`${isSubmit ? ``:`bg-red-500`} text-white`}
              title="مسح"
              onClick={deleteFunc}
            >
              تأكيد المسح
              
            </Button>
            {isSubmit && <div className="delete-loader" />}
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteGroup;
