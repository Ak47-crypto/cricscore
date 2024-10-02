import mongoose,{Schema,Document} from 'mongoose';

interface ITeam extends Document{
    name:string;
    players:Schema.Types.ObjectId[];
    playing11:Schema.Types.ObjectId[];
}
const TeamSchema:Schema<ITeam> = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    players:[
        {
            type:Schema.Types.ObjectId,
            ref:'Player'
        }
    ],
    playing11:[
        {
            type:Schema.Types.ObjectId,
            ref:'Player'
        }
    ]
},{timestamps:true})

TeamSchema.path('playing11').validate(function(value: Schema.Types.ObjectId[]) {
    return value.length === 11;
  }, 'Playing 11 must contain exactly 11 players.');

export default mongoose.model<ITeam>('Team',TeamSchema)
