import React, { useRef, useState } from "react";
import MenuBtn from "../../assets/menu_icon.png";
import { Logo } from "../Logo";
import {
  AiFillCloseSquare,
  AiOutlineDown,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "izitoast-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useOutsideClickEditor from "./Toggle/useOutsideClickEdit";
import useOutsideClickProfile from "./Toggle/useOutsideClickProf";
import UserService from "../../utils/UserService";
import { useEffect } from "react";
import { logoutUser } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { HiUserCircle } from "react-icons/hi2";

const Navigation = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [isEditorMenu, setIsEditorMenu] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [isMobMenu, setIsMobMenu] = useState(false);
  const [data, setData] = useState([]);
  const [imgData, setImgData] = useState([])

  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const ref = useRef();
  const ref1 = useRef();

  const id = atob(localStorage.getItem("userId"))

  const dispatch = useDispatch();

  useOutsideClickEditor(ref, () => {
    setIsEditorMenu(false);
  });

  useOutsideClickProfile(ref1, () => {
    setIsProfile(false);
  });

  const successAlert = useToast({
    title: "Successfully Logout",
    titleColor: "green",
    color: "green",
    icon: "ico-success",
    position: "topCenter",
    timeout: 0.2
  });

  const loadData = async () => {
    const response = await UserService.getOne(id);
    setData(response.data.firstName)
  };

  const imgLoader = async () => {
    const response = await UserService.getProfImg(id);
    
    let imgUrl = response.data;

    setImgData(imgUrl)
    btoa(console.log(imgUrl))
  }

  useEffect(() => {
    if (isAuthenticated) {
      imgLoader();
      loadData();
    }
  }, []);

  const navigate = useNavigate();

  const Login = () => {
    navigate("/login");
    setIsProfile(false);
  };

  const Register = () => {
    navigate("/register");
    setIsProfile(false);
  };

  const Logout = () => {
    dispatch(logoutUser())
    navigate("/");
    successAlert();
  };

  return (
    <>
      {/* Desktop */}
      <div className="md:flex items-center justify-between hidden w-full h-12 bg-[#F2F1EE]">
        <div className="relative flex items-center justify-center gap-12 ml-4">
          <img
            onClick={() => {
              setIsMenu(!isMenu);
            }}
            id="menu"
            className="w-full cursor-pointer h-8"
            src={MenuBtn}
            alt="menu btn"
          />
          {isAuthenticated && (
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="md:flex items-center gap-1 text-[#333030] cursor-pointer hidden"
              onClick={() => setIsEditorMenu(!isEditorMenu)}
              ref={ref}
            >
              <p className="text-[#333030]">Editor</p>
              <AiOutlineDown />
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-2 cursor-pointer -ml-4">
          <input
            placeholder="Search Blogs..."
            className="h-[26px] w-460 rounded-full p-4 text-2xl ml-8 outline-none text-[#333030] border-solid border-[1.5px] border-lightBlack"
            type="text"
          />
          <button className="searchbtn h-[23px] w-[23px] rounded-full text-white bg-[#333030] text-2xl -ml-9">
            <AiOutlineSearch />
          </button>
        </div>

        <div className="relative">
          <div className="drop-shadow-lg cursor-pointer" ref={ref1}>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setIsProfile(!isProfile)}
              className="flex items-center justify-center rounded-2xl w-48 h-12 cursor-pointer gap-2"
            >
              <img src={`data:image/jpeg;base32,${imgData}`} alt="" />
              {/* <FaUserCircle className="text-4xl text-[#333030] mr-1" /> */}
              {isAuthenticated ? <p className="flex flex-row">Hello, {data}</p> : <p className="flex flex-row">Hello, User</p>}
            </motion.div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-12 bg-[#F2F1EE]">
        <div className="relative flex items-center justify-center">
          <img
            onClick={() => {
              setIsMenu(!isMenu);
            }}
            id="menu"
            className="w-full cursor-pointer h-8 ml-2"
            src={MenuBtn}
            alt="menu btn"
          />
        </div>
        <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
          <Logo />
        </Link>

        <div className="relative">
          <HiUserCircle
            className="w-8 min-w-8 min-h-8 h-8 drop-shadow-lg cursor-pointer rounded-[50%] ml-4"
            onClick={() => {
              setIsMobMenu(!isMobMenu);
            }}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isAuthenticated?<>
      {isMobMenu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className=" absolute top-14 right-2 h-44 w-36 bg-[#f2f1ee] flex flex-col items-center justify-center md:hidden rounded-lg z-10"
        >
           {isAuthenticated && (
              <>
                <div className="flex items-center justify-start">
                  <p className="font-bold">My Account</p>
                </div>
                <div className="flex items-center pt-4">
                  <Link className="cursor-pointer" to={"/profile"}>
                    Profile
                  </Link>
                </div>
                <Link
                  className="flex items-center pt-4 cursor-pointer"
                  to={"/settings"}
                >
                  <p>Settings</p>
                </Link>
                <div
                  onClick={Logout}
                  className="flex items-center pt-4 cursor-pointer"
                >
                  <p>Logout</p>
                </div>
              </>
            )}
        </motion.div>
      )}</>:""}
      {/* Desktop Menu */}
      <div>
        <div className="md:flex justify-center items-center h-28 hidden bg-[#fffbfa]">
          <Logo />
        </div>
        <div className="md:flex justify-center items-center h-12 bg-[#F2F1EE] hidden">
          <div className="w-full flex justify-self-stretch items-center text-[#333030] font-sans">
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Trending
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Technology
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Business
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Philosophy
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Lifestyle
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Health
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Opinion
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Sports
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Cuisine
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Travel
            </Link>
            <Link
              className="cursor-pointer flex items-center justify-center w-full"
              to="/"
            >
              Humor
            </Link>
          </div>
        </div>

        {/* Editor */}
        {isEditorMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute top-14 rounded-lg md:left-[40px] flex justify-center items-center flex-col shadow-md w-48 px-2 gap-1 bg-[#f2f1ee]"
          >
            <div
              onClick={() => setIsEditorMenu(!isEditorMenu)}
              className="cursor-pointer flex items-center justify-start w-full border-b-[1px] border-[#1f1f1f]"
            >
              <BsPencilSquare className="py-2 text-4xl" />
              <Link to={"/write/" + uuidv4()} key={uuidv4()}>
                Editor JS
              </Link>
            </div>
            <div
              onClick={() => setIsEditorMenu(!isEditorMenu)}
              className="cursor-pointer flex items-center justify-start w-full"
            >
              <BsPencilSquare className="py-2 text-4xl" />
              <Link to={"/type/" + uuidv4()} key={uuidv4()}>
                Quill Editor
              </Link>
            </div>
          </motion.div>
        )}

        {/* Menu */}
        {isMenu && (
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed top-0 left-0 bg-opacity-90 w-full h-screen bg-white drop-shadow-md flex flex-col z-[101] overflow-y-scroll scrollbar-hide"
          >
            <div className="w-full flex items-center justify-between p-4 cursor-pointer">
              <div></div>
              <motion.div whileTap={{ scale: 0.75 }}>
                <div className="ml-8">
                  <Logo />
                </div>
              </motion.div>

              <motion.p
                whileTap={{ scale: 0.75 }}
                className="flex items-center gap-2 p-1 px-2 my-2 rounded-md cursor-pointer text-textColor text-base"
                onClick={() => setIsMenu(!isMenu)}
              >
                <AiFillCloseSquare className="text-2xl text-[#ff462e]" />
              </motion.p>
            </div>
            <div className="w-full flex flex-col justify-self-stretch items-center text- font-sans text-lg border-1 mt-[4%] text-offWhite">
              <div className="w-[75%] md:w-72 flex flex-col items-center justify-center gap-8">
                <input
                  type="text"
                  className="w-full mx-4 rounded-lg px-[4px] border-solid border-[1.5px] border-lightBlack text-lightBlack flex md:hidden items-center justify-between"
                  placeholder="Search"
                />
                <div className={`${isAuthenticated ? "hidden" : "visible"
                  } flex md:hidden items-center justify-between h-10 w-full `}>
                  <button
                    onClick={() => {
                      setIsMenu(false);
                      navigate("/login");
                    }}
                    className="cursor-pointer border-2 border-[#ff462e] text-[#ff462e] w-[44%] h-10 rounded-md flex items-center justify-center"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMenu(false);
                      navigate("/register");
                    }}
                    className="cursor-pointer border-2 border-[#ff462e] text-[#ff462e] w-[44%] h-10 rounded-md flex items-center justify-center"
                  >
                    Sign Up
                  </button>
                </div>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                >
                  Trending
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Technology
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Business
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Philosophy
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Lifestyle
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Health
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                >
                  Opinion
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                >
                  Sports
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Cuisine
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md"
                  to="/"
                >
                  Travel
                </button>
                <button
                  onClick={() => {
                    setIsMenu(false);
                    navigate("/");
                  }}
                  className="cursor-pointer flex items-center justify-center h-10 w-full bg-[#ff462e] rounded-md mb-24"
                >
                  Humor
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile */}
        {isProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute top-14 right-2 w-[255px] flex items-center justify-center rounded-lg shadow-md bg-[#f2f1ee] p-4 flex-col"
          >
            <div
              className={`flex items-center justify-center py-4 border-gray-300 ${isAuthenticated ? "border-b-[1px] hidden" : ""
                }`}
            >
              <button
                onClick={Login}
                className="bg-[#ff462e] w-24 h-12 rounded-full mr-2 text-white font-sans text-2xl"
              >
                Login
              </button>
              <p>or</p>
              <button
                onClick={Register}
                className="border-2 border-black w-24 h-12 rounded-full ml-2 font-sans text-2xl"
              >
                Signup
              </button>
            </div>
            {isAuthenticated && (
              <>
                <div className="flex items-center justify-start pt-4">
                  <p className="font-bold">My Account</p>
                </div>
                <div className="flex items-center pt-4">
                  <Link className="cursor-pointer" to={"/profile"}>
                    Profile
                  </Link>
                </div>
                <Link
                  className="flex items-center pt-4 cursor-pointer"
                  to={"/settings"}
                >
                  <p>Settings</p>
                </Link>
                <div
                  onClick={Logout}
                  className="flex items-center pt-4 cursor-pointer"
                >
                  <p>Logout</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Navigation;
