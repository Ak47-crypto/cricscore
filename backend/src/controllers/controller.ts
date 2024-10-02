import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from 'express';
import MatchModel from "../models/match.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { IData } from "../types/dataType";

const handleMatchCreation = asyncHandler(
  async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    const {data}:IData=req.body as IData;
    console.log(data);
    
    
        if(data){
            const matchDetails=new MatchModel({
                name:data.matchName,
                team:data.team,
                innings:data.innings,
                date:data.date,
                venue:data.venue
            })
            await matchDetails.save()
            res.status(201).json(new apiResponse(201,{},"Match created successfully"))
        }else
        {
            throw new apiError(400,"Data not provided")
        }
    
  }
);

export {
    handleMatchCreation
}
