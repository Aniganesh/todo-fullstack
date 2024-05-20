import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import Modal from "../Components/Modal";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginData, SignupData } from "@/api/Auth/types";
import CircularProgress from "@/Components/CircularProgress";
import { useStore } from "@/Store";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const user = useStore((state) => state.user);

  const [modal, setModal] = useState<"login" | "signup" | undefined>();

  const openLoginModal = () => {
    setModal("login");
  };

  const openSignupModal = () => {
    setModal("signup");
  };
  const closeModal = () => {
    setModal(undefined);
  };

  const switchForm = () => {
    setModal((curr) => (curr === "login" ? "signup" : "login"));
  };

  return (
    <div className="py-4 px-6 flex justify-between">
      <span className="text-2xl">Todo app</span>
      <div className="flex gap-4">
        {!user ? (
          <>
            <Button variant="outline" onClick={openLoginModal}>
              Login
            </Button>
            <Button variant="outline" onClick={openSignupModal}>
              Signup
            </Button>
          </>
        ) : (
          <p>{user.name}</p>
        )}
      </div>
      <Modal isOpen={!!modal} onClose={closeModal}>
        {modal === "login" && <LoginForm switchForms={switchForm} />}
        {modal === "signup" && <SignupForm switchForms={switchForm} />}
      </Modal>
    </div>
  );
};

export default Header;

interface LoginFormProps {
  switchForms: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ switchForms }) => {
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

interface SignupFormProps {
  switchForms: () => void;
}

const SignupForm: FC<SignupFormProps> = ({ switchForms }) => {
  const { register, handleSubmit, formState } = useForm<SignupData>({
    defaultValues: { email: "", password: "", name: "" },
  });

  const signup = useStore((state) => state.signup);

  return (
    <form
      className="flex flex-col gap-4 border border-gray-200 p-4 rounded-md bg-slate-50 text-2xl"
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
