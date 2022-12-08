import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Register(props) {
  const [user, setUser] = useState({
    email: "",
    name: "",
    surname: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    role: "Agent",
  });

  const roleOptions = ["Agent", "Customer"];

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const history = useHistory();

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/users/register", user)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        props.setUser(data.user);

        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        className="full-page register-page section-image"
        data-color="orange"
        data-image="../../assets/img/bg5.jpg"
      >
        <div className="content">
          <div className="container">
            <div className="card card-register card-plain text-center">
              <div className="card-header ">
                <div className="row  justify-content-center">
                  <div className="col-md-8">
                    <div className="header-text">
                      <h2 className="card-title">
                        Light Bootstrap Dashboard PRO
                      </h2>
                      <h4 className="card-subtitle">
                        Register for free and experience the dashboard today
                      </h4>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body ">
                <div className="row">
                  <div className="col-md-5 ml-auto">
                    <div className="media">
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-circle-09"></i>
                        </div>
                      </div>
                      <div className="media-body">
                        <h4>Free Account</h4>
                        <p>
                          Here you can write a feature description for your
                          dashboard, let the users know what is the value that
                          you give them.
                        </p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-preferences-circle-rotate"></i>
                        </div>
                      </div>
                      <div className="media-body">
                        <h4>Awesome Performances</h4>
                        <p>
                          Here you can write a feature description for your
                          dashboard, let the users know what is the value that
                          you give them.
                        </p>
                      </div>
                    </div>
                    <div className="media">
                      <div className="media-left">
                        <div className="icon">
                          <i className="nc-icon nc-planet"></i>
                        </div>
                      </div>
                      <div className="media-body">
                        <h4>Global Support</h4>
                        <p>
                          Here you can write a feature description for your
                          dashboard, let the users know what is the value that
                          you give them.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mr-auto">
                    <div>
                      <div className="card card-plain">
                        <div className="content">
                          <div className="form-group">
                            <input
                              id="email"
                              onChange={handleChange}
                              type="email"
                              placeholder="Your Email"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="name"
                              onChange={handleChange}
                              type="text"
                              placeholder="Your First Name"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="surname"
                              onChange={handleChange}
                              type="text"
                              placeholder="Your First Name"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="dateOfBirth"
                              onChange={handleChange}
                              type="date"
                              placeholder="Enter Date of Birth"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="phoneNumber"
                              onChange={handleChange}
                              type="text"
                              placeholder="Your Phone Number"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <input
                              id="password"
                              onChange={handleChange}
                              type="password"
                              placeholder="Password"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <select onChange={handleChange} id="role">
                              <option value="Select an option" disabled>
                                Select an option
                              </option>
                              {roleOptions.map((value, index) => (
                                <option value={value} key={index}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="footer text-center">
                          <button
                            type="submit"
                            onClick={register}
                            className="btn btn-fill btn-neutral btn-wd"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
