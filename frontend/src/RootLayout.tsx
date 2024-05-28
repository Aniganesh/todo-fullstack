import { FC, Suspense, useEffect } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import Header from "./Features/Header";
import { useStore } from "./Store";

interface LoaderData {
  fetchMe: () => Promise<void>;
}
const RootLayout: FC = () => {
  const loaderData = useLoaderData() as LoaderData;

  const filter = useStore((state) => state.filterAndSort);
  const getTodosBasedOnFilter = useStore(
    (state) => state.getTodosBasedOnFilter
  );

  useEffect(() => {
    getTodosBasedOnFilter();
  }, [filter, getTodosBasedOnFilter]);

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
