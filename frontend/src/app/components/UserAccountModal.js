"use client";
import React, { useEffect, useState } from "react";
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
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
export default function UserAccountModal({
  userAcModalVisible,
  handleUserAcConfirm,
  handleUserAcCancel,
  className,
  parentDivId,
}) {
  const getParentContainer = () => document.getElementById(parentDivId);
  const { user, googleSignIn, logOut } = UserAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      // router.push("/login");
    }
  }, [user]);
  const handleSignOut = () => {
    logOut();
    router.push("/login");
  };

  return (
    <>
      <Modal
        title={null}
        open={userAcModalVisible}
        onOk={handleUserAcConfirm}
        onCancel={handleUserAcCancel}
        className={`note-modal ${className}`}
        centered={false}
        footer={null}
        getContainer={getParentContainer}
      >
        <div className="ac-modal-box">
          <div className="user-email">{user?.email}</div>
          <div className="user-info">
            <div className="user-img">
              <Image src={user?.photoURL} width={70} height={70} />
            </div>
            <div className="user-name">Hi, {user?.displayName}!</div>
            <div className="manage-g-acc-link">
              <Link
                target="_blank"
                href={
                  "https://myaccount.google.com/?hl=en&amp;authuser=0&amp;utm_source=OGB&amp;utm_medium=act"
                }
              >
                Manage Your google account
              </Link>
            </div>
          </div>

          <div className="sign-out" onClick={handleSignOut}>
            <UploadOutlined />
            Sign out{" "}
          </div>
          <div className="ac-modal-footer">
            <Link
              target="_blank"
              href={"https://policies.google.com/privacy?hl=en&amp;authuser=0"}
            >
              Privacy Policy
            </Link>
            <Link
              target="_blank"
              href={"https://policies.google.com/terms?hl=en&amp;authuser=0"}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
