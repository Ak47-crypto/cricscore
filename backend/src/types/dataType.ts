export interface IDataMatch{
    
    matchName:string;
    team:string[];
    innings:number;
    venue:string;
    date:Date;
    
}

export interface IDataTeam{
    data:{
        name:string;
        players:[]
    }
}
