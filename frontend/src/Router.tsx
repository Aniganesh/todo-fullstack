import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
