// import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchWrapper } from "../../../../utils/fetchWrapper";
import {NextResponse, NextRequest} from 'next/server'

const URLPOKEMONAPI = process.env.urlPokemonApi || 'https://pokeapi.co/api/v2/'

export async function GET(req: NextRequest) {
    const {searchParams} = req.nextUrl
    
    try {

        let result = await fetchWrapper.get( `${URLPOKEMONAPI}pokemon?limit=${10}&offset=${10}`)
        return NextResponse.json({
            error: null,
            message: "pokemon list",
            data: result,
        });
    } catch (error) {
        return NextResponse.json({
            error: true,
            message: error,
            data: null,
        });
    }

}

