import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";

const RootLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
