"use client"
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TodoList from "./components/Board";
import AddNote from "./components/AddNote";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const Home = () => {
  
  return (
    <>
      {/* <Navbar /> */}
      <div className="board-wrapper">
        <TodoList />
      </div>
    </>
  );
};

export default Home;
