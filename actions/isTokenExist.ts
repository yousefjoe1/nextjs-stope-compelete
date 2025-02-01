'use server'
import { cookies } from 'next/headers';


export async function isTokenExist() {

    let token = (await cookies()).get('playerToken')

    if(token){
        return true
    }else{
        return false
    }
}