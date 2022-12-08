import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Dashboard(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3002/users/verify", { token })
        .then(({ data }) => {
          props.setUser(data);
          setIsLoading(false);
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

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <h3>
            Hello {props.user.name} {props.user.surname}
          </h3>
        </div>
        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <h4 className="card-title">150GB</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />
                <div className="stats">
                  <i className="fa fa-refresh"></i> Update Now
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <h4 className="card-title">$ 1,345</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar-o"></i> Last day
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <h4 className="card-title">23</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />
                <div className="stats">
                  <i className="fa fa-clock-o"></i> In the last hour
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="card card-stats">
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <h4 className="card-title">+45K</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <hr />
                <div className="stats">
                  <i className="fa fa-refresh"></i> Update now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
