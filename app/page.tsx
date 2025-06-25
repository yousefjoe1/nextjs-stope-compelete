import { Toaster } from "sonner";
import Aos from "./_common/Aos";
import GroupForm from "./_common/GroupForm/GroupForm";
import GroupCards from "./_common/GroupCards/GroupCards";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function Home() {
  return (
    <div dir="rtl" className="py-20 container mx-auto px-4 ">
      <Toaster closeButton position="bottom-center" />
      <Aos />

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="button-82-pushable" role="button">
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">
              <Info className="inline ml-2" />
              عن اللعبة
            </span>
          </button>
          </DialogTrigger>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg">عن اللعبة</DialogTitle>
            </DialogHeader>
            <ul className="list-disc pr-6 space-y-2 text-base mt-4">
              <li>
                اللعبة تساعدك على معرفة معلومات دينية وثقافية بطريقة ممتعة.
              </li>
              <li>
                يمكنك عمل مسابقة مع أصدقائك لمعرفة من الأسرع في الإجابة
                بالمعلومات التي يعرفها.
              </li>
              <li>
                ستتعلم معلومات جديدة بطريقة ذكية وستتذكرها أثناء اللعب لتفوز
                وتكون الأول.
              </li>
              <li>
                اللعبة في بدايتها وتطورها مستمر، وكل فترة ستجد تحديثات جديدة
                وتجربة أكثر متعة.
              </li>
            </ul>
          </DialogContent>
        </Dialog>
      </div>

      <h1 className="lg:text-3xl font-bold lg:my-10 mb-4 text-center">
        مرحبا بك 👋
      </h1>

      <GroupForm />

      <div className="grid lg:grid-cols-2 gap-8 pt-10">
        <GroupCards />
      </div>
    </div>
  );
}
