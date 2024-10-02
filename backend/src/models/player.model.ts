import mongoose,{Schema,Document} from 'mongoose';

interface IPlayer extends Document{
    name:string;
    team:Schema.Types.ObjectId;
}

const PlayerSchema:Schema<IPlayer> = new Schema({
    name:{
        type:String,
        required:true
    },
    team:{
        type:Schema.Types.ObjectId,
        ref:'Team'
    }
},{timestamps:true})

export default mongoose.model<IPlayer>('Player',PlayerSchema)