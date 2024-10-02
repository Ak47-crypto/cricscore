import mongoose,{Schema,Document} from "mongoose";

interface IBall extends Document{
    ballNo:number;
    runs:number;
    extras:{
        wide: boolean;
        noBall: boolean;
        byes: boolean;
        legByes: boolean;
        overthrow: boolean;
    }
    isLegal:boolean;
    wicket:boolean;
    batsman:Schema.Types.ObjectId;
    bowler:Schema.Types.ObjectId;
    match:Schema.Types.ObjectId;
}
const BallSchema:Schema<IBall> = new Schema({
    ballNo:{
        type:Number,
        required:true
    },
    runs:{
        type:Number,
        default:0
    },
    extras:{
        wide:{
            type:Boolean,
            default:false
        },
        noBall:{
            type:Boolean,
            default:false
        },
        byes:{
            type:Boolean,
            default:false
        },
        legByes:{
            type:Boolean,
            default:false
        },
        overthrow:{
            type:Boolean,
            default:false
        }
    },
    isLegal:{
        type:Boolean,
        default:true
    },
    wicket:{
        type:Boolean,
        default:false
    },
    batsman:{
        type:Schema.Types.ObjectId,
        ref:'Player',
        required:true
    },
    bowler:{
        type:Schema.Types.ObjectId,
        ref:'Player',
        required:true
    },
    match:{
        type:Schema.Types.ObjectId,
        ref:'Match',
        required:true
    }
},{timestamps:true})

export default mongoose.model<IBall>('Ball',BallSchema);