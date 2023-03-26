import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
// import logo from './logo.svg';
// import './App.css';

const tableCustomStyles = {
  headRow: {
    style: {
      color: "#223336",
      backgroundColor: "#e7eef0",
    },
  },
};

const columns = [
  {
    name: "Ranking",
    selector: (row) => row.Ranking,
    // sortable: true,
  },
  {
    name: "Farm ID",
    selector: (row) => row.FarmID,
  },
  {
    name: "Solar Flare Tickets",
    selector: (row) => row.SolarFlareTicket,
  },
];

function App() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");

  const handleApiData = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/v1/SolarFlareTicket/ranking",
      // "http://168.138.141.170:8080/api/v1/SolarFlareTicket/ranking",
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6IjIwMjMtMDMtMjZUMDI6MDE6MDMuMzE4WiIsImlhdCI6MTY3OTc5NjA2M30.ACKLIwq_QdBffWPOp9o1VJuwj24B0lfDKjAwPiNCWjY",
        },
      }
    );
    // setLastUpdate(format(result.data.updatedAt, "YYYY-mm-dd"));
    setData(result.data.farms);
    const date = new Date(result.data.updatedAt);
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");

    setLastUpdate(formattedDate);
  };

  useEffect(() => {
    handleApiData();
  }, []);

  const filteredData = data.filter((item) =>
    item.FarmID.toString().includes(filterText.toString())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center">
        <strong>🌻 Sunflower Land Rankings</strong>
      </h1>
      <h6 className="text-center">
        Made by: <strong>Victor Gianvechio</strong>
        <br />
        <br />
        <p>
          Feel free to donate:{" "}
          <strong>0x58E8bd6ddf3129f62D8fb09Db96A79e5C1E7754D</strong>
        </p>
      </h6>
      <br /> <br />
      <div className="text-center">
        <input
          placeholder="🔎 Farm ID"
          type="text"
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "row",
      //   textAlign: "center",
      //   alignItems: "center",
      // }}
      >
        <span>
          <h6 className="text-end">Last update: {lastUpdate}</h6>
        </span>
        <span>
          <h6 style={{ fontSize: "12px" }} className="text-end">
            Update occurs every 10 minutes
          </h6>
        </span>
        {/* <FontAwesomeIcon
          icon={faCircleInfo}
          title="Update occurs every 10 minutes"
        /> */}
      </div>
      <DataTable
        title="Solar Flare Ticket Ranking"
        columns={columns}
        data={filteredData}
        // selectableRows
        fixedHeader
        paginationRowsPerPageOptions={[15, 30, 60, 90]}
        paginationPerPage={15}
        pagination
        highlightOnHover
        striped
        customStyles={tableCustomStyles}
      ></DataTable>
    </div>
  );
}

export default App;
