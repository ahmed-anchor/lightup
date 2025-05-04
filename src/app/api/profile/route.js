import connectDB from "../../../../lib/database";
import ProfileModel from "../../../../models/profileModel";
import sharp from "sharp";
import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    await connectDB();

    const formData = Object.fromEntries(data);
    const phone = formData.phone;
    const name = formData.name;
    const password = formData.password;
    const imageFile = formData.imageFile;

    if (!phone || !name || !password || !imageFile) {
      return NextResponse.json(
        { message: 'املأ كل البينات' },
        { status: 300 }
      );
    };

    if (phone.length < 11 || phone.length > 11) {
      return NextResponse.json(
        { message: 'الرقم خاطئ' },
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
        width: 1500,
        height: 320,
        fit: "inside",
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

    await ProfileModel.create({
      phone: phone.trim(),
      name: name.trim(),
      password: password.trim(),
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