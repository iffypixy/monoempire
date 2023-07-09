import express from "express";

export const app = express();

app.get("/", (req, res) => {
    const response = "Wie geht's? :) ??? :)";

    res.send(response);
});
