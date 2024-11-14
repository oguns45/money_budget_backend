import { Request, Response } from 'express';
//import Note from '../models/NoteModel';

// // Create a new note (Create)
// export const createNote = async (req: Request, res: Response) => {
//     const { title, content } = req.body;

//     if (!title || !content ) {

//         return res.status(400).json({ message: 'Title and content are required.' });
//     }

//     try {
//         const newNote = new Note({
//             title,
//             content,
            
//             createdAt: new Date(),
//         });

//         const savedNote = await newNote.save();
//         res.status(201).json(savedNote);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating note.', error });
//     }
// };

// // Retrieve all notes (Read)
// export const getAllNotes = async (req: Request, res: Response) => {
//     console.log(req.body.username);
//     try {
//         const notes = await Note.find().sort({createdAt:-1});
//         res.status(200).json(notes);
        
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving notes.', error });
//     }
// };

// // Retrieve a single note by ID (Read)
// export const getNoteById = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const note = await Note.findById(id);
//         if (!note) {
//             return res.status(404).json({ message: 'Note not found.' });
//         }
//         res.status(200).json(note);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving note.', error });
//     }
// };

// // Update a note by ID (Update)
// export const updateNote = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { title, content, date, time} = req.body;

//     if (!title || !content) {
//         return res.status(400).json({ message: 'Title and content are required.' });
//     }

//     try {
//         const updatedNote = await Note.findByIdAndUpdate(
//             id,
//             { title, content, date, time },
//             { new: true }
//         );
//         if (!updatedNote) {
//             return res.status(404).json({ message: 'Note not found.' });
//         }
//         res.status(200).json(updatedNote);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating note.', error });
//     }
// };

// // Delete a note by ID (Delete)
// export const deleteNote = async (req: Request, res: Response) => {
//     const { id } = req.params;

//     try {
//         const deletedNote = await Note.findByIdAndDelete(id);
//         if (!deletedNote) {
//             return res.status(404).json({ message: 'Note not found.' });
//         }
//         res.status(200).json({ message: 'Note deleted successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting note.', error });
//     }
// };
