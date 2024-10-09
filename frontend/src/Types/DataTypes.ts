export interface IPlayer {
  _id: string;
  name: string;
  team: string;
}
export interface IApiResponse {
  statusCode?: number;
  message?: string;
}

export interface IApiResponsePlayer extends IApiResponse {
  data: {
    currentBat: IPlayer[];
    currentBall: IPlayer[];
  };
}

export interface IMatch {
  _id:string;
  name: string;
  team: [string, string];
  innings?: number;
  currentBat?: string;
  currentBall?: string;
  runs?: number;
  delivery?: number;
  ball?: number;
  date: Date;
  venue: string;
  result: string;
}
interface IExtra {
  
    wide: boolean;
    noBall: boolean;
    byes: boolean;
    legByes: boolean;
    overthrow: boolean;

}
export interface IBall {
  runs:number;
  extras:IExtra
  isLegal:boolean;
  wicket:boolean;
  batsman:string;
  bowler:string;
  match:string;
}