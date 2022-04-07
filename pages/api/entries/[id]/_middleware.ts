import mongoose from "mongoose";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest, ev:NextFetchEvent){
    
    /* const id = req.page.params?.id || ''  MANERA LINDA PERO NO FUNCIONA AHORA

    if(!mongoose.isValidObjectId(id)){
        //return res.status(400).json({message: 'El id no es valido ' + id})
        return new Response(JSON.stringify({message: 'El id no es valido'}), 
        {
            status:400,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
    } 
    */

    const id = req.page.params?.id || ''

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if(!checkMongoIDRegExp.test(id)){
        return new Response(JSON.stringify({message: 'El id no es valido'}), 
        {
            status:400,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
    }

    return NextResponse.next()
}