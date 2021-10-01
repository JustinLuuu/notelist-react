import store from '../store';

const NoteById = (id) =>{
    const note = store.getState().notes.listNotes.find(n => n.id === id);
    return note;
}

export default NoteById;