const express = require("express");
const { Pool } = require("pg");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const loginQueries = require("./queries/loginQueries");
const mainQueries = require("./queries/mainQueries");
const adminQueries = require("./queries/adminQueries");
const jwt = require('jsonwebtoken');
const helmet = require('helmet');


require("dotenv").config();

const app = express();
const key = Math.random() * (10000000000 - 100000000) + 100000000;

const oneDay = 1000 * 60 * 60 * 24;
//################# General Settings ######################################################
// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());

// Session Configuration
app.use(
  session({
    secret: `${key}`,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);


app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Origin-Agent-Cluster', '?1');
  next();
});

app.get("/", (req, res) => {
  const dir = "public";
  res.sendFile(path.join(__dirname, dir, "index.html"));
});  
/* app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
}); */

app.get('/conditions', (req, res) => {
      res.send(`By using this application, you agree to the following terms regarding the use of cookies and the collection of your data:  This application uses cookies to store your login information. Cookies are small text files stored on your device that
          help us remember your login details for future sessions and provide a
          better user experience.
          We collect and use the data you provide,
          including but not limited to answers to exercises, for the following
          purposes: To create and analyze statistics related to user performance
          and engagement. To perform Learning Analytics to improve the
          educational content and overall user experience. To ensure the
          effective functioning of the application and provide personalized
          content.
         We are committed to protecting your personal
          data. The information collected will be used in accordance with our
          privacy policy and only for the purposes stated above.
         By continuing to use this application, you consent to
          the storage of cookies on your device and the collection and use of
          your data as described. 
        
          Once you have completed the course, all your data will be permanently deleted from our systems.
         
          If you have any questions or concerns
          regarding our use of cookies and data, please contact us. Thank you
          for your understanding and cooperation.`);
});


// Set trust proxy once for the entire application
app.set("trust proxy", "loopback");

//################# new ########################################################
// PostgreSQL pool setup
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
const pool2 = new Pool({
  user: process.env.PG_USER2,
  host: process.env.PG_HOST2,
  database: process.env.PG_DATABASE2,
  password: process.env.PG_PASSWORD2,
  port: process.env.PG_PORT2,
});
const pool3 = new Pool({
  user: process.env.PG_USER3,
  host: process.env.PG_HOST3,
  database: process.env.PG_DATABASE3,
  password: process.env.PG_PASSWORD3,
  port: process.env.PG_PORT3,
});
const pool4 = new Pool({
  user: process.env.PG_USER4,
  host: process.env.PG_HOST4,
  database: process.env.PG_DATABASE4,
  password: process.env.PG_PASSWORD4,
  port: process.env.PG_PORT4,
});
const pool5 = new Pool({
  user: process.env.PG_USER5,
  host: process.env.PG_HOST5,
  database: process.env.PG_DATABASE5,
  password: process.env.PG_PASSWORD5,
  port: process.env.PG_PORT5,
});
const pool6 = new Pool({
  user: process.env.PG_USER6,
  host: process.env.PG_HOST6,
  database: process.env.PG_DATABASE6,
  password: process.env.PG_PASSWORD6,
  port: process.env.PG_PORT6,
});

//################# Login and Logout ######################################################
const SECRET_KEY = process.env.SECRET_KEY;
// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const { loginQuery } = loginQueries;
    const { rows } = await pool.query(loginQuery, [username, password]);

    if (rows.length === 1) {
      const user = rows[0];
      const token = jwt.sign({ id: user.id, role: user.role, username: user.user_name }, SECRET_KEY, { expiresIn: '6h' });

      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).send("Wrong credentials");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Server error occurred");
  }
});

// Logout
app.get("/api/logout", (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.send("Logged out");
});


const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
// Check Auth Route
app.get('/api/check-auth', authenticateJWT, (req, res) => {
  
  res.json(req.user);
});
// protected route
app.get('/api/admin', authenticateJWT, (req, res) => {
  if (req.user.role === 'admin') {
    res.json({ message: 'Admin access granted' });
  } else {
    res.sendStatus(403);
  }
});




//################# Charts Data ######################################################


const executeQuery = async (query, params, res) => {
  try {
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error, res);
  }
};









//################# Main Data ######################################################




// GET /area-names
app.get("/api/area-names", async (req, res) => {
  await executeQuery(mainQueries.areaNamesQuery, [], res);
});






//POST getTasks
app.post("/api/getTasks", async (req, res) => {
  const { areaId } = req.body;

  // Ensure the username and databasetype parameters are provided
  if (!areaId) {
    return res.status(400).send("Missing areaId");
  }

  await executeQuery(
    mainQueries.getTasksQuery,
    [areaId],
    res
  );
});







//################# Admin ######################################################

// GET /getUsers
app.get("/api/getUsers", async (req, res) => {
  await executeQuery(adminQueries.getUsersQuery, [], res);
});
// GET /getExercises
app.get("/api/getexercises", async (req, res) => {
  await executeQuery(adminQueries.getAllExercisesQuery, [], res);
});
// GET /getUserTaskData
app.get("/api/getUserTaskData", async (req, res) => {
  await executeQuery(adminQueries.getAllUserTaskData, [], res);
});
// GET /getHistoryData
app.get("/api/getHistoryData", async (req, res) => {
  await executeQuery(adminQueries.getAllHistoryData, [], res);
});

// POST /delete-exercises
app.post("/api/delete-exercises", async (req, res) => {
  const { statement_id, area_id } = req.body;
  await executeQuery(
    adminQueries.deleteExerciseQuery,
    [statement_id, area_id],
    res
  );
});
// POST /add-exercise
app.post("/api/add-exercise", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.addExerciseQuery,
    [
      formValues.statement_id,
      formValues.area_id,
      formValues.statement_text,
      formValues.default_query,
      formValues.solution_query,
      formValues.topic,
      formValues.subtasknumber,
      formValues.maxtime,
      formValues.hint,
      formValues.tasknumber,
    ],
    res
  );
});
// POST /update-exercises
app.post("/api/update-exercises", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.updateExerciseQuery,
    [
      formValues.statement_text,
      formValues.solution_query,
      formValues.topic,
      formValues.subtasknumber,
      formValues.maxtime,
      formValues.hint,
      formValues.tasknumber,
      formValues.statement_id,
      formValues.area_id,
      formValues.default_query,
    ],
    res
  );
});


// POST /add-assignments
app.post("/api/add-assignment", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.addAssignmentQuery,
    [
      formValues.area_id,
      formValues.area_name,
      formValues.descr,
      formValues.link,
      formValues.endpoint,
      formValues.is_active,
    ],
    res
  );
});

// GET /get-assignments
app.get("/api/get-assignments", async (req, res) => {
  await executeQuery(adminQueries.getAllAssignmentsQuery, [], res);
});

// POST /update-assignment
app.post("/api/update-assignment", async (req, res) => {
  const { formValues } = req.body;
  await executeQuery(
    adminQueries.updateAssignmentQuery,
    [
      formValues.area_id,
      formValues.area_name,
      formValues.descr,
      formValues.link,
      formValues.endpoint,
      formValues.is_active,
      formValues.feedback_on,
    ],
    res
  );
});

// POST /delete-assignment
app.post("/api/delete-assignment", async (req, res) => {
  const { area_id } = req.body;
  await executeQuery(
    adminQueries.deleteAssignmentQuery,
    [ area_id],
    res
  );
});

// POST /delete-userdata
app.post("/api/delete-userdata", async (req, res) => {
  const { userdata } = req.body;
  await executeQuery(
    adminQueries.deleteUserDataQuery,
    [userdata.data_id],
    res
  );
});
// POST /delete-alluserdata
app.post("/api/delete-alluserdata", async (req, res) => {
  const { username } = req.body;
  await executeQuery(
    adminQueries.deleteAllUserDataQuery,
    [username],
    res
  );
});
// POST /delete-alluserdata
app.post("/api/delete-allhistorydata", async (req, res) => {
  const { username } = req.body;
  await executeQuery(
    adminQueries.deleteAllHistoryDataQuery,
    [username],
    res
  );
});

//POST /get-status
app.post("/api/get-status", async (req, res) => {
  const { areaId } = req.body;
  await executeQuery(
    adminQueries.getStatusQuery,
    [ areaId],
    res
  );
});

//POST /update-status
app.post("/api/update-status", async (req, res) => {
  const { areaId, checked } = req.body;
  await executeQuery(
    adminQueries.updateStatusQuery,
    [ areaId, checked],
    res
  );
});

//################# get DB's Structure ######################################################

// Queryfunction for the structure of the PostgreSQL-DB.
const { getPgStructureQuery } = mainQueries;

app.post("/api/getPostgreSQLStructure", async (req, res) => {
   const { endpoint } = req.body;
  try {
    const postgreSQL_query = () => (endpoint === "World" && pool2.query(getPgStructureQuery) || endpoint === "Movie" && pool3.query(getPgStructureQuery) || endpoint === "Euro" && pool4.query(getPgStructureQuery) || endpoint === "Teachers" && pool5.query(getPgStructureQuery) || endpoint === "Buses" && pool6.query(getPgStructureQuery) );
    let result = await executeQueryWithTimeout(postgreSQL_query, 50000);

    tables_set = new Set();
    for (let entry in result.rows) {
      tables_set.add(result.rows[entry].table_name);
    }
    tables = Array.from(tables_set);

    columns = [];
    for (let table in tables) {
      columns.push([]);
    }
    for (let entry in result.rows) {
      let i = tables.indexOf(result.rows[entry].table_name);
      let temp_entry = result.rows[entry];
      columns[i].push({
        table_name: temp_entry.table_name,
        column_name: temp_entry.column_name,
        data_type:
          temp_entry.udt_name +
          (temp_entry.character_maximum_length != null
            ? "(" + temp_entry.character_maximum_length + ")"
            : ""),
        foreign_column_name:
          temp_entry.foreign_table_name != null
            ? temp_entry.foreign_table_name +
              "." +
              temp_entry.foreign_column_name
            : " ",
      });
    }

    res.json({ tables: tables, columns: columns });
  } catch {
    console.log("Error in /getPostgreSQLStructure.");
  }
});
app.set("trust proxy", "loopback");
 





//################# Query Execution ######################################################
//################# Timeout Function ######################################################
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
// Execute SQL queries
// check if query is equal to the expected solution
app.post("/api/execute-sql", async (req, res) => {
  const { endpoint, execQuery, taskNumber, taskAreaId } = req.body;

  try {
    // Execute user's SQL query
    let userQueryResult = [{}];
    if (!execQuery.includes("private") && !execQuery.includes("tool")) {
      
            userQueryResult = await executeQueryWithTimeout(
          () => (endpoint === "World" && pool2.query(execQuery) || endpoint === "Movie" && pool3.query(execQuery) || endpoint === "Euro" && pool4.query(execQuery) || endpoint === "Teachers" && pool5.query(execQuery) || endpoint === "Buses" && pool6.query(execQuery)),
          50000);
        
    

      
      try {
        // Check if the user's query matches the expected solution
        const { getSolutionQuery } = mainQueries;
        const expectedSolutionResult = await executeQueryWithTimeout(
          () => pool.query(getSolutionQuery, [taskNumber, taskAreaId]),
          50000
        );
        const solution = await executeQueryWithTimeout(
          () => pool2.query(expectedSolutionResult.rows[0].solution_query),
          50000
        );
        // Send both results to the client
        res.json({
          userQueryResult: userQueryResult.rows,
          expectedResult: solution.rows,
        });
      } catch (error) {
        res.json({
          userQueryResult: userQueryResult.rows,
          expectedResult: "no solution",
        });
      }
    } else {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




//################# student projects SS24 ######################################################
//################# project 4 SS24 ######################################################
// Example route to get data from the database
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tool.user_task_data');
    res.json(result.rows); // Send fetched data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});

// Route to get task-related data
app.post('/api/task_data', async (req, res) => {
  const {selectedTaskAreaId} = req.body;
  try {
    const result_task_data = await pool.query('SELECT * FROM tool.task_statements where area_id = $1 order by statement_id', [selectedTaskAreaId]);
    res.json(result_task_data.rows); // Send fetched task data as JSON response
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});

// Route to get user-related data
app.get('/api/user_data', async (req, res) => {
  try {
    const result_user_data = await pool.query('SELECT distinct username FROM tool.user_task_data');
    res.json(result_user_data.rows); // Send fetched user data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});

// Route to get area-related data
app.get('/api/area_data', async (req, res) => {
  try {
    const result_area_data = await pool.query('SELECT * FROM tool.task_areas');
    res.json(result_area_data.rows); // Send fetched area data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); // Send 500 status on error
  }
});
//################# project 5 SS24 ######################################################
// Route to get data from the database
app.get('/api/get-data', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM private.users');
      term_res = res.json(result.rows);
      //console.log(term_res);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Route to create a new user
app.post('/api/add-user', async (req, res) => {
  //console.log("add-user", req.body)
  try {
      const { user_name, password, role } = req.body;
      //console.log(req.body);
      const newUser = await pool.query(
          'INSERT INTO private.users (user_name, password, role) VALUES ($1, $2, $3) RETURNING *',
          [user_name, password, role]
      );
      res.status(201).json(newUser.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Route to update an existing user
app.put('/api/update-user', async (req, res) => {
 // console.log("update-user", req.body)
  try {
      const { user_name, password, role } = req.body;
      const userCheck = await pool.query('SELECT * FROM private.users WHERE user_name = $1', [user_name]);

      if (userCheck.rows.length === 0) {
          return res.status(404).send('User not found');
      }

      const updatedUser = await pool.query(
          'UPDATE private.users SET password = $2, role = $3 WHERE user_name = $1 RETURNING *',
          [user_name, password, role]
      );
      res.status(200).json(updatedUser.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// Route to get user by username
app.get('/api/get-user-by-username/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = 'SELECT * FROM private.users WHERE user_name = $1';
      const result = await pool.query(query, [username]);

      if (result.rows.length > 0) {
          res.json(result.rows[0]); // return user found
      } else {
          res.json(null); // returns null if no user found
      }
  } catch (error) {
      console.error('Error fetching user by username:', error);
      res.status(500).send('Server Error');
  }
});

// Route to delete a user by its username
app.delete('/api/delete-user/:username', async (req, res) => {
  const { username } = req.params;

  try {
      const query = 'DELETE FROM private.users WHERE user_name = $1';
      await pool.query(query, [username]);

      res.json({ message: 'Benutzer erfolgreich gelöscht' });
  } catch (error) {
      console.error('Fehler beim Löschen des Benutzers:', error);
      res.status(500).send('Serverfehler');
  }
});



//################# tests ######################################################





//################# start server ######################################################
app.listen(8000, '0.0.0.0', () => {
  console.log('Server running on port 8000');
});

