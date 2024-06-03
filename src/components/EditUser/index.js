import { Component } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbSquareRoundedCheck } from "react-icons/tb";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import "./index.css";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userData.name,
      dob: props.userData.dob.split("-").reverse().join("-"),
      email: props.userData.email,
      number: props.userData.number,
      description: props.userData.description,
      isChangesTrue: false,
    };
  }

  checkChanges = () => {
    const { name, dob, email, number, description } = this.state;
    if (
      name !== this.props.userData.name ||
      dob !== this.props.userData.dob.split("-").reverse().join("-") ||
      email !== this.props.userData.email ||
      number !== this.props.userData.number ||
      description !== this.props.userData.description
    ) {
      this.setState({ isChangesTrue: true });
    } else {
      this.setState({ isChangesTrue: false });
    }
  };

  changeName = (e) => {
    this.setState(
      {
        name: e.target.value,
      },
      this.checkChanges
    );
  };

  DateOFBirthBtn = (e) => {
    this.setState({ dob: e.target.value }, this.checkChanges);
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value }, this.checkChanges);
  };

  changeNumber = (e) => {
    this.setState({ country: e.target.value }, this.checkChanges);
  };

  changeDescription = (e) => {
    this.setState({ description: e.target.value }, this.checkChanges);
  };

  clickSaveBtn = async () => {
    const { name, dob, email, number, description, isChangesTrue } = this.state;
    const { id } = this.props.userData;
    const {
      getUpdateInfoBtn,
      changeActiveAndInActivebtn,
      setUpdateTabTrueAndFalseBtn,
    } = this.props;

    const updatedObject = {
      id,
      name,
      dob,
      email,
      number,
      description,
    };
    if (isChangesTrue) {
      const response = await fetch(
        "https://backend-assignment-of-marbles-health.onrender.com/updateuser",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedObject),
        }
      );
      if (response.ok) {
        getUpdateInfoBtn(updatedObject);
        changeActiveAndInActivebtn();
        setUpdateTabTrueAndFalseBtn();
      }
    }
  };

  clickCancelBtn = () => {
    const { changeActiveAndInActivebtn, setUpdateTabTrueAndFalseBtn } =
      this.props;
    changeActiveAndInActivebtn();
    setUpdateTabTrueAndFalseBtn();
  };

  render() {
    const { name, dob, email, number, description, isChangesTrue } = this.state;
    const { ClickArrow, isCollapseTrue } = this.props;
    return (
      <li className="list-of-user">
        <div className="collapse-and-profile-container">
          <div className="profile-container">
            <div className="profile">
              <p>{name.length !== 0 && name[0].toUpperCase()}</p>
            </div>
            <input
              type="text"
              className="profile-name-input"
              value={name}
              onChange={this.changeName}
            />
          </div>
          {isCollapseTrue ? (
            <IoIosArrowUp
              className="collapse-icon"
              onClick={() => ClickArrow()}
            />
          ) : (
            <IoIosArrowDown
              className="collapse-icon"
              onClick={() => ClickArrow()}
            />
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
              <input
                type="date"
                className="value-text-input"
                value={dob}
                onChange={this.DateOFBirthBtn}
              />
            </div>

            <div className="">
              <p className="label-text">Email</p>
              <input
                type="email"
                className="value-text-input"
                value={email}
                onChange={this.changeEmail}
              />
            </div>

            <div className="">
              <p className="label-text">Number</p>
              <input
                type="number"
                className="value-text-input"
                value={number}
                onChange={this.changeNumber}
              />
            </div>
          </div>

          <p className="label-text">Description</p>
          <p className="value-text"></p>
          <textarea
            className="text-area"
            value={description}
            onChange={this.changeDescription}
          ></textarea>

          <div className="edit-and-delete-container">
            <IoMdCloseCircleOutline
              className="delete-icon"
              onClick={this.clickCancelBtn}
            />
            <TbSquareRoundedCheck
              className={`done-icon ${isChangesTrue && "active"}`}
              onClick={this.clickSaveBtn}
            />
          </div>
        </div>
      </li>
    );
  }
}

export default EditUser;
