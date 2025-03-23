import { religinQuestoins } from "@/app/_constants/GameData";

interface Item {
  playerName: string; // Player's name
  character: string; // Character name
  prophet: string; // Prophet name
  companionMale: string; // Male companion
  companionFemale: string; // Female companion
  surah: string; // Surah name
  ghazwa: string; // Ghazwa name
  ayah: string; // Ayah content
}
const AnswersTable = ({ data ,admin}: { data: any,admin?: boolean }) => {
  console.log("🚀 ~ AnswersTable ~ data:", data)
  return (
    <table className="min-w-[99%] mt-10 bg-white border border-gray-300 shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          {
            admin &&
          <th className="py-3 px-6 text-center border-b border-gray-300">
            مسح
          </th>
          }
          <th className="py-3 px-6 text-center border-b border-gray-300">
            اسم اللاعب
          </th>
          <th className="py-3 px-6 text-center border-b border-gray-300">
            الحرف
          </th>
          {religinQuestoins.map((item) => (
            <th
              key={item.id}
              className="py-3 px-6 text-center border-b border-gray-300"
            >
              {item.label}
            </th>
          ))}
          <th className="py-3 px-6 text-center border-b border-gray-300">
            <div className="w-[200px]">ايه من القرءان</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data && data?.map((item: Item, index: number) => (
          <tr
            key={index}
            className={`text-gray-700 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
          >
            {/* {
              admin &&
            <td className="py-3 px-6 text-center border-b border-gray-300">
              <DeleteAnswer /> 
            </td>
            } */}
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.playerName}
            </td>
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.character}
            </td>
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.prophet}
            </td>
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.companionMale}
            </td>
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.companionFemale}
            </td>
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.surah}
            </td>
            <td className="py-3 px-6 text-center border-b border-gray-300">
              {item.ghazwa}
            </td>
            <td className="py-3 w-[200px] px-6 text-center border-b border-gray-300">
              {item.ayah}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnswersTable;
