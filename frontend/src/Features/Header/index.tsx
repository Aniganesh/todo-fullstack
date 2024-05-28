import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import Modal from "@/components/Modal";
import { useStore } from "@/Store";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AuthUser from "./AuthUser";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const user = useStore((state) => state.user);

  const [modal, setModal] = useState<"login" | "signup" | undefined>();
  if (user && modal) {
    setModal(undefined);
  }
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
    <div className="py-4 px-6 flex justify-between shadow-md items-center rounded-b-md sticky top-0 z-[1] bg-white">
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
          <AuthUser />
        )}
      </div>
      <Modal
        isOpen={!!modal}
        onClose={closeModal}
        contentClass="border-gray-200 bg-slate-50"
      >
        {modal === "login" && <LoginForm switchForms={switchForm} />}
        {modal === "signup" && <SignupForm switchForms={switchForm} />}
      </Modal>
    </div>
  );
};

export default Header;
