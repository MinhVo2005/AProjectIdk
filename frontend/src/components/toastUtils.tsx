// toastUtils.ts
import { toast } from "react-hot-toast";
import { X } from "lucide-react";


export const notifyNewMessage = (roomName: string) => {
  toast.custom((t) => (
    <div
      className={`max-w-sm w-full bg-base-200 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 transition-all ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <div
        className="flex-1 w-0 p-4 cursor-pointer"
      >
        <p className="text-sm font-medium text-base-content">📩 New message</p>
        <div className="mt-1 w-full text-sm text-base-content/70 flex space-x-1">
           <p className="mr-1">From</p>
           <span className="font-bold truncate flex-1 overflow-hidden">{roomName}</span>
        </div>
      </div>
      <div className="flex border-l border-base-300">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-base-content/70 hover:text-error"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  ));
};
