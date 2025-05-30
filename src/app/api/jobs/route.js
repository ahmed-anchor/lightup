import { NextResponse } from "next/server";
import JobModel from "../../../../models/jobModel";
import connectDB from "../../../../lib/database";



export async function POST (req) {
  try {
    const { name, description, phone } = await req.json()
    if( !name || !description || !phone ) {
      return NextResponse.json(
        { message: 'املأ كل البيانات' },
        { status: 400 }
      )
    }
    await connectDB();
    
    const res = await JobModel.create({
      name: name.trim(),
      description: description.trim(),
      phone: phone.trim()
    })
  
    return NextResponse.json(
      { message: 'تم الطلب بنجاح' },
      { status: 200 }
    )
  } catch(error) {
    console.log(error)
    return NextResponse.json(
      { message: 'هناك مشكله في السرفر' },
      { status: 500 }
    )
  }
}


export async function GET() {
    try {
      await connectDB();

      const jobs = await JobModel.find({});

      return NextResponse.json(jobs)

    } catch(error) {
      return NextResponse.json(
        { message: 'هناك مشكله في السرفر' },
        { status: 500 }
      )
    }
}



