import mongoose, {Schema} from "mongoose";

const anySchema = new Schema(
    {
        author:{
            name: String,
            required: true
        },
        description: {
            detail: String,
            required: true
        }
    },
    {timestamps: true}
)

export const Any = mongoose.model("Any", anySchema)