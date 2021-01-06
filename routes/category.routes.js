import express from 'express';
const {Router} = express;
const router=Router()
import PlaceCategory from '../models/PlaceCategory.js'

router.post(
    '/place_category',
    async (req, res) => {
        try {
            const { category, categoryUrl } = req.body
            const condidate = await PlaceCategory.findOne({ category })
            if (condidate) {
                return res.status(400).json({ message: 'Такая категория уже есть' })
            }
            const newCategory = new PlaceCategory({ category, categoryUrl });

            await newCategory.save()

            res.status(201).json({ message: 'Категория зарегистрирована' })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка записи' })
        }
    })

    router.get(
    '/place_category',
    async (req, res) => {
        try {
            const category = await PlaceCategory.find()
            res.json(category)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }
    })

    export default router