export interface Member {
  name: string;
  email: string;

  membershipStatus?: string;

  membershipPlan?: {
    name: string;
  };

  trainerAssigned?: {
    name: string;
  };
}

export interface Workout {
  _id: string;
  name: string;
  description: string;
}

export interface Activity {
  message: string;
  time: string;
}