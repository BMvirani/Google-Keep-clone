"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  addArchiveNotes,
  updateArchiveLayout,
} from "@/app/redux/slice/noteslice";
import TodoItem from "@/app/components/TodoItem";
import NoteService from "@/app/service/api/note.services";
import { ArchiveSvg } from "../../../../public/svgs/svgs";

const ArchiveGridLayout = () => {
  const isDraggable = useSelector((store) => store.notes.isDraggable);
  const dispatch = useDispatch();
  const archiveList = useSelector((store) => store.notes.archiveNotesList);
  const layout = useSelector((store) => store.notes.archiveLayout);
  const [isEdited, setIsEdited] = useState(false);
  const userId =
    typeof window !== "undefined" && localStorage?.getItem("userId");

  useEffect(() => {
    if (userId) {
      getNoteList();
    }
  }, [userId]);
 
  // get notes archive list from api 
  const getNoteList = async () => {
    const param = {
      userId: userId,
      isPin: false,
      isArchive: true,
      isTrash: false,
    };
    const res = await NoteService.getNoteList(param);
    if (res) {
      let resNoteListTemp = [];
      res?.data?.content?.map((item) => {
        resNoteListTemp.push({
          id: item._id,
          userId: item.userId,
          title: item?.title,
          content: item?.content,
          background: item?.background,
          isPin: item?.isPin,
          isArchive: item?.isArchive,
          isTrash: item?.isTrash,
          createdAt: item?.createdAt,
        });
      });
      dispatch(addArchiveNotes(resNoteListTemp));
      const param = {
        userId: userId,
        type: "archive",
      };
      const resPosition = await NoteService.getNotePosition(param);
      if (resPosition?.status == 200 && resPosition?.data?.length > 0) {
        const resArchivePosition = JSON.parse(resPosition?.data?.position);
        if (resArchivePosition?.length > 0) {
          dispatch(updateArchiveLayout(resArchivePosition));
        } else {
          dispatch(updateArchiveLayout([]));
        }
      }
    } else {
      dispatch(updateArchiveLayout([]));
    }
  };

  useEffect(() => {
    const newLayout = archiveList.map((item, index) => ({
      i: item.id.toString(),
      x: index % 5,
      y: Math.floor(index / 5),
      w: 1,
      h: 1,
    }));
    dispatch(updateArchiveLayout(newLayout));
  }, [archiveList, dispatch]);

  // archive note layout 
  const handleLayoutChange = async (newLayout) => {
    if (!isEdited && isDraggable) {
      const param = {
        userId: userId,
        listType: "archive",
        position: JSON.stringify(newLayout),
      };

      const res = await NoteService.AddNotePosition(param);
      if (res?.status == 200) {
        const resLayout = JSON.parse(res?.data?.position);
        dispatch(updateArchiveLayout(resLayout));
      }
    }

    // dispatch(updateArchiveLayout(newLayout));
  };

  return (
    <div className="board-wrapper">
      {archiveList && archiveList.length > 0 ? (
        <>
          <div className="board-box">
            <GridLayout
              className="layout"
              layout={layout}
              cols={5}
              rowHeight={200}
              width={1200}
              onLayoutChange={handleLayoutChange}
              isDraggable={isDraggable}
            >
              {archiveList.map((item) => (
                <div
                  key={item.id}
                  data-grid={
                    layout.find((l) => l.i === item.id.toString()) || {
                      i: item.id.toString(),
                      x: 0,
                      y: 0,
                      w: 1,
                      h: 1,
                    }
                  }
                >
                  <TodoItem item={item} isDraggable={isDraggable} />
                </div>
              ))}
            </GridLayout>
          </div>
        </>
      ) : (
        <>
          <div className="no-archive-box">
            <div className="no-archive">
              <ArchiveSvg />
              No notes in archive
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArchiveGridLayout;
