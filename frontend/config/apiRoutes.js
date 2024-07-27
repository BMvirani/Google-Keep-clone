import config from "./config";

const apiRoutes = {
     login: config.baseUrl+"/login",
     addNote:config.baseUrl+"/api/notes/add",
     addNotePosition:config.baseUrl+ "/api/notePosition/store",
     getNotePosition:config.baseUrl+ "/api/notePosition/",
     getNotes: config.baseUrl+ "/api/notes/",
     editNotes:config.baseUrl+ "/api/notes/edit/",
     deleteNote:config.baseUrl+ "/api/notes/delete/",
 
};

export default apiRoutes;
