import { NextResponse } from "next/server";
import JobModel from "../../../../models/jobModel";
import connectDB from "../../../../lib/database";



export async function POST (req) {
  try {
    const { name, description } = req.json()
    console.log(name, description)
    if( !name || !description ) {
      return NextResponse.json(
        { message: 'املأ كل البيانات' },
        { status: 400 }
      )
    }
    
    await JobModel.create({
        name,
        description
    })
  
    return NextResponse.json(
      { message: 'تم الطلب بنجاح' },
      { status: 200 }
    )
  } catch(error) {
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



