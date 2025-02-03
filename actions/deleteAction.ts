"use server";
import axios from "axios"; // Import axios
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteAction(groupId: string) {
  const url = process.env.NEXT_PUBLIC_DB;
  const token = (await cookies()).get("playerToken")?.value;
  const h = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`${url}/api/groups/${groupId}`, h); // Replace with your actual endpoint
    revalidatePath("/");
    return response.data; // Return the fetched data
  } catch (err: unknown) {
    console.log("🚀 ~ getCart ~ err:", err);
    // console.error('Error fetching data:', err.response?.status);
    return { err };
  }
}
