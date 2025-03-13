import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Grow } from "@mui/material";

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]); // Initialize as empty array

  const fetchData = () => {
    setQuotes(null);
    fetch("http://localhost:8080/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setQuotes(data);
      })
      .catch((err) => {
        console.log("The Error is ", err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {quotes && quotes.length > 0 ? (
        quotes.map((quote, index) => (
          <Grid item key={quote.id} xs={12} sm={6} md={4}>
            <Grow in={true} timeout={index * 500}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontStyle: "italic" }}
                  >
                    "{quote.text}"
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    align="right"
                  >
                    - {quote.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Loading...
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default QuoteList;
