'use server'
import ProfileModel from "../models/profileModel";
import connectDB from "./database"
import sharp from "sharp";
import path from "path";
import { writeFile } from "fs/promises";

export const submitProfileForm = async (formData) => {
  try {
    await connectDB();
    const { 
      phone, 
      name, 
      password, 
      imageFile 
    } = Object.fromEntries(formData.entries())

    if(
      !phone ||
      !name || 
      !password || 
      !imageFile
    ) return { message: 'املأ كل البينات', status: false }

    if(phone.length<11 || phone.length>11) return { message: 'الرقم خاطئ', status: false }

    const checker = await ProfileModel.find().select('phone -_id').lean()

    const res = checker.some((user) => user.phone === phone)

    if(res) return { message: 'هذا الرقم بالفعل موجود', status: false }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const outputBuffer = await sharp(buffer).resize({
      width: 1500,
      height: 320,
      fit: "inside",
      position: "center",
      withoutEnlargement: true 
    })
    .webp({
      quality: 80,
      effort: 6,
    }).toBuffer()

    const filePath = path.join(process.cwd(), "public", "profiles", phone.trim()+'.webp' )
    await writeFile(filePath, outputBuffer);

    await ProfileModel.create({
      phone: phone.trim(),
      name: name.trim(),
      password: password.trim(),
      imagePath: `/profiles/${phone.trim()}.webp`
    })

    return { message: 'تم ارسال البيانات بنجاح', status: true }
  } catch (error) {
    return { message: 'خطأاثنا ارسال البيانات', status: false }
  }
}


export const getProfileForms = async () => {
  try {
    await connectDB();
    const data = await ProfileModel.find().select('-password');
    return { message: data, state: true };
  } catch(error) {
    return { message: 'شبكه ضعيفه', state: false };
  }
}



