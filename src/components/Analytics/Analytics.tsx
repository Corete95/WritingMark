import { useEffect } from "react";
import ReactGA from "react-ga";

const Analytics = () => {
  const pathName = window.location.pathname;
  const env: any = process.env.REACT_APP_REACTGA;
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize(env);
      ReactGA.set({ page: pathName });
      ReactGA.pageview(pathName);
    }
  }, [pathName]);
  return <></>;
};

export default Analytics;
