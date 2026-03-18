import API from "./axios";

export const purchaseMembership = async (planId: string) => {

  try {

    const response = await API.post("/memberships/purchase", {
      planId
    });

    return response.data;

  } catch (error: any) {

    console.error("Membership purchase failed:", error);

    throw error;

  }

};


// GET CURRENT MEMBERSHIP
export const getMyMembership = async () => {

  try {

    const response = await API.get("/memberships/my-membership");

    return response.data;

  } catch (error: any) {

    console.error("Failed to fetch membership:", error);

    throw error;

  }

};