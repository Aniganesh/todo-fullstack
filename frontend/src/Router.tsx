import { createBrowserRouter, defer } from "react-router-dom";
import RootLayout from "./RootLayout";
import { useStore } from "./Store";
import Fetch from "./FetchWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    loader: async () => {
      const { token, fetchMe, getAllTodos } = useStore.getState();
      Fetch.setCommonHeaders({ Authorization: `Bearer ${token}` }); // FIXME: Move to a different function
      return defer({ loader: Promise.all([fetchMe(), getAllTodos()]) });
    },
    children: [
      {
        path: "",
        lazy: async () => {
          const { default: Component } = await import("./Screens/Home");
          return { Component };
        },
      },
    ],
  },
]);

export default router;
