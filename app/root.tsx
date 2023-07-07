import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { HeaderBar } from "./components/header/header-bar";
import { FooterBar } from "./components/footer/footer-bar";
import { DateContextProvider } from "./components/context/date-context";
import { DateTime } from "luxon";
import { Sidebar } from "./components/sidebar";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400&display=swap",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full m-0 flex">
        {/* <HeaderBar /> */}
        <DndProvider backend={HTML5Backend}>
          <DateContextProvider initialDate={DateTime.now()}>
            <Outlet />
          </DateContextProvider>
        </DndProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {/* <FooterBar /> */}
      </body>
    </html>
  );
}
