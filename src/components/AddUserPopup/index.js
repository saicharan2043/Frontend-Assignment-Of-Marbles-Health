import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

class AddUserPopup extends Component {
  state = {
    name: "",
    description: "",
    email: "",
    mobileno: "",
    dateOfBirth: "",
    error: "",
  };

  changeName = (e) => {
    this.setState({ name: e.target.value, error: "" });
  };

  changeDescription = (e) => {
    this.setState({ description: e.target.value, error: "" });
  };

  changeEmail = (e) => {
    this.setState({ email: e.target.value, error: "" });
  };

  changeMobileNO = (e) => {
    this.setState({ mobileno: e.target.value, error: "" });
  };

  changeDateOfBirth = (e) => {
    this.setState({ dateOfBirth: e.target.value, error: "" });
  };

  cancelBtnOfPopUpBtn = () => {
    const { ActiveAndInActiveOfAddUSerPopupBtn } = this.props;
    ActiveAndInActiveOfAddUSerPopupBtn();
  };

  AddUserPopUpBtn = async (e) => {
    e.preventDefault();
    const { name, description, email, mobileno, dateOfBirth } = this.state;
    const { ActiveAndInActiveOfAddUSerPopupBtn, addNewUserBtn } = this.props;
    if (
      name !== "" &&
      description !== "" &&
      email !== "" &&
      mobileno !== "" &&
      dateOfBirth !== ""
    ) {
      const userDetails = {
        id: uuidv4(),
        name,
        description,
        email,
        mobileno,
        dob: dateOfBirth,
      };
      const response = await fetch(
        "https://backend-assignment-of-marbles-health.onrender.com/adduser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userDetails),
        }
      );
      if (response.ok) {
        addNewUserBtn(userDetails);
        ActiveAndInActiveOfAddUSerPopupBtn();
      } else {
        this.setState({ error: "Something Went Wrong" });
      }
    } else {
      this.setState({ error: "Please Fill All Details" });
    }
  };

  render() {
    const { name, description, email, mobileno, dateOfBirth, error } =
      this.state;
    return (
      <div className="add-popup-container">
        <form className="form-of-popup" onSubmit={this.AddUserPopUpBtn}>
          <label className="label">Name</label>
          <input
            type="text"
            className="input"
            placeholder="Enter Your Name..."
            onChange={this.changeName}
            value={name}
          />
          <label className="label">Description</label>
          <textarea
            className="text-area-of-add"
            onChange={this.changeDescription}
            value={description}
            placeholder="Enter Description..."
          ></textarea>
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter Your Email.."
            onChange={this.changeEmail}
            value={email}
          />
          <div className="number-and-dob-super-container">
            <div className="sub-container-of-number-and-dob">
              <label className="label">Mobile No</label>
              <input
                type="number"
                className="mobile-dateofbirth-input"
                placeholder="Enter Your Phone Number..."
                onChange={this.changeMobileNO}
                value={mobileno}
              />
            </div>
            <div className="sub-container-of-number-and-dob">
              <label className="label">Date Of Birth</label>
              <input
                type="date"
                className="mobile-dateofbirth-input"
                onChange={this.changeDateOfBirth}
                value={dateOfBirth}
              />
            </div>
          </div>
          <div className="container-of-cancel-and-add">
            <button
              className="cancel-btn-of-popup"
              onClick={this.cancelBtnOfPopUpBtn}
            >
              Cancel
            </button>
            <button className="add-btn-of-popup" type="submit">
              Add
            </button>
          </div>
          <p className="error-text">{error}</p>
        </form>
      </div>
    );
  }
}

export default AddUserPopup;
