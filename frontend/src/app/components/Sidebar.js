"use client";
import {
  BellOutlined,
  BulbOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { ArchiveSvg } from "../../../public/svgs/svgs";
import { useRouter } from "next/navigation";

const Sidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState("notes");
  const router = useRouter();

  const handleItemClick = (item) => {
    if (item == "notes") {
      router.push("/");
    } else if (item == "archive") {
      router.push("/archive");
    } else if (item == "trash") {
      router.push("/trash");
    }
    setActiveItem(item);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li
            className={`sidebar-menu-item ${
              activeItem === "notes" ? "active" : ""
            }`}
            onClick={() => handleItemClick("notes")}
          >
            <BulbOutlined />
            <span className="sidebar-label">Notes</span>
          </li>
          <li
            className={`sidebar-menu-item ${
              activeItem === "archive" ? "active" : ""
            }`}
            onClick={() => {
              handleItemClick("archive");
            }}
          >
            {/* <DownloadOutlined /> */}
            <ArchiveSvg />
            <span className="sidebar-label">Archive</span>
          </li>
          <li
            className={`sidebar-menu-item ${
              activeItem === "trash" ? "active" : ""
            }`}
            onClick={() => handleItemClick("trash")}
          >
            <DeleteOutlined />
            <span className="sidebar-label">Trash</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
