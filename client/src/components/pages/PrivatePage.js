import { useEffect, useState } from "react";

export const PrivatePage = () => {
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        await fetch("http://localhost:5000/api/private", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw Error("deneme");
            }
            return res.json();
          })
          .then((data) => setPrivateData(data.data));
      } catch (error) {
        localStorage.removeItem("authToken");
      }
    };
    fetchPrivateData();
  }, []);

  return <div>{privateData}</div>;
};
