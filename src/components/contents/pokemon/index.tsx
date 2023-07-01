'use client'
import React, { useEffect, useState } from 'react';
import { pokemonService } from '../../../services/pokemon';
import CardPokemon from '../../cards/pokemos';
import Loading from '../../loading';
import Pagination from '../../pagination';

export default function ShowPokemon() {
    const [data, setData] = useState([])
    const [loading, isLoading] = useState(false);


    useEffect(() => {
        isLoading(true)
        pokemonService.getAllDetails().then((data) => {
            if (data?.length > 0) {
                setData(data)
            }
        }).catch((err)=>{
            console.log(err);
            
        }).finally(()=>{
            isLoading(false) 
        })
    }, [])

    if (loading) return <Loading/>

    return (
        <>
        <div className="grid grid-cols-3 gap-3 content-center">
            {data.map((v, i) => {
                return (<CardPokemon dataPokemom={v} />)
            })}
        </div>
        <div className="pb-20 grid grid-cols-1 gap-1 content-center">
            <Pagination/>
        </div>
                </>
    )
}