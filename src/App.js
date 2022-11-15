import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Loading from "./component/Loading";

function App() {
  const [activtyData, setActivityData] = useState([]);
  const [loading, setloading] = useState(false);
  const [city, setCity] = useState([]);
  const [choose, setChoose] = useState("");
  const [choosenData, setChoosenData] = useState([]);

  const fetchActivity = async () => {
    setloading(true);
    const res = await axios.get(process.env.REACT_APP_API);
    const { data } = res;
    setActivityData(data);
    setloading(false);
  };

  useEffect(() => {
    fetchActivity();
  }, []);
  useEffect(() => {
    // ^([^\s]*)\s
    const filteredData = activtyData.map((item) => {
      let indexOfEmpty = item.address.indexOf(" ");
      return item.address.slice(0, indexOfEmpty);
    });
    const removeDuplicateCity = [...new Set(filteredData)];
    setCity(removeDuplicateCity);
  }, [activtyData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredDatas = activtyData.filter((item) => {
      let indexOfEmpty = item.address.indexOf(" ");
      if (item.address.slice(0, indexOfEmpty) !== choose) {
        return null;
      }
      return item;
    });
    setChoosenData(filteredDatas);
  };
  const handleChange = (e) => {
    setChoose(e.target.value);
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minWidth: "450px",
      }}
    >
      {loading && <Loading />}
      <div
        className="scrool"
        style={{
          marginTop: "1rem",
          maxWidth: "450px",
          height: "400px",
          overflowX: "hidden",
          overflowY: "scroll",
          padding: "0 1rem",
        }}
      >
        <div style={{ marginBottom: "1rem" ,display:loading ? 'none': 'block' }}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <label htmlFor="cities">Şehir Seç :</label>

              <select
                id="cities"
                onChange={handleChange}
                style={{ width: "40%" }}
              >
                {city.map((item, idx) => {
                  return (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>

              <button className="button-30" type="submit">
                Gönder
              </button>
            </div>
          </form>
        </div>
        {choosenData.length <= 0
          ? activtyData?.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    width: "400px",
                    minWidth: "400px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ padding: "5px", textAlign: "center" }}>
                    <span>{item.scene}</span>
                    <h1>{item.name}</h1>
                    <p>{item.address}</p>
                    <p>{item.time}</p>
                  </div>
                </div>
              );
            })
          : choosenData?.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    width: "400px",
                    minWidth: "400px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ padding: "5px", textAlign: "center" }}>
                    <span>{item.scene}</span>
                    <h1>{item.name}</h1>
                    <p>{item.address}</p>
                    <p>{item.time}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
