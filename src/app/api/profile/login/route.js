import connectDB from "../../../../../lib/database";
import { refreshToken } from "../../../../../lib/serverFunctions";
import ProfileModel from "../../../../../models/profileModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const data = await req.json();
    const { phone, password } = data
  
    //connecting to database
    await connectDB();

    // checking if there's a data
    if( !phone || !password ) {
      return NextResponse.json(
        { message: 'يرجى ملء جميع البيانات المطلوبة' },
        { status: 400 }
      );
    }

    if(checkFirstThreeChars(phone)) {
      return NextResponse.json(
        { message: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      )
    }

    // Find user and exclude password
    const user = await ProfileModel.findOne(
      {
        phone: phone,
        password: password
      },
      { token: 0, imagePath: 0, netWorth: 0, name: 0 } 
    ).lean()

    if(!user) {
      return NextResponse.json(
        { message: 'كلمه المرور او رقم الهاتف خطا' },
        { status: 404 }
      )
    }

    const refreshed = await refreshToken(user)

    if(!refreshed) {
      return NextResponse.json(
        { message: 'حدث خطا اثناء تسجيل الدخول' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'تم تسجيل الدخول' },
      { status: 200 }
    )

  } catch(error) {
    return NextResponse.json(
      { message: 'حدث خطا اثناء تسجيل الدخول' },
      { status: 500 }
    )
  }
}

function checkFirstThreeChars(str) {
  if(str.length < 11 || str.length > 11) return true
  const validPrefixes = ['010', '012', '011', '011'];
  const prefix = str.slice(0, 3); // or str.substring(0, 3)
  return !validPrefixes.includes(prefix);
}