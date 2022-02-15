import { useEffect } from "react";
import ReactGA from "react-ga";

const Analytics = () => {
  const pathName = window.location.pathname;
  useEffect(() => {
    // if (process.env.NODE_ENV === "production") {
    ReactGA.initialize("G-EK9H72HS75");
    ReactGA.set({ page: pathName });
    ReactGA.pageview(pathName);
    // }
  }, [pathName]);
  return <></>;
};

export default Analytics;
