import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { modalToggleHandler } from "./toggleHandler";
import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "@/components/ui/button";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  contentClass?: string;
  showCloseButton?: boolean;
  closeOnBgClick?: boolean;
  skipCloseAnimation?: boolean;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  className,
  contentClass,
  isOpen,
  onClose,
  closeOnBgClick = true,
  showCloseButton = true,
  skipCloseAnimation = false,
}) => {
  const [localOpen, setLocalOpen] = useState(isOpen); // Keeping a local state that is in sync with the prop albeit a few milliseconds to a few hundred milliseconds late in order to show the animation.
  const handleClose = () => {
    setLocalOpen(false);
    if (skipCloseAnimation) {
      onClose();
    } else {
      setTimeout(onClose, 300);
    }
  };
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      setLocalOpen(true);
      const intervalId: NodeJS.Timeout = setInterval(
        () => modalToggleHandler(() => clearInterval(intervalId)),
        50
      );
      document.addEventListener("keyup", closeOnEsc);
    } else {
      setLocalOpen(false);
    }
    return () => {
      document.removeEventListener("keyup", closeOnEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const closeButtonProps: ButtonProps = {
    variant: "ghost",
    size: "lg",
    className: "max-sm:bottom-2 max-sm:right-2 absolute top-4 right-4",
  };

  closeButtonProps.onClick = onClose;

  return createPortal(
    <div
      className={twMerge(
        clsx(
          "opacity-0 fixed top-0 bottom-0 left-0 right-0 transition-all duration-200 ease-linear modal-container",
          className,
          { "opacity-100 isOpen z-50": localOpen }
        )
      )}
    >
      <div
        className="absolute top-0 bottom-0 left-0 right-0 bg-gray-400/10 backdrop-blur-sm"
        onClick={closeOnBgClick ? handleClose : undefined}
      />
      {showCloseButton && (
        <Button {...closeButtonProps}>
          <X />
        </Button>
      )}
      <div
        className={
          "content-container absolute top-0 bottom-0 left-0 right-0 lg:max-w-4xl md:max-w-2xl h-fit bg-primary-light rounded-xl shadow-sm m-auto md:max-h-[80vh] max-h-screen max-sm:h-full overflow-y-auto"
        }
      >
        <div
          className={twMerge(
            "relative h-full flex flex-col items-center",
            contentClass
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
