import { Toaster } from "sonner";
import Aos from "./_common/Aos";
import GroupForm from "./_common/GroupForm/GroupForm";
import GroupCards from "./_common/GroupCards/GroupCards";

export default function Home() {
  return (
    <div dir="rtl" className="py-20 container mx-auto px-4 ">
      <Toaster closeButton position="bottom-center" />
      <Aos />
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