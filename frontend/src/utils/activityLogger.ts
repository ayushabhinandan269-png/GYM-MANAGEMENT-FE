export const addActivity = (message: string) => {

  const stored = localStorage.getItem("gymActivities");

  let activities: any[] = [];

  if (stored) {
    activities = JSON.parse(stored);
  }

  const newActivity = {
    message,
    time: new Date().toISOString()
  };

  const updated = [newActivity, ...activities].slice(0, 15);

  localStorage.setItem("gymActivities", JSON.stringify(updated));
};