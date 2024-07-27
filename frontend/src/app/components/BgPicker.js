"use client";
import React, { useEffect, useState } from "react";
import { Popconfirm, Tooltip } from "antd";

import { NoColor } from "../../../public/svgs/svgs";
import Image from "next/image";

export default function BgPicker({
  bgPickerVisible,
  handleBgPickerConfirm,
  handleBgPickerCancel,
  bgPickerClassName,
  parentDivId,
  handleSelectedBg,
  defaultBg,
}) {
  const [open, setOpen] = useState(false);
  const [activeBg, setActiveBg] = useState("default-bg");

  useEffect(() => {
    setOpen(bgPickerVisible);
  }, [bgPickerVisible]);

  const handleOpenChange = (visible) => {
    if (!visible) {
      handleBgPickerCancel();
    }
    setOpen(visible);
  };

  useEffect(() => {
    setActiveBg(defaultBg);
  }, [defaultBg]);
   
  useEffect(() => {
    // handleSelectedBg(activeBg);
  }, [activeBg]);

  const getParentContainer = () => document.getElementById(parentDivId);

  const bgColorsList = [
    { value: "default-bg", label: "Default" },
    { value: "coral-bg", label: "Coral" },
    { value: "peach-bg", label: "Peach" },
    { value: "sand-bg", label: "Sand" },
    { value: "mint-bg", label: "Mint" },
    { value: "sage-bg", label: "Sage" },
    { value: "fog-bg", label: "Fog" },
    { value: "strom-bg", label: "Strom" },
    { value: "dusk-bg", label: "Dusk" },
    { value: "blossom-bg", label: "Blossom" },
    { value: "clay-bg", label: "Clay" },
    { value: "clalk-bg", label: "Clalk" },
  ];

  const bgImgList = [
    { label: "Default", bgClass: "default-bg" },
    { label: "Groceries", bgClass: "groceries-img-bg" },
    { label: "Food", bgClass: "food-img-bg" },
    { label: "Music", bgClass: "music-img-bg" },
    { label: "Recipes", bgClass: "recipe-img-bg" },
    { label: "Notes", bgClass: "notes-img-bg" },
    { label: "Places", bgClass: "places-img-bg" },
    { label: "Travel", bgClass: "trave-img-bg" },
    { label: "Video", bgClass: "video-img-bg" },
    { label: "Celebration", bgClass: "celebration-img-bg" },
  ];

  const handleBgSelection = (e, value) => {
    
    e.stopPropagation();
    setActiveBg(value);
    handleSelectedBg(value);
  };

  const colorSelection = (
    <>
    <div className="color-picker-box" onClick={(e) => e.stopPropagation()}>
      <div className="color-box">
        <ul>
        
          {bgColorsList?.map((item) => (
            <Tooltip placement="bottom" title={item?.label} key={item?.value}>
              <li
                className={`${item?.value} ${ activeBg === item?.value ? "active-bg" : ""}`}
               
                onClick={(e) => handleBgSelection(e, item.value)}
              >
                {item?.label === "Default" ? <NoColor /> : ""}
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
      <hr />
      <div className="bg-img-box">
        <ul>
          {bgImgList.map((item) => (
            <Tooltip placement="bottom" title={item.label} key={item.bgClass}>
              <li
                className={`${item.bgClass} ${
                  activeBg === item.bgClass ? "active-bg" : ""
                }`}
                onClick={(e) => handleBgSelection(e, item.bgClass)}
              >
                {item.label === "Default" ? (
                  <Image
                    src={"/backgrounds/noImg.png"}
                    className="default-img"
                    height={10}
                    width={10}
                  />
                ) : null}
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
    </div>
    </>
  );

  return (
    <>
      <Popconfirm
        title=""
        open={open}
        placement="bottom"
        onOpenChange={handleOpenChange}
        onConfirm={handleBgPickerConfirm}
        onCancel={handleBgPickerCancel}
        description={colorSelection}
        overlayClassName={`note-popconfirm ${bgPickerClassName}`}
        getPopupContainer={getParentContainer}
        showCancel={false}
      ></Popconfirm>
    </>
  );
}
