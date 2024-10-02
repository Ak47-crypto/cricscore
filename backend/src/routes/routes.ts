import { Router } from "express";
import { handleMatchCreation } from "../controllers/controller";
const useRoutes = Router();

useRoutes.route('/createMatch').post(handleMatchCreation)

export {useRoutes}