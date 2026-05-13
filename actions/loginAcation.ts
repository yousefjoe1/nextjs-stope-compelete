'use server'
import axios from 'axios'; // Import axios
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

type Inputs = {
  email: string;
  password: string;
};

export async function loginAction(data: Inputs) {
  const url = process.env.NEXT_PUBLIC_DB

  try {
    const response = await axios.post(`${url}/api/users/login`, data); // Replace with your actual endpoint


    // Handle successful response
    (await cookies()).set('playerToken', response.data.token)
    // console.log("🚀 ~ login ~ response:", response.data)
    revalidatePath('/login')
    revalidatePath('/')

    return response.data; // Return the fetched data

  } catch (err: unknown) {
    console.log("🚀 ~ getCart ~ err:", err)
    // console.error('Error fetching data:', err.response?.status);
    return { err }
  }
}

// تعريف الأنواع (Types) بناءً على الفورم بتاعك
type RegisterInputs = {
  name: string;
  email: string;
  password: string;
};

export async function registerAction(data: RegisterInputs) {
  const url = process.env.NEXT_PUBLIC_DB;

  try {
    // تجهيز البيانات المرسلة للسيرفر (تحويل name لـ username)
    const userdata = {
      username: data.name,
      email: data.email,
      password: data.password,
    };

    const response = await axios.post(`${url}/api/users/register`, userdata);

    // لو الرد فيه توكن، بنحفظه في الكوكيز
    if (response.data.token) {
      (await cookies()).set('playerToken', response.data.token, {
        httpOnly: true, // أمان أكتر
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // أسبوع مثلاً
        path: '/',
      });
    }

    // تحديث الكاش للصفحات المهمة
    revalidatePath('/');
    revalidatePath('/register');

    return response.data; // هيرجع الـ code والـ msg والـ token

  } catch (err) {
    console.log("🚀 ~ registerAction ~ err:", err)

    // إرجاع الخطأ اللي جاي من السيرفر عشان نعرضه في الـ Toast
    return err || { msg: "حدث خطأ غير متوقع", code: 500 };
  }
}