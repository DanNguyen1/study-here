import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Room from '@/models/Room';


export async function GET() {
    try{
        const conn = await dbConnect();

        const rooms = await Room.find({})

        return NextResponse.json(
            { data: rooms }, 
            { status: 200 }
        );
    } catch (error: any){
        console.log(error)
        return NextResponse.json(
            { message: "Failed to fetch rooms" }, 
            { status: 401 }
        );
    }
}