import { FC, Suspense, useEffect } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import Header from "./Features/Header";
import { useStore } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoaderData {
  fetchMe: () => Promise<void>;
}
const RootLayout: FC = () => {
  const loaderData = useLoaderData() as LoaderData;

  const filter = useStore((state) => state.filterAndSort);
  const user = useStore((state) => state.user);
  const getTodosBasedOnFilter = useStore(
    (state) => state.getTodosBasedOnFilter
  );

  useEffect(() => {
    if (user) {
      getTodosBasedOnFilter();
    }
  }, [filter, user, getTodosBasedOnFilter]);

  return (
    <Suspense>
      <Await resolve={loaderData.fetchMe}>
        <Header />
        <Outlet />
        <ToastContainer
          position="top-right"
          hideProgressBar
          pauseOnHover={true}
          autoClose={100000}
          theme="colored"
        />
      </Await>
    </Suspense>
  );
};

export default RootLayout;
