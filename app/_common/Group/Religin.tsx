'use client'
import React, {  useEffect, useState } from 'react'
import ReliginForm from '../ReligenQuestions/components/ReliginForm'
import AnswersTable from '../Tables/ReliginTable'
import { toast } from 'sonner';
import { getAnswers } from '@/actions/getAnswers';



const Religin = ({group}:{group: string}) => {
  const [serverResponse, setServerResponse] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const showToast = (msg: string, color: string = "", time: number = 5000) => {
    toast(msg, {
      duration: time,
      className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      const res = await getAnswers('answers/player-answers',group)
      if (res.code == 400 || res.code != 200) {
        showToast('حدث خطأ أثناء جلب البيانات', 'red');
        return;
      }else {
        setServerResponse(res.data);
      }
      
    }
    fetchData()
  }, [group, refetch]);

  return (
    <section>

      <ReliginForm grRef={group} refetchFunction={()=> setRefetch(!refetch)} />
        <div className="overflow-x-auto">
          <AnswersTable data={serverResponse} />
        </div>
    </section>
  )
}

export default Religin