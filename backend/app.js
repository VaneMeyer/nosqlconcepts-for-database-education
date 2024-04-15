const express = require("express");
const { Pool } = require("pg");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();

const app = express();
const key = Math.random() * (10000000000 - 100000000) + 100000000;

const oneDay = 1000 * 60 * 60 * 24;

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//
// Session Configuration
app.use(
  session({
    secret: `${key}`,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// Set trust proxy once for the entire application
app.set("trust proxy", "loopback");

// Function for timeout when executing database queries
const executeQueryWithTimeout = (queryFunction, timeout) => {
  return new Promise((resolve, reject) => {
    const queryPromise = queryFunction();

    const timeoutId = setTimeout(() => {
      reject(new Error("Query execution timeout"));
    }, timeout);

    queryPromise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};

// PostgreSQL connections
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

app.get("/", (req, res) => {
  const dir = "public";
  res.sendFile(path.join(__dirname, dir, "index.html"));
});

// Execute SQL queries


app.post("/api/execute-sql", async (req, res) => {
  const { execQuery } = req.body;

  try {
    // Execute user's SQL query
    const userQueryResult = await executeQueryWithTimeout(
      () => pool.query(execQuery),
      50000
    );


    res.json({
      userQueryResult: userQueryResult.rows,
   
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


//start server
app.listen(
    8000,
    () => {
      console.log(`App is running on port ${8000} for PostgreSQL`);
    }
);
