  // import { createSlice } from "@reduxjs/toolkit";

  // export const notesSlice = createSlice({
  //   name: "notes",
  //   initialState: {
  //     isDraggable: false,
  //     notesList: [
  //       // {
  //       //   title: "test",
  //       //   content: "test",
  //       //   id: 1221212,
  //       //   background: "default-bg",
  //       //   isPin:false,
  //       //   isArchive:false
  //       // }
  //     ],
  //     notesPosition: [],
  //     pinList: [],
  //     pinPosition: [],
  //     archiveNotesList: [],
  //     archiveLayout: [],
  //     notesTrashList: [],
  //     notesTrashPosition: [],
  //   },

  //   reducers: {
  //     draggableMode: (state, action) => {
  //       state.isDraggable = action.payload;
  //     },
  //     addNotes: (state, action) => {
  //       state.notesList = action.payload;
  //     },
  //     updateNotePosition: (state, action) => {
  //       state.notesPosition = action.payload;
  //     },

  //     addPinnedNotes: (state, action) => {
  //       state.pinList = action.payload;
  //     },
  //     updatePinPosition: (state, action) => {
  //       state.pinPosition = action.payload;
  //     },
  //     addArchiveNotes: (state, action) => {
  //       state.archiveNotesList = action.payload;
  //     },
  //     updateArchiveLayout: (state, action) => {
  //       state.archiveLayout = action.payload;
  //     },
  //     addTrashNotes:(state, action)=>{
  //       console.log('action', action)
  //       state.notesTrashList = action.payload;
  //     },
  //     updateTrashLayout: (state, action) => {
  //       state.notesTrashPosition = action.payload;
  //     },
      
  //   },
  // });

  // export const {
  //   draggableMode,
  //   updatePinPosition,
  //   addNotes,
  //   updateNotePosition,
  //   addArchiveNotes,
  //   addPinnedNotes,
  //   updateArchiveLayout,
  //   addTrashNotes,
  //   updateTrashLayout,
  // } = notesSlice.actions;

  // export default notesSlice.reducer;
// ---------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isDraggable: false,
    notesList: [],
    notesPosition: [],
    pinList: [],
    pinPosition: [],
    archiveNotesList: [],
    archiveLayout: [],
    notesTrashList: [],
    notesTrashPosition: [],
    filteredNotesList: [],
    filteredPinList: [],
    searchNote:""
  },

  reducers: {
    draggableMode: (state, action) => {
      state.isDraggable = action.payload;
    },
    addNotes: (state, action) => {
      state.notesList = action.payload;
      state.filteredNotesList = action.payload;
    },
    updateNotePosition: (state, action) => {
      state.notesPosition = action.payload;
    },
    addPinnedNotes: (state, action) => {
      state.pinList = action.payload;
      state.filteredPinList = action.payload;
    },
    updatePinPosition: (state, action) => {
      state.pinPosition = action.payload;
    },
    addArchiveNotes: (state, action) => {
      state.archiveNotesList = action.payload;
    },
    updateArchiveLayout: (state, action) => {
      state.archiveLayout = action.payload;
    },
    addTrashNotes: (state, action) => {
      state.notesTrashList = action.payload;
    },
    updateTrashLayout: (state, action) => {
      state.notesTrashPosition = action.payload;
    },
    filterNotes: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredNotesList = state?.notesList?.filter(note =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      );
      state.filteredPinList = state?.pinList?.filter(note =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      );
    },
    clearFilter: (state) => {
      state.filteredNotesList = state.notesList;
      state.filteredPinList = state.pinList;
      state.notesPosition = state.notesList.map((_, index) => index); // Reset positions
      state.pinPosition = state.pinList.map((_, index) => index); // Reset positions
    },
    searchNoteValue: (state,action) => {
      state.searchNote = action.payload
    },
  },
});

export const {
  draggableMode,
  updatePinPosition,
  addNotes,
  updateNotePosition,
  addArchiveNotes,
  addPinnedNotes,
  updateArchiveLayout,
  addTrashNotes,
  updateTrashLayout,
  filterNotes,
  clearFilter,
  searchNoteValue
} = notesSlice.actions;

export default notesSlice.reducer;
