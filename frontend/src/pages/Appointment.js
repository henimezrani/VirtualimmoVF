import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Appointment(props) {
  const [visit, setVisit] = useState({
    date: null,
    customer: "",
    agent: "",
  });
  const [agentOptions, setAgentOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3002/users/verify", { token })
        .then(({ data }) => {
          props.setUser(data);
          setIsLoading(false);
          return data;
        })
        .then((user) => {
          axios
            .get("http://localhost:3002/users")
            .then(({ data }) => {
              const agents = data.filter((elem) => elem.role === "Agent");
              setAgentOptions(agents);
              setVisit({
                ...visit,
                agent: agents[0]._id,
                customer: user._id,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  if (!props.user.name) {
    return <Redirect to="/login" />;
  }

  const handleChange = (e) => {
    setVisit({ ...visit, [e.target.id]: e.target.value });
  };

  const createAppointment = () => {
    axios
      .post("http://localhost:3002/visits", visit)
      .then(() => {
        console.log("created");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <h3>
            Hello {props.user.name} {props.user.surname}, Add a new appointment
            here
          </h3>
        </div>
        <div className="row">
          <div>
            <div className="content">
              <div className="card card-plain">
                <div className="form-group">
                  <input
                    id="date"
                    onChange={handleChange}
                    type="date"
                    placeholder="Enter Appointment date"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <select onChange={handleChange} id="agent">
                    <option value="Select an option" disabled>
                      Select an agent
                    </option>
                    {agentOptions.map((value, index) => (
                      <option value={value._id} key={index}>
                        {value.name} {value.surname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="footer text-center">
                <button
                  type="submit"
                  onClick={createAppointment}
                  className="btn btn-fill btn-neutral btn-wd"
                >
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
