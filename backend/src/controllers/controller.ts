import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import MatchModel, { IMatch } from "../models/match.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { IDataBall, IDataMatch } from "../types/dataType";
import TeamModel, { ITeam } from "../models/team.model";
import PlayerModel, { IPlayer } from "../models/player.model";
import mongoose from "mongoose";
import BallModel, { IBall } from "../models/ball.model";
import updateMatchDetails from "../helpers/updateMatchDetails";

const handleMatchCreation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data }: { data: IMatch } = req.body;
    console.log(data);
    if (data) {
      const matchDetails = new MatchModel({
        name: data.name,
        team: data.team,
        innings: data.innings,
        currentBat: data.currentBat,
        currentBall: data.currentBall,
        date: data.date,
        venue: data.venue,
      });
      const responseMatch = await matchDetails.save();
      res
        .status(201)
        .json(
          new apiResponse(201, responseMatch, "Match created successfully")
        );
    } else {
      throw new apiError(400, "Data not provided");
    }
  }
);

// team creation
const handleTeamCreation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data }: { data: ITeam } = req.body;
    if (data) {
      const teamModel = new TeamModel({
        name: data.name,
        players: data.players,
        playing11: data.playing11,
      });
      const response = await teamModel.save();
      console.log(response);
    } else {
      throw new apiError(400, "data not provided");
    }
  }
);

// team creation
const handlePlayerCreation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data }: { data: IPlayer } = req.body;
    if (!mongoose.Types.ObjectId.isValid(data.team.toString())) {
      throw new apiError(400, "Invalid team ID");
    }
    const isTeamExist = await TeamModel.findById(data.team);
    if (!isTeamExist) {
      throw new apiError(400, "Team not exist");
    }
    if (data) {
      const playerModel = new PlayerModel({
        name: data.name,
        team: data.team,
      });
      const response = await playerModel.save();
      console.log(response);
      await handleAutoAddPlayerToTeam(req, res, next);
      res
        .status(201)
        .json(new apiResponse(201, response, "Player created successfully"));
    } else {
      throw new apiError(400, "data not provided");
    }
  }
);

//   Add all players to team automatically when the endpoint is called
const handleAutoAddPlayerToTeam = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data } = req.body;
    if (!mongoose.Types.ObjectId.isValid(data.team)) {
      throw new apiError(400, "Invalid team ID");
    }

    const responsePlayerModel = await PlayerModel.find({
      team: data.team,
    }).select("team");
    if (!(responsePlayerModel.length > 0)) {
      res.status(200).json(new apiResponse(404, {}, "No record found"));
    }
    const playerArray = responsePlayerModel.map((player) => player._id);

    const responseTeamModel = await TeamModel.findByIdAndUpdate(
      data.team,
      {
        $addToSet: {
          players: { $each: playerArray },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(responseTeamModel);

    res
      .status(200)
      .json(
        new apiResponse(
          200,
          { responseTeamModel },
          "Player created successfully"
        )
      );
  }
);

// handle ball
const handleBall = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data }: { data: IDataBall } = req.body;

    const ballModel = new BallModel({
      ...data,
    });
    const responseBall = await ballModel.save();
    const m = await updateMatchDetails(responseBall.match.toString());
    res
      .status(201)
      .json(new apiResponse(200, responseBall, "Ball created successfully"));
  }
);

// fetch players
const handleFetchPlayer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data }: { data: IMatch } = req.body;
    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(data._id as string)) {
      throw new apiError(400, "Invalid match ID");
    }

    const responsePlayerBat = await PlayerModel.find({
      team: data.currentBat,
    });
    const responsePlayerBall = await PlayerModel.find({
      team: data.currentBall,
    });
    const responseSend = {
      currentBat: responsePlayerBat,
      currentBall: responsePlayerBall,
    };
    res
      .status(200)
      .json(new apiResponse(200, responseSend, "Ball created successfully"));
  }
);

const handleFetchMatch = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data } = req.body;
    if (!mongoose.Types.ObjectId.isValid(data.matchId as string)) {
      throw new apiError(400, "Invalid match ID");
    }
    const responseMatch = await MatchModel.findById(data.matchId);
    if (responseMatch)
      res
        .status(200)
        .json(new apiResponse(200, responseMatch, "Ball created successfully"));
  }
);

const handleFetchPlayerRuns = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { data } = req.body;
    if (!mongoose.Types.ObjectId.isValid(data.playerId as string)) {
      throw new apiError(400, "Invalid player ID");
    }
    if (data.playerType === "batsman") {
      const responsePlayer = await BallModel.find({
        isLegal: true,
        batsman: data.playerId,
      });
      let runs = 0;
        responsePlayer?.map((ball)=>runs+=ball.runs)
      res
      .status(200)
      .json(new apiResponse(200, {runs}, "Fetched batsman run successfully"));
    }
    // bowler
    const responsePlayer = await BallModel.find({
      bowler: data.playerId,
    });
    let wickets = responsePlayer?.filter((ball)=>ball.wicket!=false).length
        
    res
    .status(200)
    .json(new apiResponse(200, {wickets}, "Fetched bowler wickets successfully"));
  }
);

export {
  handleMatchCreation,
  handleTeamCreation,
  handlePlayerCreation,
  handleAutoAddPlayerToTeam,
  handleBall,
  handleFetchPlayer,
  handleFetchMatch,
  handleFetchPlayerRuns
};
