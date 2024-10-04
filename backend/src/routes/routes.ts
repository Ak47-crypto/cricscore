import { Router } from "express";
import { handleMatchCreation,handleTeamCreation,handlePlayerCreation,handleAutoAddPlayerToTeam} from "../controllers/controller";
const useRoutes = Router();

useRoutes.route('/createMatch').post(handleMatchCreation)
useRoutes.route('/createTeam').post(handleTeamCreation)
useRoutes.route('/createPlayer').post(handlePlayerCreation)
useRoutes.route('/addAutoPlayerToTeam').post(handleAutoAddPlayerToTeam)

export {useRoutes}