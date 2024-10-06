import { Router } from "express";
import { handleMatchCreation,handleTeamCreation,handlePlayerCreation,handleAutoAddPlayerToTeam, handleBall, handleFetchPlayer} from "../controllers/controller";
const useRoutes = Router();

useRoutes.route('/createMatch').post(handleMatchCreation)
useRoutes.route('/createTeam').post(handleTeamCreation)
useRoutes.route('/createPlayer').post(handlePlayerCreation)
useRoutes.route('/createBall').post(handleBall)
useRoutes.route('/addAutoPlayerToTeam').post(handleAutoAddPlayerToTeam)
useRoutes.route('/fetchPlayer').post(handleFetchPlayer)

export {useRoutes}