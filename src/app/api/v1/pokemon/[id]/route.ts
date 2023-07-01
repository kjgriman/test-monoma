// import { jwtVerify } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchWrapper } from "../../../../../utils/fetchWrapper";
import {NextResponse} from 'next/server'

const URLPOKEMONAPI = process.env.urlPokemonApi || 'https://pokeapi.co/api/v2/'

export async function GET(_req: any, {params}: any) {
    const {id} = params
    // const {searchParams} = req
    try {

        let result = await fetchWrapper.get( URLPOKEMONAPI + "pokemon/" + id)
        return NextResponse.json({
            error: null,
            message: "pokemon details",
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

