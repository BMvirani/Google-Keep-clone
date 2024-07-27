"use client";
import { Switch, Tooltip } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { draggableMode } from "../redux/slice/noteslice";
import { v4 as uuidv4 } from "uuid";
import {
  BgColorsOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FileZipOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { ArchiveSvg } from "../../../public/svgs/svgs";
import BgPicker from "./BgPicker";
import NoteService from "../service/api/note.services";

const AddNote = ({ onAddNote }) => {
  const dispatch = useDispatch();
  const userId =
    typeof window !== "undefined" && localStorage?.getItem("userId");
  const [content, setContent] = useState({
    title: "",
    content: "",
    id: "",
    background: "default-bg",
    isPin: false,
    isArchive: false,
    isTrash: false,
  });
  const [showTitlePlaceholder, setShowTitlePlaceholder] = useState(true);
  const [showContentPlaceholder, setShowContentPlaceholder] = useState(true);
  const [showAddNoteField, setShowAddNoteField] = useState(false);
  const [initialLoader, setInitialLoader] = useState(true);

  useEffect(() => {
    setInitialLoader(false);
  }, []);

  const addNoteFieldRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [content, onAddNote]);

  useEffect(() => {
    if (showAddNoteField) {
      setShowTitlePlaceholder(content.title === "");
      setShowContentPlaceholder(content.content === "");
      if (titleRef.current) {
        titleRef.current.focus();
      }
      if (contentRef.current) {
        contentRef.current.focus();
      }
    }
  }, [showAddNoteField]);

  const handleContentChange = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.innerHTML;
      setContent((prevContent) => ({ ...prevContent, content: newContent }));
      setShowContentPlaceholder(newContent === "");
    }
  };

  const handleTitleChange = () => {
    if (titleRef.current) {
      const newTitle = titleRef.current.innerHTML;
      setContent((prevContent) => ({ ...prevContent, title: newTitle }));
      setShowTitlePlaceholder(newTitle === "");
    }
  };

  const handleClickOutside = async (event) => {
    if (
      addNoteFieldRef.current &&
      !addNoteFieldRef.current.contains(event.target)
    ) {
      const newNote = { ...content };
      const param = {
        userId: userId,
        title: newNote?.title || "",
        content: newNote?.content || "",
        background: newNote?.background,
        isPin: newNote?.isPin || false,
        isArchive: newNote?.isArchive || false,
        isTrash: newNote?.isTrash || false,
      };
      const res = await NoteService.AddNote(param);

      const resNote = {
        userId: res?.data?.userId,
        title: res?.data?.title,
        content: res?.data?.content,
        background: res?.data?.background,
        isPin: res?.data?.isPin,
        isArchive: res?.data?.isArchive,
        isTrash: res?.data?.isTrash,
        id: res?.data?._id,
      };
      onAddNote(resNote); // Pass content with id to onAddNote prop
      setShowAddNoteField(false); // Hide the add note field
      setContent({
        title: "",
        content: "",
        id: "",
        background: "default-bg",
        isPin: false,
      });
      setShowTitlePlaceholder(true);
      setShowContentPlaceholder(true);
    }
  };

  return (
    <>
      {!initialLoader && (
        <>
          {!showAddNoteField ? (
            <div className="add-note-box">
              <div
                className="add-note-field"
                onClick={() => setShowAddNoteField(true)}
              >
                Take a note...
              </div>
            </div>
          ) : (
            <>
              <div className="add-note-box">
                <div
                  className="d-flex flex-column add-note-wrap"
                  ref={addNoteFieldRef}
                >
                  <div
                    className="add-note-title-field"
                    contentEditable
                    ref={titleRef}
                    suppressContentEditableWarning={true}
                    onInput={handleTitleChange}
                  >
                    {showTitlePlaceholder && (
                      <span className="placeholder-custom">Title</span>
                    )}
                  </div>
                  <div className="pin-box">
                    <Tooltip placement="bottom" title={"Pin note"}>
                      <button
                        className="unstyled-btn pin-btn note-box-btn"
                        // onClick={handlePin}
                      >
                        <PushpinOutlined />
                      </button>
                    </Tooltip>
                  </div>
                  <div
                    className="add-note-content-field content"
                    contentEditable
                    ref={contentRef}
                    suppressContentEditableWarning={true}
                    onInput={handleContentChange}
                  >
                    {showContentPlaceholder && (
                      <span className="placeholder-custom">Take a note...</span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AddNote;
