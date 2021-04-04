import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/',
})

export async function getDeveloper(data) {
    try {
        if(data <= 1){
            data = 1
        }
        return await api.get(`developers?page=${data}`).then(response => {
            return { response: response.data.developers }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function getDeveloperById(id) {
    try {
        return await api.get(`developers/${id}`).then(response => {
            return { response: response.data.developer }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function postDeveloper(data) {
    try {
        return await api.post('developers', data).then(response => {
            return { response: response.data.developer }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function putDeveloper(data, id) {
    try {
        return await api.put(`developers/${id}`, data).then(response => {
            return { response: response.data.developer }
        })
    } catch (error) {
        return { error: error.response}
    }
}

export async function deleteDeveloper(id) {
    try {
        return await api.delete(`developers/${id}`).then(response => {
            return { response: response.data.developer }
        })
    } catch (error) {
        return { error: error.response}
    }
}