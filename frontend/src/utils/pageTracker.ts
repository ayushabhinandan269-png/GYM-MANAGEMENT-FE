import { addActivity } from "./activityLogger";

export const trackPageVisit = (pathname: string) => {

  const page = pathname.split("/").filter(Boolean).pop() || "dashboard";

  const formatted =
    page.charAt(0).toUpperCase() + page.slice(1);

  addActivity(`Visited ${formatted} page`);

};