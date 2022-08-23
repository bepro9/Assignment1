import express, { application } from "express";
import router from "./routes";

const app = express();
const port: number = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`=================================`);
  console.log(`🚀 App listening on the port 3000`);
  console.log(`=================================`);
});
