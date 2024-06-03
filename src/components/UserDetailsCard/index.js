import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./index.css";
import EditUser from "../EditUser";

const UserDetailsCard = (props) => {
  const {
    getUpdateInfoBtn,
    isDeleteAndEditTabActive,
    changeActiveAndInActivebtn,
    getDeleteInfoBtn,
    userData,
  } = props;
  const { id, name, dob, email, number, description } = userData;

  const [isCollapseTrue, setIsCollapseTrue] = useState(false);
  const [isDeleteTrue, setIsDeleteTrue] = useState(false);
  const [isUpdateTrue, setIsUpdateTrue] = useState(false);

  const ClickArrow = () => {
    setIsCollapseTrue((privews) => !privews);
  };

  const clickDeleteIcon = () => {
    if (!isDeleteAndEditTabActive) {
      setIsDeleteTrue(true);
      changeActiveAndInActivebtn();
    }
  };

  const cancelDeleteBtn = () => {
    setIsDeleteTrue(false);
    changeActiveAndInActivebtn();
  };

  const confirmDeleteBtn = async () => {
    const response = await fetch(
      "https://backend-assignment-of-marbles-health.onrender.com/removeuser",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }
    );
    if (response.ok) {
      getDeleteInfoBtn(id);
      changeActiveAndInActivebtn();
    }
  };

  const setUpdateTabTrueAndFalseBtn = () => {
    setIsUpdateTrue((privews) => !privews);
  };

  const clickUpdateIconBtn = () => {
    if (!isDeleteAndEditTabActive) {
      setUpdateTabTrueAndFalseBtn();
      changeActiveAndInActivebtn();
    }
  };

  return (
    <>
      {!isUpdateTrue ? (
        <li className="list-of-user">
          <div className="collapse-and-profile-container">
            <div className="profile-container">
              <div className="profile">
                <p>{name[0].toUpperCase()}</p>
              </div>
              <h1 className="profile-name">{name}</h1>
            </div>
            {isCollapseTrue ? (
              <IoIosArrowUp className="collapse-icon" onClick={ClickArrow} />
            ) : (
              <IoIosArrowDown className="collapse-icon" onClick={ClickArrow} />
            )}
          </div>
          <div
            className={`hiding-container ${
              isCollapseTrue && "display-container"
            }`}
          >
            <div className="age-gender-country-container">
              <div className="">
                <p className="label-text">Date OF Birth</p>
                <p className="value-text">{dob}</p>
              </div>

              <div className="">
                <p className="label-text">Email</p>
                <p className="value-text">{email}</p>
              </div>

              <div className="">
                <p className="label-text">Number</p>
                <p className="value-text">{number}</p>
              </div>
            </div>
            <p className="label-text">Description</p>
            <p className="value-text">{description}</p>
            <div className="edit-and-delete-container">
              <RiDeleteBin6Line
                className="delete-icon"
                onClick={clickDeleteIcon}
              />
              <MdModeEdit className="edit-icon" onClick={clickUpdateIconBtn} />
            </div>
          </div>
          {isDeleteTrue && (
            <div className="delete-popup">
              <div className="instruction-and-close-container">
                <p className="text-instruction">
                  Are you sure you want to delete?
                </p>
                <IoMdClose className="close-icon" onClick={cancelDeleteBtn} />
              </div>
              <div className="cancel-and-delete-container">
                <button className="cancel-btn" onClick={cancelDeleteBtn}>
                  Cancel
                </button>
                <button className="Edit-btn" onClick={confirmDeleteBtn}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ) : (
        <EditUser
          getUpdateInfoBtn={getUpdateInfoBtn}
          userData={userData}
          changeActiveAndInActivebtn={changeActiveAndInActivebtn}
          ClickArrow={ClickArrow}
          isCollapseTrue={isCollapseTrue}
          setUpdateTabTrueAndFalseBtn={setUpdateTabTrueAndFalseBtn}
        />
      )}
    </>
  );
};

export default UserDetailsCard;
