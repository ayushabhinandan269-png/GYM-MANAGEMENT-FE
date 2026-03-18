import { createContext, useContext, useState } from "react";

interface Activity {
  id: number;
  message: string;
  time: string;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (message: string) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: React.ReactNode }) => {

  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (message: string) => {

    const newActivity: Activity = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString()
    };

    setActivities(prev => [newActivity, ...prev.slice(0, 7)]);
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {

  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used inside ActivityProvider");
  }

  return context;
};