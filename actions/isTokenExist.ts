'use server'
import { cookies } from 'next/headers';


export async function isTokenExist() {

    const token = (await cookies()).get('playerToken')?.value

    if(token){
        return {bool: true,tok: token}
    }else{
        return {bool: false,tok: ''}
    }
}