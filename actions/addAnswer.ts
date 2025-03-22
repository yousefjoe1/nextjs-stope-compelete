'use server'
import { Answers } from '@/types/types';
import axios from 'axios'; // Import axios
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';


export async function addAnswer(data:Answers) {
  const url = process.env.NEXT_PUBLIC_DB
  const tk = (await cookies()).get('playerToken')?.value
  const h = {
    headers: {
      Authorization: `Bearer ${tk}`,
    },
  };

  try {
    const response = await axios.post(`${url}/api/answers`,{answers: data},h); // Replace with your actual endpoint
    revalidatePath('/')    
    return response.data; // Return the fetched data

  } catch (err:unknown) {
    console.log("🚀 ~ add answer ~ err:", err)
    // console.error('Error fetching data:', err.response?.status);
    return {err}
  }
}