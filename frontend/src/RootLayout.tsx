import { FC, Suspense } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import Header from "./Features/Header";

interface LoaderData {
  fetchMe: () => Promise<void>;
}
const RootLayout: FC = () => {
  const loaderData = useLoaderData() as LoaderData;
  return (
    <Suspense>
      <Await resolve={loaderData.fetchMe}>
        <Header />
        <Outlet />
      </Await>
    </Suspense>
  );
};

export default RootLayout;
