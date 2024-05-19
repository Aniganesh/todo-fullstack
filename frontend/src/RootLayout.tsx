import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Features/Header";

const RootLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
