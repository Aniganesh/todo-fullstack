import { changePassword } from "@/api/Auth";
import { PasswordChange } from "dtos";
import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ChangePasswordProps {}

export const ChangePassword: FC<ChangePasswordProps> = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState } = useForm<PasswordChange>();
  const handleChangePassword = (values: PasswordChange) => {
    changePassword(values)
      .then(() => {
        toast.success("Password successfully updated");
      })
      .catch(() => {
        toast.error(
          "Unable to update password. Please check the current password and try again."
        );
      });
  };
  return (
    <div className="pt-4 flex flex-col gap-2">
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="flex flex-col gap-4"
      >
        <Label>Current Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          {...register("currentPassword", { required: true })}
        />
        <Label>New Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          {...register("newPassword", { required: true })}
        />
        <div className="flex gap-4">
          <Label>Hide </Label>
          <Switch checked={showPassword} onCheckedChange={setShowPassword} />
          <Label>Show </Label>
        </div>
        <Button disabled={formState.isSubmitting}>
          {formState.isSubmitting && (
            <CircularProgress className="size-5 mr-4" />
          )}{" "}
          Save
        </Button>
      </form>
    </div>
  );
};
export default ChangePassword;
