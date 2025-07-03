import { X } from "lucide-react";
import { useAuthStore} from "../store/useAuthStore";
import { useMessageStore} from "../store/useMessageStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 border-b border-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative bg-white">
              <img src={selectedUser.profile_pic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div className="text-white">
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-600">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button className="text-gray-500" onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;