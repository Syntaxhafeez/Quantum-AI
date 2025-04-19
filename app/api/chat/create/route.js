import connectDB from "@/Config/db";
import Chat from "@/Models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const {userId} = getAuth(req)
        if(!userId){
            return NextResponse.json({success: false, message: "User not authenticated"})
        }

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
        };

        // connect to database and create new chat
        await connectDB();
        await Chat.create(chatData);

        return NextResponse.json({success: true, message: "Chat created"})

    } catch (error) {
        return NextResponse.json({success: false, error: error.message})
    }
}

