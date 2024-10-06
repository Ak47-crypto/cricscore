export interface IPlayer {
    _id:string;
    name:string;
    team:string;
}
export interface IApiResponse{
    statusCode:number;
    message:string;
} 

export interface IApiResponsePlayer extends IApiResponse {
    data:IPlayer[]
}