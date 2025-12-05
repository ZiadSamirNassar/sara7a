import bootstrap from "./app.controller.js";
import express from "express";
import config from "../config/dev.config.js";

const app = express();
const port = config.PORT || 3000;

bootstrap(app, express);

app.listen(port, () => {
    console.log(`Server is running on " http://localhost:${port} "`);
});