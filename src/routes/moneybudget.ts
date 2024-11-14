import express from 'express'
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from '../controllers/note'
import protect from '../middlewares/authMw'

const router = express.Router()

//router.get('/', )
router.post('/note',  createNote)


export default router