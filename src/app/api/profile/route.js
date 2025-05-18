import connectDB from "../../../../lib/database";
import ProfileModel from "../../../../models/profileModel";
import { NextResponse } from "next/server";
import { isValidData, setCookies, optimizeImage } from "../../../../lib/serverFunctions";

export async function POST(req) {
  try {
    const data = await req.formData();
    await connectDB();

    const { phone, name, password, imageFile } = Object.fromEntries(data)

    const isValid = isValidData(Object.fromEntries(data))
    if(!isValid.valid) return isValid.res

    const checker = await ProfileModel
    .findOne({ phone: phone.trim() })
    .select('name -_id')
    .lean();
    if (checker) {
      return NextResponse.json(
        { message: `هذا الرقم بالفعل موجود بإسم ${name}` },
        { status: 300 }
      );
    };

    const outputBuffer = await optimizeImage(imageFile)

    const token = setCookies({ phone })

    await ProfileModel.create({
      phone: phone.trim(),
      name: name.trim(),
      password: password.trim(),
      token: token,
      image: outputBuffer
    });

    return NextResponse.json(
      { message: 'تم ارسال البيانات بنجاح' },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: 'خطأاثنا ارسال البيانات' },
      { status: 404 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const data = await ProfileModel.find().select('-password').lean();

    return NextResponse.json(data)
  } catch(error) {
    return NextResponse.json(
      { message: 'مشكله في السرفر' },
      { status: 404 },
    );
  }
}









