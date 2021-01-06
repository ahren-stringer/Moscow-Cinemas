import * as axios from 'axios'

let instance=axios.create({
    baseURL:'http://localhost:8001/',
})

export let MainPageAPI={
    getCategories(){
        return instance.get(`place_category`)
                        .then(response=>response.data)
    },
}