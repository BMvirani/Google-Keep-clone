"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import {
  AccountIcon,
  CalenderSvg,
  ContactsSvg,
  DriveSvg,
  GeminiSvg,
  GmailSvg,
  GoogleChatSvg,
  GoogleMeetSvg,
  GoogleSvg,
  MapsSvg,
  NewsSvg,
  PhotosSvg,
  TranslateSvg,
  YoutTubeSvg,
} from "../../../public/svgs/svgs";
import Link from "next/link";
import { UserAuth } from "../../../context/AuthContext";
import Image from "next/image";
export default function GoogleAppModal({
  googleAppModalVisible,
  handleGappConfirm,
  handleGappCancel,
  className,
  parentDivId,
}) {
  const getParentContainer = () => document.getElementById(parentDivId);
  const { user, googleSignIn, logOut } = UserAuth();
  const apps = [
    // { appName: "Account", icon: <AccountIcon />, url: "/login" },
    {
      appName: "Account",
      icon: <Image src={user?.photoURL} height={30} width={30} className="google-app-user-icon"/>,
      url: "https://myaccount.google.com/?hl=en&amp;authuser=0&amp;utm_source=OGB&amp;utm_medium=act",
    },

    { appName: "Search", icon: <GoogleSvg />, url: "https://www.google.com/" },
    { appName: "Maps", icon: <MapsSvg />, url: "https://www.google.com/maps" },
    { appName: "Maps", icon: <MapsSvg />, url: "https://www.google.com/maps" },
    { appName: "YouTube", icon: <YoutTubeSvg />, url: "https://youtube.com" },
    {
      appName: "Gemini",
      icon: <GeminiSvg />,
      url: "https://gemini.google.com",
    },
    { appName: "News", icon: <NewsSvg />, url: "https://news.google.com/" },
    { appName: "Gmail", icon: <GmailSvg />, url: "http://www.gmail.com/" },
    {
      appName: "Meet",
      icon: <GoogleMeetSvg />,
      url: "https://meet.google.com",
    },
    {
      appName: "Contacts",
      icon: <ContactsSvg />,
      url: "https://contacts.google.com/",
    },
    {
      appName: "Drive",
      icon: <DriveSvg />,
      url: "https://drive.google.com/drive/u/0/home",
    },
    {
      appName: "Calender",
      icon: <CalenderSvg />,
      url: "https://calendar.google.com/calendar?authuser=0",
    },
    {
      appName: "Drive",
      icon: <CalenderSvg />,
      url: "https://calendar.google.com/calendar?authuser=0",
    },
    {
      appName: "Translate",
      icon: <TranslateSvg />,
      url: "https://translate.google.com/?sl=auto&tl=en&op=translate",
    },
    {
      appName: "Photos",
      icon: <PhotosSvg />,
      url: "https://photos.google.com/?pli=1",
    },
    {
      appName: "Chat",
      icon: <GoogleChatSvg />,
      url: "https://mail.google.com/chat/u/0/#chat/home",
    },
  ];
  return (
    <>
      <Modal
        title={null}
        open={googleAppModalVisible}
        onOk={handleGappConfirm}
        onCancel={handleGappCancel}
        className={`note-modal ${className}`}
        centered={false}
        footer={null}
        getContainer={getParentContainer}
      >
        <div className="g-app-link-wrap row-12">
          {apps.map((item) => (
            <div key={item.appName} className="g-app-link-box col">
              <Link href={item.url} target="_blank" className="g-app-link">
                <div className="g-app-icon"> {item.icon}</div>
                <div className="g-app-name">{item.appName}</div>
              </Link>
            </div>
          ))}
        </div>
        <div className="more-f-google-box ">
          <Link
            href={"https://about.google/products/"}
            target="_blank"
            className="more-f-google"
          >
            More from Google
          </Link>
        </div>
      </Modal>
    </>
  );
}
