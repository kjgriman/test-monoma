import React from 'react';
import { Fragment, useRef, useState } from 'react'
import ModalPokemon from '../../modals/pokemonDetails';

export default function CardPokemon({ dataPokemom }) {
    const { data } = dataPokemom
    const date = new Date()
    const [showModal, setShowModal] = useState(false);

    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    return (

        <>
            <ModalPokemon
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                data={data}
            >

            </ModalPokemon>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
                <div onClick={() => setShowModal(true)} className="hover:bg-gray-100 pb-2 hover:cursor-pointer w-full shadow-[0_1px_10px_0px_rgba(0,0,0,0.3)]">
                    <img className="w-full " src={data?.sprites.front_default} alt="Sunset in the mountains" />
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-start-2 col-end-5 "><p>{date.toDateString()}</p></div>
                        <div className="col-end-7 col-span-2 ">
                            <span
                                className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                            >{data?.weight} </span>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <h2 className="font-bold text-xl mb-2">{data?.name}</h2>
                </div>
                <div className="px-6 pt-4 pb-2">
                    {data?.moves.length > 2 && getMultipleRandom(data?.moves, 3).map((itemMove) => {
                        return (
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{itemMove.move.name}</span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}