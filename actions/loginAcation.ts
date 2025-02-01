'use server'
import axios from 'axios'; // Import axios
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

type Inputs = {
    email: string;
    password: string;
  };

export async function loginAction(data:Inputs) {
  const url = process.env.NEXT_PUBLIC_DB

  try {
    const response = await axios.post(`${url}/api/users/login`,data); // Replace with your actual endpoint
    // Handle successful response
    (await cookies()).set('playerToken',response.data.token)
    // console.log("🚀 ~ login ~ response:", response.data)
    revalidatePath('/login')
    revalidatePath('/')
    
    return response.data; // Return the fetched data

  } catch (err:unknown) {
    console.log("🚀 ~ getCart ~ err:", err)
    // console.error('Error fetching data:', err.response?.status);
    return {err}
  }
}