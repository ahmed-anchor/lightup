import connectDB from "../../../../../lib/database";
import { refreshToken, isValidPhoneNum, setCookies } from "../../../../../lib/serverFunctions";
import ProfileModel from "../../../../../models/profileModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const data = await req.json();
    const { phoneNum, password } = data
  
    //connecting to database
    await connectDB();

    // checking if there's a data
    if( !phoneNum || !password ) {
      return NextResponse.json(
        { message: 'يرجى ملء جميع البيانات المطلوبة' },
        { status: 400 }
      );
    }

    if(!isValidPhoneNum(phoneNum)) {
      return NextResponse.json(
        { message: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      )
    }

    // Find user and exclude password
    const { phone, _id } = await ProfileModel.findOne(
      {
        phone: phoneNum,
        password: password
      },
    )
    .select('phone')
    .lean()

    if(!phone || !_id) {
      return NextResponse.json(
        { message: 'كلمه المرور او رقم الهاتف خطا' },
        { status: 404 }
      )
    }

    const refreshed = await refreshToken({ phone, _id })

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

