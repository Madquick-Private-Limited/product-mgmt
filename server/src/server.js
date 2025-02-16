import { ConnectDB } from "../config/database.js";
import { app } from "./app.js";
import dotenv from "dotenv"
dotenv.config();
const port =  process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
    app.get('/', (req, res) => {
    res.send('Hello, JS Backend!');
    });
}

app.listen(port, () => {
    ConnectDB();
    console.log(`Server is listening on port ${port}`);
})



