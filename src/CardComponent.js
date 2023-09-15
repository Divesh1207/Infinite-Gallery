import React, { useState, useEffect } from "react";
import { Card, Button, Space } from "antd";

const CardComponent = ({ url, key }) => {
  const [loading, setLoading] = useState(false);
  const [photos, setphotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);

  }
  return (
<div className="stick">
    <div className="top">
      <Space style={{ marginBottom: 16, marginTop: 10 }}>

        <input
          type="text"
          placeholder="Search Images"
          value={query}
          style={{
            width: '400px'
          }}

          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />


        <Button type="primary" onClick={handleSubmit}>

          Search
        </Button>

      </Space>
      </div>


      <div className="row">
        {url.map((url, key) => (
          <div key={key} className="col-md-4">

            {
              <img src={url.urls.regular}
                alt="Image"
              //   style={{ height: "250px", objectFit: "cover" }}
              />
            }

          </div>
        ))}
      </div>
    </div>
  )
}

export default CardComponent
