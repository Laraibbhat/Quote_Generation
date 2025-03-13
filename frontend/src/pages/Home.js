import React, { useEffect, useState } from "react";
import QuoteList from "../components/QuoteList";

const Home = () => {
  const [user, setUser] = useState(null);
  const getData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      fetch(url, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("The Data is", data);
          setUser(data);
        });
    } catch (error) {
      console.log("Error Fetching the user", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <QuoteList />
    </div>
  );
};

export default Home;
