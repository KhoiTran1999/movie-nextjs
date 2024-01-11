"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Trash = () => {
  const [data, setData] = useState("");
  const text = `summarize movie "spiderman: multi-verse" within 50 words without breaks`;
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(
          `${window.origin}/api/palmAi/search?text=${text}`
        );
        if (!res.ok || !res.body) {
          throw res.statusText;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const decodedChunk = decoder.decode(value, { stream: true });
          setData((pre) => `${pre}${decodedChunk}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  return <div>{data}</div>;
};

export default Trash;
