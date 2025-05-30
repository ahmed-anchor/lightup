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

    const usersCount = await ProfileModel.countDocuments()
    if(usersCount >= 20) {
      return NextResponse.json(
        { message: 'هذا الحد الاقصي للمطورين' },
        { status: 300 }
      )
    }

    const checker = await ProfileModel
    .findOne({ phone: phone.trim() })
    .select('name -_id')
    .lean();
    if (checker) {
      return NextResponse.json(
        { message: `هذا الرقم بالفعل موجود بإسم ${checker.name}` },
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
    const data = await ProfileModel.find().select('-password -netWorth').lean();
    if (data.length === 0) {
      return NextResponse.json(
        { message: 'لا يوجد بيانات' },
        { status: 404 }
      );
    }

    const workers = data.map((worker) => {
      return {
        _id: worker._id.toString(),
        name: worker.name,
        phone: worker.phone,
        image: `data:image/jpeg;base64,${worker.image.buffer.toString('base64')}`
      }
    });

    

    return NextResponse.json(
      workers,
      { status: 200 }
    );
  } catch(error) {
    console.log(error)
    return NextResponse.json(
      { message: 'مشكله في السرفر' },
      { status: 404 },
    );
  }
}


