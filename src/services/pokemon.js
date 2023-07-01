import { fetchWrapper } from "../utils/fetchWrapper"

const baseUrl = `api/v1`;

export const pokemonService = {
    getAll,
    getById,
    getAllDetails
};

function getAll(limit='10',offset='10') {
    return fetchWrapper.get(`${baseUrl}/pokemon?limit=${limit}&offset=${offset}"`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/pokemon/${id}`);
}

async function getAllDetails(limit='10',offset='10'){
    let details = []
    let result = await getAll(limit,offset);
    if (!result || result.error == true) {
        return
    }else {
        const {results} = result.data
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            let detail = await getById(element.name)
            details.push(detail)
        }
    }
    return details
}

