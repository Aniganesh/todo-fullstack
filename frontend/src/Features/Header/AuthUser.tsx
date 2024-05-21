import { useStore } from "@/Store";
import { UpdateUser } from "@/api/Auth/types";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";

interface AuthUserProps {}

const defaultValues = {
  name: "",
};

const AuthUser: FC<AuthUserProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useStore((state) => state.user);
  const updateUser = useStore((state) => state.updateUser);

  const { register, handleSubmit } = useForm<UpdateUser>({
    defaultValues: { ...defaultValues, ...user },
  });

  const toggle = () => {
    setIsOpen((curr) => !curr);
  };

  return (
    <>
      <p
        className="hover:underline active:underline cursor-pointer"
        onClick={toggle}
        tabIndex={0}
      >
        {user?.name}
      </p>
      <Modal isOpen={isOpen} onClose={toggle}>
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
              <form
                className="flex flex-col gap-4 "
                onSubmit={handleSubmit(updateUser)}
              >
                <Label>Name</Label>
                <Input {...register("name", { required: true })} />
                <Button type="submit">Save</Button>
              </form>
            </TabsContent>
            <TabsContent value="Password">
              <ChangePassword />
            </TabsContent>
          </div>
        </Tabs>
      </Modal>
    </>
  );
};

export default AuthUser;
