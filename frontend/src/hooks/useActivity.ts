import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageVisit } from "../utils/pageTracker";

const useActivity = () => {

  const location = useLocation();

  useEffect(() => {

    trackPageVisit(location.pathname);

  }, [location]);

};

export default useActivity;