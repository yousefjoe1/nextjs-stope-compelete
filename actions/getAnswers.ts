'use server'
import axios from 'axios'; // Import axios
import { cookies } from 'next/headers';



export async function getAnswers(route:string, group_id?: string) {
  const url = process.env.NEXT_PUBLIC_DB
  const token = (await cookies()).get('playerToken')?.value

  try {
    const response = await axios.get(`${url}/api/${route}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          group_id: group_id
        }
      }); // Replace with your actual endpoint
    // Handle successful response
    return response.data; // Return the fetched data

  } catch (err:unknown) {
    console.log("🚀 ~ getCart ~ err:", err)
    // console.error('Error fetching data:', err.response?.status);
    return {err}
  }
}