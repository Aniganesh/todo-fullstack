import { LoginData } from "@/api/Auth/types";
import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "@/Store";

interface LoginFormProps {
  switchForms: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ switchForms }) => {
  const { register, handleSubmit, formState } = useForm<LoginData>({
    defaultValues: { email: "", password: "" },
  });

  const login = useStore((state) => state.login);

  return (
    <form
      className="flex flex-col gap-4 border border-gray-200 p-4 rounded-md bg-slate-50 text-2xl"
      onSubmit={handleSubmit(login)}
    >
      <Label className="text-2xl">Email</Label>
      <Input
        className="text-2xl"
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
        })}
      />
      <Label className="text-2xl">Password</Label>
      <Input
        type="password"
        className="text-2xl"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
        })}
      />
      <div>
        {Object.values(formState.errors).map((err) => (
          <p className="text-lg text-red-400" key={err.message}>
            {err.message}
          </p>
        ))}
      </div>
      <Button disabled={formState.isSubmitting} size="lg">
        {formState.isSubmitting && <CircularProgress className="size-5 mr-2" />}
        Login
      </Button>
      <Button onClick={switchForms} variant="ghost">
        Signup
      </Button>
    </form>
  );
};
export default LoginForm;
