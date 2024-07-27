"use client";
import React, { useEffect, useState, useRef } from "react";
import { Modal, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addArchiveNotes,
  addNotes,
  addPinnedNotes,
  addTrashNotes,
} from "../redux/slice/noteslice";
import { BgColorsOutlined, DeleteOutlined } from "@ant-design/icons";
import { ArchiveSvg } from "../../../public/svgs/svgs";
import BgPicker from "./BgPicker";
import NoteService from "../service/api/note.services";

export default function NoteInfoModal({
  noteModalVisible,
  handleNoteConfirm,
  handleNoteCancel,
  okText,
  className,
  centered,
  noteInfo,
}) {
  const userId = localStorage?.getItem("userId");
  const notesList = useSelector((store) => store.notes.notesList);
  const pinList = useSelector((store) => store.notes.pinList);
  const archiveList = useSelector((store) => store.notes.archiveNotesList);
  const trashList = useSelector((store) => store.notes.notesTrashList);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [isShowBgPicker, setIsShowBgPicker] = useState(false);

  const dispatch = useDispatch();
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (noteModalVisible) {
      setNoteTitle(noteInfo?.title || "");
      setNoteContent(noteInfo?.content || "");
    } else {
      setNoteTitle("");
      setNoteContent("");
    }
  }, [noteInfo, noteModalVisible]);

  const updateNote = async (newTitle, newContent) => {
    const param = {
      userId: userId,
      title: newTitle || note?.title,
      content: newContent || note?.content,
    };

    const res = await NoteService.EditNote(noteInfo?.id, param);

    if (noteInfo.isPin) {
      const updatedList = pinList.map((note) =>
        note.id === noteInfo.id
          ? {
              ...note,
              title: newTitle || note.title,
              content: newContent || note.content,
            }
          : note
      );

      dispatch(addPinnedNotes(updatedList));
    } else if (noteInfo.isArchive) {
      const updatedList = archiveList.map((note) =>
        note.id === noteInfo.id
          ? {
              ...note,
              title: newTitle || note.title,
              content: newContent || note.content,
            }
          : note
      );

      dispatch(addArchiveNotes(updatedList));
    } else {
      const updatedList = notesList.map((note) =>
        note.id === noteInfo.id
          ? {
              ...note,
              title: newTitle || note.title,
              content: newContent || note.content,
            }
          : note
      );
      dispatch(addNotes(updatedList));
    }
  };

  const handleTitleChange = () => {
    const newTitle = titleRef.current.innerHTML;
    setNoteTitle(newTitle);
    updateNote(newTitle, noteContent);
  };

  const handleContentChange = () => {
    const newContent = contentRef.current.innerHTML;
    setNoteContent(newContent);
    updateNote(noteTitle, newContent);
  };

  const handleArchive = async (e) => {
    e.stopPropagation();

    const param = {
      userId: userId,
      isArchive: !noteInfo.isArchive,
    };

    const res = await NoteService.EditNote(noteInfo?.id, param);

    const updatedItem = {
      ...noteInfo,
      isArchive: !noteInfo.isArchive, // Toggle the archive status
    };

    let updatedNotesList = notesList.filter((note) => note.id !== noteInfo.id);
    let updatedPinList = pinList.filter((note) => note.id !== noteInfo.id);

    if (noteInfo.isArchive) {
      // Unarchiving the item
      const newArchiveList = archiveList.filter(
        (note) => note.id !== noteInfo.id
      );
      if (noteInfo.isPin) {
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

  const handleDeleteNote = async () => {
    // const updatedList = notesList.filter((note) => note.id !== noteInfo.id);
    // dispatch(addNotes(updatedList));

    // e.stopPropagation();

    const param = {
      userId: userId,
      isTrash: true,
    };

    const res = await NoteService.EditNote(noteInfo?.id, param);
    if (!noteInfo.isTrash) {
      if (noteInfo.isArchive) {
        const updatedItem = { ...noteInfo, isTrash: true };
        dispatch(addTrashNotes([...trashList, updatedItem]));
        const updatedList = archiveList.filter(
          (note) => note.id !== noteInfo.id
        );
        dispatch(addArchiveNotes(updatedList));
      } else if (noteInfo.isPin) {
        const updatedItem = { ...noteInfo, isTrash: true };
        dispatch(addTrashNotes([...trashList, updatedItem]));
        const updatedList = pinList.filter((note) => note.id !== noteInfo.id);
        dispatch(addPinnedNotes(updatedList));
      } else {
        const updatedItem = { ...noteInfo, isTrash: true };
        dispatch(addTrashNotes([...trashList, updatedItem]));
        const updatedList = notesList.filter((note) => note.id !== noteInfo.id);
        dispatch(addNotes(updatedList));
      }
    } else {
      const updatedList = trashList.filter((note) => note.id !== noteInfo.id);
      dispatch(addTrashNotes(updatedList));
    }
  };

  const handleBgChange = () => {
    setIsShowBgPicker(true);
  };

  const handleBgCancel = () => {
    setIsShowBgPicker(false);
  };

  const handleBgPConfirm = () => {
    setIsShowBgPicker(false);
  };

  const handleGetSelectedBg = async (val) => {
    const param = {
      userId: userId,
      background: val,
    };
    const res = await NoteService.EditNote(noteInfo?.id, param);

    const updatedList = notesList?.map((note) =>
      note.id === noteInfo.id
        ? {
            ...note,
            background: val,
          }
        : note
    );

    dispatch(addNotes(updatedList));
  };

  const handleCancel = () => {
    setNoteTitle("");
    setNoteContent("");
    handleNoteCancel();
  };

  return (
    <>
      <Modal
        title={null}
        open={noteModalVisible}
        onOk={handleNoteConfirm}
        onCancel={handleCancel}
        className={`note-modal ${className}`}
        centered={centered}
        footer={null}
      >
        <div className={`note-popup-wrapper ${noteInfo.background}`}>
          <div
            className="noteInfo-title-box"
            contentEditable
            ref={titleRef}
            dangerouslySetInnerHTML={{ __html: noteTitle }}
            onBlur={handleTitleChange}
          />
          <div
            className="editable-content"
            contentEditable
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: noteContent }}
            onBlur={handleContentChange}
          />
          <div className="note-box-footer-box note-box-btn-visible">
            <Tooltip placement="bottom" title={"Archive"}>
              <button
                className="unstyled-btn note-box-btn"
                onClick={handleArchive}
              >
                <ArchiveSvg />
              </button>
            </Tooltip>
            <Tooltip placement="bottom" title={"Background options"}>
              <button
                className="unstyled-btn note-box-btn"
                onClick={handleBgChange}
              >
                <BgColorsOutlined />
              </button>
            </Tooltip>
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
            <Tooltip placement="bottom" title={"Delete"}>
              <button
                className="unstyled-btn note-box-btn"
                onClick={handleDeleteNote}
              >
                <DeleteOutlined />
              </button>
            </Tooltip>
          </div>
        </div>
      </Modal>
    </>
  );
}
