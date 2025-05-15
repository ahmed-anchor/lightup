import connectDB from "../../../../lib/database";
import ProfileModel from "../../../../models/profileModel";
import sharp from "sharp";
import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";


export async function POST(req) {
  try {
    const data = await req.formData();
    await connectDB();

    const { phone, name, password, imageFile } = Object.fromEntries(data);

    if (!phone || !name || !password || !imageFile) {
      return NextResponse.json(
        { message: 'املأ كل البينات' },
        { status: 300 }
      );
    };

    if (checkFirstThreeChars(phone)) {
      return NextResponse.json(
        { message: 'الرقم خاطئ' },
        { status: 300 }
      );
    }

    if (password.length <= 8) {
      return NextResponse.json(
        { message: 'الرقم يجب الا يقل عن 8 رموز' },
        { status: 300 }
      );
    }

    const checker = await ProfileModel.find().select('phone -_id').lean();
    const res = checker.some(user => user.phone === phone);

    if (res) {
      return NextResponse.json(
        { message: 'هذا الرقم بالفعل موجود' },
        { status: 300 }
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const outputBuffer = await sharp(buffer)
      .resize({
        width: 1024,
        height: 1024,
        fit: "cover",
        position: "center",
        withoutEnlargement: true
      })
      .webp({
        quality: 80,
        effort: 6,
      })
      .toBuffer();

    const filePath = path.join(process.cwd(), "public", "profiles", phone.trim() + '.webp');
    await writeFile(filePath, outputBuffer);

    const token = randomBytes(20).toString('hex');

    cookies().set('session', token, { 
      expires: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });

    cookies().set('phone', phone, { 
      expires: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });

    await ProfileModel.create({
      phone: phone.trim(),
      name: name.trim(),
      password: password.trim(),
      token: token,
      imagePath: `/profiles/${phone.trim()}.webp`
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
    const data = await ProfileModel.find().select('-password');
    return NextResponse.json(data)
  } catch(error) {
    return NextResponse.json(
      { message: 'مشكله في السرفر' },
      { status: 404 },
    );
  }
}



function checkFirstThreeChars(str) {
  if(str.length < 11 || str.length > 11) return true
  const validPrefixes = ['010', '012', '011', '011'];
  const prefix = str.slice(0, 3); // or str.substring(0, 3)
  return !validPrefixes.includes(prefix);
}





