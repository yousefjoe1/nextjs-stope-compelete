'use client'
import React, { useEffect, useState } from 'react'
import ReliginForm from '../ReligenQuestions/components/ReliginForm'
import AnswersTable from '../Tables/ReliginTable'
import { io } from "socket.io-client";
import { toast } from 'sonner';

const url = process.env.NEXT_PUBLIC_DB;

const socket = io(url, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const Religin = ({group}:{group: string}) => {
  const [serverResponse, setServerResponse] = useState([]);
  const showToast = (msg: string, color: string = "", time: number = 5000) => {
    toast(msg, {
      duration: time,
      className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
    });
  };


  useEffect(() => {
    socket.emit("getanswers", group);

    socket.on("getanswers", (allAns) => {
      setServerResponse(allAns);
    });

    socket.on("answerSaved", () => {
      showToast(`اجابة جديده `);
      socket.emit("getanswers", group);
    });

    return () => {
      socket.off("getanswers");
      socket.off("answerSaved");
    };
  }, [group]);

  return (
    <section>

      <ReliginForm grRef={group} />
        <div className="overflow-x-auto">
          <AnswersTable data={serverResponse} />
        </div>
    </section>
  )
}

export default Religin