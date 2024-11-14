import {model, Schema, Types} from 'mongoose'
import { INoteInterface } from '../utils/Interfaces'
import { title } from 'process'

const noteSchema = new Schema<INoteInterface>({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true

    },
    updated:{
        type:Date,
        default:Date.now
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    

})







export default model('NoteModel', noteSchema)