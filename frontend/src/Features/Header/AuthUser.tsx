import { useStore } from "@/Store";
import Modal from "@/components/Modal";
import { X } from "lucide-react";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";
import UserInfoUpdate from "./UserInfoUpdate";

interface AuthUserProps {}

const AuthUser: FC<AuthUserProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useStore((state) => state.user);
  const resetAuthData = useStore((state) => state.resetAuthData);

  const toggle = () => {
    setIsOpen((curr) => !curr);
  };

  const close = () => {
    toggle();
  };
  
  const logout = () => {
    resetAuthData();
  };

  return (
    <>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggle}
        tabIndex={0}
      >
        <p className="hover:underline">{user?.name}</p>
        {!!user?.profileImage?.secure_url && (
          <img
            src={user?.profileImage?.secure_url}
            className="size-8 rounded-full overflow-clip object-cover"
          />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={close}>
        <button
          className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1 z-[1]"
          onClick={toggle}
        >
          <X />
        </button>
        <Tabs defaultValue="User">
          <div className="p-5 h-full w-full">
            <TabsList>
              <TabsTrigger value="User">Update User details</TabsTrigger>
              <TabsTrigger value="Password">Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value="User">
              <UserInfoUpdate />
            </TabsContent>
            <TabsContent value="Password">
              <ChangePassword />
            </TabsContent>
          </div>
        </Tabs>
        <Button
          variant="destructive"
          className="ml-auto mr-1 mb-1 mt-auto"
          onClick={logout}
        >
          Logout
        </Button>
      </Modal>
    </>
  );
};

export default AuthUser;
