"use client";
import React, { useEffect, useState } from "react";
import NoteInfoModal from "./NoteInfoModal";
import {
  BgColorsOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileZipOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { ArchiveSvg, DeleteSvg, RestoreSvg } from "../../../public/svgs/svgs";

import { useDispatch, useSelector } from "react-redux";
import {
  addArchiveNotes,
  addNotes,
  addPinnedNotes,
  addTrashNotes,
} from "../redux/slice/noteslice";
import BgPicker from "./BgPicker";
import NoteService from "../service/api/note.services";

const TodoItem = ({ item, isDraggable }) => {
  const userId = localStorage?.getItem("userId");
  const notesList = useSelector((store) => store.notes.notesList);
  const archiveList = useSelector((store) => store.notes.archiveNotesList);
  const trashList = useSelector((store) => store.notes.notesTrashList);
  // const isDraggable = useSelector((store) => store.notes.isDraggable);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteInfo, setNoteInfo] = useState(item);
  const [isShowBgPicker, setIsShowBgPicker] = useState(false);
  const pinList = useSelector((store) => store.notes.pinList);
  const archiveNotes = useSelector((store) => store.notes.archiveNotesList);

  const dispatch = useDispatch();

  const showNoteInfo = (e, item) => {
    if (!isDraggable) {
      // setNoteInfo(item);
      setNoteModalVisible(true);
    }
  };

  const handleNoteConfirm = () => {
    setNoteModalVisible(false);
  };
  const handleNoteCancel = () => {
    setNoteModalVisible(false);
  };

  const handlePin = async (e) => {
    e.stopPropagation();

    const param = {
      userId: userId,
      isPin: !item.isPin,
    };

    const res = await NoteService.EditNote(item?.id, param);

    const updatedItem = {
      ...item,
      isPin: !item.isPin,
    };

    if (item.isArchive) {
      // If the item is archived, just toggle the pin status in the archive list
      const updatedArchiveList = archiveList.map((note) =>
        note.id === item.id ? updatedItem : note
      );
      dispatch(addArchiveNotes(updatedArchiveList));
    } else {
      if (item.isPin) {
        // Unpinning the item
        const newPinList = pinList.filter((note) => note.id !== item.id);
        const newNotesList = [...notesList, updatedItem];
        dispatch(addPinnedNotes(newPinList));
        dispatch(addNotes(newNotesList));
      } else {
        // Pinning the item
        const newNotesList = notesList.filter((note) => note.id !== item.id);
        const newPinList = [...pinList, updatedItem];
        dispatch(addNotes(newNotesList));
        dispatch(addPinnedNotes(newPinList));
      }
    }
  };

  const handleArchive = async (e) => {
    e.stopPropagation();
    const param = {
      userId: userId,
      isArchive: !item.isArchive,
    };

    const res = await NoteService.EditNote(item?.id, param);

    const updatedItem = {
      ...item,
      isArchive: !item.isArchive, // Toggle the archive status
    };

    let updatedNotesList = notesList.filter((note) => note.id !== item.id);
    let updatedPinList = pinList.filter((note) => note.id !== item.id);

    if (item.isArchive) {
      // Unarchiving the item
      const newArchiveList = archiveList.filter((note) => note.id !== item.id);
      if (item.isPin) {
        updatedPinList = [...pinList, updatedItem];
      } else {
        updatedNotesList = [...notesList, updatedItem];
      }
      dispatch(addArchiveNotes(newArchiveList));
      dispatch(addNotes(updatedNotesList));
      dispatch(addPinnedNotes(updatedPinList));
    } else {
      // Archiving the item
      dispatch(addNotes(updatedNotesList));
      dispatch(addPinnedNotes(updatedPinList));
      dispatch(addArchiveNotes([...archiveList, updatedItem]));
    }
  };
  const handleBgChange = (e) => {
    setIsShowBgPicker(true);
    e.stopPropagation();
  };

  const handleDeleteNote = async (e) => {
    e.stopPropagation();

    if (!item.isTrash) {
      if (item.isArchive) {
        const updatedItem = { ...item, isTrash: true };
        dispatch(addTrashNotes([...trashList, updatedItem]));
        const updatedList = archiveList.filter((note) => note.id !== item.id);
        dispatch(addArchiveNotes(updatedList));
      } else if (item.isPin) {
        const updatedItem = { ...item, isTrash: true };
        dispatch(addTrashNotes([...trashList, updatedItem]));
        const updatedList = pinList.filter((note) => note.id !== item.id);
        dispatch(addPinnedNotes(updatedList));
      } else {
        const updatedItem = { ...item, isTrash: true };
        dispatch(addTrashNotes([...trashList, updatedItem]));
        const updatedList = notesList.filter((note) => note.id !== item.id);
        dispatch(addNotes(updatedList));
      }
    } else {
      const updatedList = trashList.filter((note) => note.id !== item.id);
      dispatch(addTrashNotes(updatedList));
    }

    if (item.isTrash) {
      const param = {
        noteId: item?.id,
      };

      const res = await NoteService.DeleteNote(param);
    } else {
      const param = {
        userId: userId,
        isTrash: true,
      };

      const res = await NoteService.EditNote(item?.id, param);
    }
  };

  const handleBgCancel = () => {
    setIsShowBgPicker(false);
  };
  const handleBgPConfirm = () => {
    setIsShowBgPicker(false);
  };

  const handleGetSelectedBg = async (val) => {
    let updatedList;
    if (item.isArchive) {
      updatedList = archiveList.map((option) => {
        if (item.id === option.id) {
          return {
            ...option,
            background: val,
          };
        }
        return option;
      });
      dispatch(addArchiveNotes(updatedList));
    } else if (item.isPin) {
      updatedList = pinList.map((option) => {
        if (item.id === option.id) {
          return {
            ...option,
            background: val,
          };
        }
        return option;
      });
      dispatch(addPinnedNotes(updatedList));
    } else {
      updatedList = notesList.map((option) => {
        if (item.id === option.id) {
          return {
            ...option,
            background: val,
          };
        }
        return option;
      });
      dispatch(addNotes(updatedList));
    }

    const param = {
      userId: userId,
      background: val,
    };
    const res = await NoteService.EditNote(item?.id, param);
  };

  const handleRecoverNote = async (e) => {
    e.stopPropagation();

    e.stopPropagation();
    const param = {
      userId: userId,
      isTrash: !item.isTrash,
    };

    const res = await NoteService.EditNote(item?.id, param);

    const updatedItem = { ...item, isTrash: false };

    const updatedTrashList = trashList.filter((note) => note.id !== item.id);
    dispatch(addTrashNotes(updatedTrashList));

    if (item.isArchive) {
      dispatch(addArchiveNotes([...archiveList, updatedItem]));
    } else if (item.isPin) {
      dispatch(addPinnedNotes([...pinList, updatedItem]));
    } else {
      dispatch(addNotes([...notesList, updatedItem]));
    }
  };
  return (
    <>
      <div
        className={`note-box ${item.background} ${
          isDraggable ? "move-note" : ""
        }`}
        onClick={(e) => showNoteInfo(e, item)}
        // onClick={() => showNoteInfo()}
      >
        <div className="note-box-title-box">
          <div
            dangerouslySetInnerHTML={{ __html: item.title }}
            className="note-box-title"
          />
          <div>
            <Tooltip placement="bottom" title={"Pin note"}>
              <button
                className={`unstyled-btn pin-btn note-box-btn ${
                  item.isPin ? "is-pin" : "note-box-btn-visible"
                }`}
                onClick={handlePin}
              >
                <PushpinOutlined />
              </button>
            </Tooltip>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: item.content }}
          className="note-box-content"
        />
        <div className="note-box-footer-box note-box-btn-visible">
          {!item.isTrash && (
            <Tooltip
              placement="bottom"
              title={item.isArchive ? "Unarchive" : "Archive"}
            >
              <button
                className={`unstyled-btn note-box-btn ${
                  item.isArchive ? "is-archive" : ""
                }`}
                onClick={handleArchive}
              >
                <ArchiveSvg />
              </button>
            </Tooltip>
          )}
          {!item.isTrash && (
            <Tooltip placement="bottom" title={"Background options"}>
              <button
                className="unstyled-btn note-box-btn"
                onClick={handleBgChange}
              >
                <BgColorsOutlined />
              </button>
            </Tooltip>
          )}
          {isShowBgPicker && (
            <BgPicker
              bgPickerVisible={isShowBgPicker}
              handleBgPickerCancel={handleBgCancel}
              handleBgPickerConfirm={handleBgPConfirm}
              parentDivId={"note-box-footer-box"}
              bgPickerClassName={"item-box-bg-picker"}
              defaultBg={"default-bg"}
              handleSelectedBg={handleGetSelectedBg}
            />
          )}
          <Tooltip
            placement="bottom"
            title={item.isTrash ? "Delete forever" : "Delete"}
          >
            <button
              className="unstyled-btn note-box-btn"
              onClick={handleDeleteNote}
            >
              <DeleteSvg />
            </button>
          </Tooltip>
          {item.isTrash && (
            <Tooltip placement="bottom" title={"Restore"}>
              <button
                className="unstyled-btn note-box-btn"
                onClick={handleRecoverNote}
              >
                <RestoreSvg />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
      <NoteInfoModal
        noteInfo={item}
        noteModalVisible={noteModalVisible}
        handleNoteConfirm={handleNoteConfirm}
        handleNoteCancel={handleNoteCancel}
        okText="Close"
        className=""
        centered={true}
      />
    </>
  );
};

export default TodoItem;
