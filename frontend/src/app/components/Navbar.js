// ------------------------------------------------------
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import {
  EllipsisOutlined,
  FileDoneOutlined,
  MenuOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import GoogleAppModal from "./GoogleAppsModal";
import { Switch } from "antd";
import {
  draggableMode,
  filterNotes,
  clearFilter,
  searchNoteValue,
} from "../redux/slice/noteslice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import UserAccountModal from "./UserAccountModal";
import { UserAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [gAppModalVisible, setGAppModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notesList = useSelector((store) => store.notes.filteredNotesList);
  const pinList = useSelector((store) => store.notes.filteredPinList);
  const pathName = usePathname();
  const [isShowSearchBar, setisShowSearchBar] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [acModalVisible, setAcModalVisible] = useState(false);
 const[initialLoad,setInitialLoad]= useState(true);


 useEffect(()=>{
  setInitialLoad(false)
 },[])

  useEffect(() => {
    if (pathName.includes("/trash") || pathName.includes("/archive")) {
      setisShowSearchBar(false);
    } else {
      setisShowSearchBar(true);
    }

    if (pathName.includes("/login")) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathName]);

  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const showGAppModal = () => {
    setGAppModalVisible(true);
  };
  const handleGappCancel = () => {
    setGAppModalVisible(false);
  };

  const handleDraggable = (status) => {
    dispatch(draggableMode(status));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(searchNoteValue(query));
    if (query) {
      dispatch(filterNotes(query));
    } else {
      dispatch(clearFilter());
    }
  };


  const handleAcModalCancel = () => {
    setAcModalVisible(false);
  };

  const showAcModal = () => {
    setAcModalVisible(true);
  };

  const router = useRouter();
  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <>
      {showNavbar && !initialLoad && (
        <>
          <nav className="navbar" id="nabbar-div">
            <div className="navbar-row">
              <div className="nav-left-box">
                <div className="navbar-left">
                  <div className="navbar-menu-icon" onClick={toggleSidebar}>
                    <MenuOutlined />
                  </div>
                  <div className="navbar-logo">
                    {/* <FileDoneOutlined /> */}
                    <Image src={"/keepLogo.png"} height={40} width={40} />
                  </div>
                  <h1 className="navbar-title">Keep</h1>
                </div>
              </div>
              <div className="nav-center-box">
                {isShowSearchBar && (
                  <>
                    <div className="navbar-center hide-search">
                      <span className="search-icon">
                        <SearchOutlined />
                      </span>
                      <input
                        type="text"
                        className="navbar-search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                    {/* <div className="mobile-search-view">
                      <span className="search-icon">
                        <SearchOutlined />
                      </span>
                    </div> */}
                  </>
                )}
              </div>
              <div className="nav-right-box">
                <div className="navbar-right">
                  <div className="navbar-icon drag-mode-btn-box">
                    Drag Mode :
                    <Switch
                      onChange={handleDraggable}
                      className="drag-switch"
                      defaultValue={false}
                    />
                  </div>
                  <div className="profile-app-wrap">
                    <div className="d-flex flex-column navbar-icon google-apps-btn-wrap">
                      <button
                        className="unstyled-btn google-apps-btn"
                        onClick={showGAppModal}
                      >
                        <Image
                          src={
                            "https://ssl.gstatic.com/gb/images/bar/al-icon.png"
                          }
                          height={25}
                          width={25}
                        />
                      </button>
                    </div>
 
                    {user ? (
                      <>
                        <div
                          className="navbar-icon navbar-profile"
                          onClick={showAcModal}
                        >
                          <Image
                            src={user?.photoURL}
                            width={30}
                            height={30}
                            className="nav-user-img"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="navbar-icon navbar-profile"
                          onClick={handleSignIn}
                        >
                          <UserOutlined />
                        </div>
                      </>
                    )}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <Sidebar isOpen={sidebarOpen} />
          <GoogleAppModal
            googleAppModalVisible={gAppModalVisible}
            handleGappCancel={handleGappCancel}
            className={"google-app-modal"}
            parentDivId={"nabbar-div"}
          />

          <UserAccountModal
            userAcModalVisible={acModalVisible}
            handleUserAcCancel={handleAcModalCancel}
            className={"google-app-modal account-modal"}
            parentDivId={"nabbar-div"}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
