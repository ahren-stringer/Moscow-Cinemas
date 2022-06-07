import * as axios from 'axios'

let instance = axios.create({
   //  baseURL: 'http://localhost:8001/',
})

export let MainPageAPI = {
    getCategories() {
        return instance.get(`place_category`)
            .then(response => response.data)
    },
};
export let AuthAPI = {
    auth(formData) {
        return instance.post('/cinema/login', { ...formData })
            .then(response => response.data)
    },
    register(formData) {
        return instance.post('/cinema/register', { ...formData })
    },
}
export let CategoryAPI = {
    getCategoryData(type,limit,skip) {
        return instance.get(`/place_category/places/some/${type}/${limit}/${skip}`)
            .then(response => response.data)
    },
    getCategoryCount(type) {
        return instance.get(`/place_category/places/category_count/${type}`)
            .then(response => response.data)
    },
}
export let InfoAPI = {
    getPlaces(id) {
        return instance.get(`/place_category/places/${id}`)
            .then(response => response.data)
    },
    putPopular(placesReq,pop) {
        return instance.put(`/place_category/places/${placesReq[0]._id}`, { popular: pop })
            .then(response => response.data)
    },
    getComents(name,onOnePage,numberOfPage) {
        return instance.get(`/cinema/coments/some/${name}/${onOnePage}/${numberOfPage*onOnePage}`)
            .then(response => response.data)
    },
    getComentsCount(placesReq) {
        return instance.get(`/cinema/coments_count/${placesReq[0].name}`)
            .then(response => response.data)
    },
    sendComent(form,token) {
        return instance.post('/coment', { ...form }, {
            headers: {
                "Authorization": ('Bearer ' + token)
            }
        })
            .then(response => response.data)
    },
    getComent(name,token) {
        return instance.get(`/cinema/coments/${name}`, {
            headers: {
                "Authorization": ('Bearer ' + token)
            }
        })
            .then(response => response.data[0])
    },
}
export let PopularAPI = {
    getPopularAll() {
        return instance.get(`/popular`)
            .then(response => response.data)
    },
    getPopularSome() {
        return instance.get('/popular/some')
            .then(response => response.data)
    },
}
export let SearchAPI = {
    getSearchPage(riched) {
        return instance.get(`/place_category/places/search_all/${riched}`)
            .then(response => response.data)
    },
    getSearchList(search) {
        return instance.get(`/place_category/places/search/${search}`)
            .then(response => response.data)
    },
}
export let MailAPI = {
    sendMail(formData) {
        return instance.post('/email', { ...formData })
    },
}