import apiRoutes from "../../../../config/apiRoutes";
import AxiosService from "../axios.services";

class NoteService {
  static AddNote = async (param) => {
    let apiName = apiRoutes.addNote;
    let rawResult = await AxiosService.callPostAPI(apiName, param);
    return rawResult;
  };

  static AddNotePosition = async (param) => {
    let apiName = apiRoutes.addNotePosition;
    let rawResult = await AxiosService.callPostAPI(apiName, param);
    return rawResult;
  };

  static getNoteList = async (param) => {
    let apiName =
      apiRoutes.getNotes +
      `${param.userId}?isPin=${param.isPin}&isArchive=${param.isArchive}&isTrash=${param.isTrash}`;
    let rawResult = await AxiosService.callGetAPI(apiName);
    return rawResult;
  };

  static getTrashNoteList = async (param) => {
    let apiName = apiRoutes.getNotes +`${param.userId}?&isTrash=${param.isTrash}`;
    let rawResult = await AxiosService.callGetAPI(apiName);
    return rawResult;
  };

  static getNotePosition = async (param) => {
    let apiName = apiRoutes.getNotePosition + `${param.userId}/${param.type}`;
    let rawResult = await AxiosService.callGetAPI(apiName);
    return rawResult;
  };

  static EditNote = async (id, param) => {
    let apiName = apiRoutes.editNotes + `${id}`;
    console.log("apiName", apiName);
    let rawResult = await AxiosService.callPutAPI(apiName, param);
    return rawResult;
  };

  static DeleteNote = async (param) => {
    let apiName = apiRoutes.deleteNote + `${param.noteId}`;
    let rawResult = await AxiosService.callDeleteAPI(apiName);
    return rawResult;
  };
}

export default NoteService;
