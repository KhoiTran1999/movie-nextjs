"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Trash = () => {
  const [data, setData] = useState("");
  const text = "summarize spiderman: multi-verse with 100 words without breaks";
  useEffect(() => {
    axios(`http://localhost:3000/api/palmAi/search?text=${text}`).then(
      (res) => {
        setData(res.data);
        console.log(res.data);
      }
    );
  }, []);

  return <div>{data}</div>;
};

export default Trash;
