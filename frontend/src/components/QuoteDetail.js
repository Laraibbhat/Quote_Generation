import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";

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
];

const QuoteDetail = () => {
  const { id } = useParams();
  const quote = quotes.find((q) => q.id === parseInt(id));

  if (!quote) {
    return <Typography variant="h6">Quote not found!</Typography>;
  }

  return (
    <Container sx={{ p: 4, textAlign: "center" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontStyle: "italic", fontWeight: "bold" }}
      >
        "{quote.text}"
      </Typography>
      <Typography variant="h5" color="text.secondary">
        - {quote.author}
      </Typography>
    </Container>
  );
};

export default QuoteDetail;
