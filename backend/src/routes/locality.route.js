import { Router } from "express";
import { createLocality, getAllLocalities, getLocalityById, updateLocality, deleteLocality } from "../controllers/locality.controller.js";

const router = Router();

router.route('/create').post(createLocality)
router.route('/getLocalities').get(getAllLocalities)
router.route('/:id').get(getLocalityById)
router.route('/:id').put(updateLocality)
router.route('/:id').delete(deleteLocality)

export default router

