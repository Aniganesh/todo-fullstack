import { useStore } from "@/Store";
import CircularProgress from "@/components/CircularProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CreateUser } from "dtos";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface SignupFormProps {
  switchForms: () => void;
}

export const SignupForm: FC<SignupFormProps> = ({ switchForms }) => {
  const { register, handleSubmit, formState } = useForm<CreateUser>({
    defaultValues: { email: "", password: "", name: "" },
  });

  const signup = useStore((state) => state.signup);

  return (
    <form
      className="flex flex-col gap-4 p-4 rounded-md text-2xl"
      onSubmit={handleSubmit(signup)}
    >
      <Label className="text-2xl">Name</Label>
      <Input
        className="text-2xl"
        {...register("name", {
          required: {
            value: true,
            message: "Name is required",
          },
        })}
      />
      <Label className="text-2xl">Email</Label>
      <Input
        type="email"
        className="text-2xl"
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
        })}
      />
      <Label className="text-2xl">Password</Label>
      <Input
        className="text-2xl"
        type="password"
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
        Signup
      </Button>
      <Button onClick={switchForms} variant="ghost">
        Login
      </Button>
    </form>
  );
};

export default SignupForm;
