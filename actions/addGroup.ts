'use server'
import { GroupInputs } from '@/types/types';
import axios from 'axios'; // Import axios
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';


export async function addGroup(data:GroupInputs) {
  const url = process.env.NEXT_PUBLIC_DB

  let tk = (await cookies()).get('playerToken')?.value
  let h = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };

  try {
    const response = await axios.post(`${url}/api/groups`,data,h); // Replace with your actual endpoint
    revalidatePath('/')    
    return response.data; // Return the fetched data

  } catch (err:unknown) {
    console.log("🚀 ~ getCart ~ err:", err)
    // console.error('Error fetching data:', err.response?.status);
    return {err}
  }
}