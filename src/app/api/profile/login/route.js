import connectDB from "../../../../../lib/database";
import { isValidPhoneNum, setCookies } from "../../../../../lib/serverFunctions";
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

    if(!isValidPhoneNum(phone)) {
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
    )
    .select('phone')
    .lean()


    if(!user) {
      return NextResponse.json(
        { message: 'كلمه المرور او رقم الهاتف خطا' },
        { status: 404 }
      )
    }

    const token = setCookies({ phone: user.phone })

    await ProfileModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { token: token } }
    );


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

