import { cookies } from "next/headers"
import connectDB from "./database"
import ProfileModel from "../models/profileModel"
import { randomBytes } from "crypto"
import { NextResponse } from "next/server"
import sharp from "sharp"

// function to opt images before storing in db
export const optimizeImage = async (imageFile) => {
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  return await sharp(buffer)
  .resize({
    width: 250,
    height: 250,
    fit: "cover",
    position: "center",
    withoutEnlargement: true
  })
  .webp({
    quality: 80,
    effort: 6,
  })
  .toBuffer();
}


// function to check the cookies
export const loginWithCookies = async () => {
  const sessionCookie = cookies().get('session')
  const phoneCookie = cookies().get('phone')

  // Check if both cookies exist
  if (!sessionCookie || !phoneCookie) return null

  try {
    await connectDB()
    
    const data = await ProfileModel.findOne(
      { phone: phoneCookie.value, token: sessionCookie.value },
      { password: 0, __v: 0 } // Add __v to excluded fields
    ).lean();

    if (!data) return null

    // Convert all MongoDB special types to plain JS
    const user = {
      ...data,
      _id: data._id.toString(), // Convert ObjectId to string
      image: data.image?.buffer 
        ? `data:image/jpeg;base64,${data.image.buffer.toString('base64')}`
        : null
    }

    return user
  } catch (error) {
    return null
  }
}



// set cookies
export const setCookies = ({ phone, hour = 4, min = 0 }) => {
  // generating token
  const token = randomBytes(20).toString('hex')
  // setup expire date
  const expireDate = new Date(Date.now() + (hour * 60 + min) * 60 * 1000);  
  // set up cookies
  // cookies are set to 4 hours as default
  cookies().set('session', token, { 
    expires: expireDate,
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  });
  cookies().set('phone', phone, { 
    expires: expireDate,
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  });
  // return cookies to store it in the database
  return token
}

// exporting phone number validation function fot multiple usage
export const isValidPhoneNum = (str) => {
  // function to validate phone number
  if(str.length < 11 || str.length > 11) return false
  return ['010', '011', '012', '015'].includes(str.slice(0, 3));
}


// function to validate profile entries
export const isValidData = ({ phone, name, password, imageFile }) => {
  // check missing data
  if (!phone || !name || !password || !imageFile) {
    return {
      valid: false,
      res: NextResponse.json(
        { message: 'املأ كل البينات' },
        { status: 300 }
      )
    }
  };

  // checking first three numbers for origin variation
  if (!isValidPhoneNum(phone)) {
    return {
      valid: false,
      res: NextResponse.json(
        { message: 'الرقم خاطئ' },
        { status: 300 }
      )
    }
  }

  // checking if password is valid
  if (password.length <= 8) {
    return {
      valid: false,
      res: NextResponse.json(
        { message: 'الرقم يجب الا يقل عن 8 رموز' },
        { status: 300 }
      )
    }
  }
  // isValid
  return {
    valid: true,
    res: null
  }
}
