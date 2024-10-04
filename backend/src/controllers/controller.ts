import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import MatchModel from "../models/match.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { IDataMatch } from "../types/dataType";
import TeamModel, { ITeam } from "../models/team.model";
import PlayerModel, { IPlayer } from "../models/player.model";
import mongoose from "mongoose";

const handleMatchCreation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { data }: { data: IDataMatch } = req.body;
    console.log(data);
    if (data) {
      const matchDetails = new MatchModel({
        name: data.matchName,
        team: data.team,
        innings: data.innings,
        date: data.date,
        venue: data.venue,
      });
      await matchDetails.save();
      res
        .status(201)
        .json(new apiResponse(201, {}, "Match created successfully"));
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
    const isTeamExist = await TeamModel.findById(data.team)
    if(!isTeamExist){
        throw new apiError(400,"Team not exist")
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

export {
  handleMatchCreation,
  handleTeamCreation,
  handlePlayerCreation,
  handleAutoAddPlayerToTeam,
};
