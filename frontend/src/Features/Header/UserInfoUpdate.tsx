import { ChangeEvent, FC, useMemo, useState } from "react";
import { UpdateUser } from "dtos";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import CircularProgress from "@/components/CircularProgress";
import { uploadProfileImage } from "@/api/Auth";
import { useForm } from "react-hook-form";
import { useStore } from "@/Store";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";

const defaultValues = {
  name: "",
};

interface UserInfoUpdateProps {}

const UserInfoUpdate: FC<UserInfoUpdateProps> = () => {
  const [isChangingProfileImage, setIsChangingProfileImage] = useState(false);

  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  const updateUser = useStore((state) => state.updateUser);

  const { register, formState, handleSubmit } = useForm<UpdateUser>({
    defaultValues: { ...defaultValues, name: user?.name },
  });

  const handleUpdateUser = (values: UpdateUser) => {
    updateUser(values)
      .then(() => {
        toast.success("User successfully updated");
      })
      .catch(() => {
        toast.error("Unable to update user details. Please try again later.");
      });
  };

  const imageInputOnChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setIsChangingProfileImage(true);
      try {
        const user = await uploadProfileImage(e.target.files[0]);
        setUser(user);
      } catch (err) {
        console.error(err);
      } finally {
        setIsChangingProfileImage(false);
      }
    }
  };

  const onRemoveProfileImage = async () => {
    setIsChangingProfileImage(true);
    try {
      await updateUser({ profileImage: null });
    } catch (err) {
      console.error(err);
    } finally {
      setIsChangingProfileImage(false);
    }
  };

  const imageAreaContent = useMemo(() => {
    if (!isChangingProfileImage) {
      return user?.profileImage ? (
        <img
          className="size-16 flex-1 min-w-16 aspect-square object-cover"
          src={user.profileImage.secure_url}
        />
      ) : (
        <Plus className="size-6" />
      );
    }
    return <CircularProgress className="size-6" />;
  }, [isChangingProfileImage, user?.profileImage]);

  return (
    <>
      <div className="relative size-fit mx-auto">
        <div className="size-16 rounded-full overflow-clip relative bg-gray-400 text-white flex items-center justify-center">
          {imageAreaContent}
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 "
            title=""
            onChange={imageInputOnChangeHandler}
          />
        </div>
        {!!user?.profileImage && (
          <button
            className="absolute -bottom-2 -right-2 rounded-full w-fit h-fit p-1 bg-red-400"
            onClick={onRemoveProfileImage}
          >
            <X className="size-4 text-white" />
          </button>
        )}
      </div>
      <form
        className="flex flex-col gap-4 "
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <Label>Name</Label>
        <Input {...register("name", { required: true })} />
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting && (
            <CircularProgress className="size-5 mr-4" />
          )}
          Save
        </Button>
      </form>
    </>
  );
};

export default UserInfoUpdate;
