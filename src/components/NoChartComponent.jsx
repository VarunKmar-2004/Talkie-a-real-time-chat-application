import { MessageSquare } from "lucide-react";

const NoChat = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 ">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-2 mb-2">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl  flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-emerald-500 " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-white">Welcome to Talkie!</h2>
        <p className="text-emerald-500">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChat;