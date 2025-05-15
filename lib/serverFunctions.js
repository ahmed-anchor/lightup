'use server'
import { cookies } from "next/headers"
import connectDB from "./database"
import ProfileModel from "../models/profileModel"
import { randomBytes } from "crypto";


export const checkCookies = async () => {
  const sessionCookie = cookies().get('session')
  const phoneCookie = cookies().get('phone')

  // Check if both cookies exist
  if (!sessionCookie || !phoneCookie) return null

  try {
    await connectDB()
    
    // Find user and exclude password
    const user = await ProfileModel.findOne(
      {
        phone: phoneCookie.value,
        token: sessionCookie.value
      },
      { password: 0 } // Projection to exclude password
    ).lean() // Convert to plain JavaScript object
    
    return user
  } catch (error) {
    return null
  }
}



export const refreshToken = async(user) => {
  try {
    await connectDB()

    const newToken = randomBytes(20).toString('hex')

    await ProfileModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { token: newToken } }
    );


    cookies().set('session', newToken, { 
      expires: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });
  
    cookies().set('phone', user.phone, { 
      expires: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });

    return true
  } catch(error) {
    return null
  }
} 