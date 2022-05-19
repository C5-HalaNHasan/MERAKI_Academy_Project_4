const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Import Routers
const usersRouter=require("./routes/users");
const itemsRouter=require("./routes/items");
const categoryRouter=require("./routes/category");
const rolesRouter=require("./routes/roles");
const cartRouter=require("./routes/cart"); //! to be delted/not used





// Routes Middleware
app.use("/users",usersRouter);
app.use("/items",itemsRouter);
app.use("/category",categoryRouter);
app.use("/roles",rolesRouter);
app.use("/cart",cartRouter); //! to be delted/not used


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
