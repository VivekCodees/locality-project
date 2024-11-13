import mongoose, { Schema } from 'mongoose'

const localitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

export const Locality =  mongoose.model("Locality", localitySchema);