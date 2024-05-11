const isAnyModalOpen = () => {
  return !!document.querySelector(".modal-container.isOpen");
};

export const modalToggleHandler = (onStyleRemove?: () => void) => {
  if (isAnyModalOpen()) {
    document.body.style.overflow = "hidden";
    return;
  }
  document.body.style.overflow = "";
  onStyleRemove?.();
};
