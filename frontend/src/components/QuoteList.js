import React from "react";
import { Card, CardContent, Typography, Grid, Grow } from "@mui/material";

const quotes = [
  {
    id: 1,
    text: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    id: 2,
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    id: 3,
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    id: 4,
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
  },
  {
    id: 5,
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    id: 6,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
];

const QuoteList = () => {
  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {quotes.map((quote, index) => (
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
      ))}
    </Grid>
  );
};

export default QuoteList;
