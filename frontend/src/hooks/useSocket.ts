import { useEffect } from "react";
import { io } from "socket.io-client";

export const useSocket = (onActivity: (data: any) => void) => {

  useEffect(() => {

    const socket = io("http://localhost:8080");

    socket.on("activity", (data) => {
      onActivity(data);
    });

    return () => {
      socket.disconnect();
    };

  }, [onActivity]);

};