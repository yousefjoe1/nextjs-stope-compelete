"use client";
import { isTokenExist } from "@/actions/isTokenExist";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";


const url = process.env.NEXT_PUBLIC_DB;
import { io } from "socket.io-client";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
const socket = io(url, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

interface User {
  message: string;
  player: string;
}

const PlayersChat = ({ groupId }: { groupId: string | null }) => {
    const [serverResponse, setServerResponse] = useState<User[]>([]);
    const [playerMsg, setplayerMsg] = useState("");
    const [loading, setloading] = useState(false);
    
    const router = useRouter();
    
    const showToast = (msg: string, color: string = "", time: number = 5000) => {
        toast(msg, {
          duration: time,
          //   unstyled: true,
          className: `border-t-4 border-${color}-500 rounded-b text-${color}-900 px-4 py-3 shadow-md`,
        });
      };
    

  const effectRan = useRef(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await isTokenExist();
      if (token.bool) {
        if (effectRan.current) {
        } else {
          socket.emit("join_group", { groupId: groupId, tk: token.tok });
          effectRan.current = true;
        }
      }
    };

    checkAuth();
  }, [groupId]);

  useEffect(() => {
    const getMsgs = async () => {
      const token = await isTokenExist();

      if (token.bool) {
        socket.on("get_msg", (allMsgs) => {
          setloading(false);
          setServerResponse((p) => [...p, allMsgs]);
        });
      }
    };

    getMsgs();

    return () => {
      socket.off("get_msg");
      socket.off("joined");
    };
  }, [socket]);


  useEffect(() => {
    const messages = async () => {
      const token = await isTokenExist();

      if (token.bool) {
        socket.on("joined", (allMsgs) => {
          setServerResponse((p) => [...p, allMsgs]);
        });
      }
    };

    messages();
  }, [socket]);

  const sendMessage = async () => {
    const token = await isTokenExist();

    if (token.bool == false) {
        showToast("سجل معانا او ادخل بحسابك لو عندك");
      setTimeout(() => {
        router.push("/");

      }, 1900);
      return;
    }

    if (playerMsg == "") {
        showToast("اكتب الرسالة اولا");
      return;
    }

    setloading(true);
    socket.emit("player_msg", {
      message: playerMsg,
      room: groupId,
      plsc: token.tok,
    });
    setplayerMsg("");
  };

  return (
    <section>
      <Toaster closeButton position="bottom-center" />

      {/* <Alert
        className="w-fit"
        message={`شات مع اصحابك عشان تتفقوا علي حرف وتلعبوا ع طول`}
        type="success"
      /> */}
      <div className="h-60 lg:w-1/2 p-1 rounded-2xl overflow-y-auto bg-blue-300/40 mt-1">
        {serverResponse &&
          serverResponse.map((msg, indx) => (
            <div key={indx} className="shadow-lg py-1 px-2 rounded-2xl mt-2">
              <h3> {msg.player} </h3>
              <Badge className="lg:text-lg" variant="secondary"> {msg.message} </Badge>
              {/* <Alert
                message={msg.message}
                type="info"
                className="border-none"
              /> */}
            </div>
          ))}
      </div>
      <form>
        <label htmlFor="plyer-msg" className="sr-only">
          ارسل رسالة لاصحابك
        </label>
        <input
          value={playerMsg}
          required
          placeholder="اكتب هنا ..."
          className={`input-style lg:w-1/2 mt-2`}
          type="text"
          name="player-msg"
          onChange={(e) => setplayerMsg(e.target.value)}
          id="player-msg"
        />
      </form>
      <div className="flex">
        <button
          title="ارسال"
          disabled={loading}
          onClick={sendMessage}
          type="submit"
          className={`group mt-2 relative ${
            loading ? "w-[150px] " : "lg:w-1/2 w-full"
          } flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out`}
        >
          ارسال
        </button>
        {loading && <div className="loader-get" />}
      </div>
    </section>
  );
};

export default PlayersChat;
