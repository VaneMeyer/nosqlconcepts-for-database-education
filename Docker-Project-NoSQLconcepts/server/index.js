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
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const axios = require("axios");
const XLSX = require("xlsx");
const fs = require("fs");

require("dotenv").config();

const app = express();
const key = Math.random() * (10000000000 - 100000000) + 100000000;

const sqlQueryDistance = require("./evaluation-tool/sql-query-distance/dist/index");

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
  }),
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

app.get("/", (req, res) => {
  const dir = "public";
  res.sendFile(path.join(__dirname, dir, "index.html"));
});
/* app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
}); */

app.get("/conditions", (req, res) => {
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
          the storage of cookies on your device and the collection and use
          of your data as described.

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
      const token = jwt.sign(
        { id: user.id, role: user.role, username: user.user_name },
        SECRET_KEY,
        { expiresIn: "6h" },
      );

      res.cookie("token", token, { httpOnly: true });
      res.json({ message: "Login successful" });
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
  res.cookie("token", "", { expires: new Date(0) });
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
app.get("/api/check-auth", authenticateJWT, (req, res) => {
  res.json(req.user);
});
// protected route
app.get("/api/admin", authenticateJWT, (req, res) => {
  if (req.user.role === "admin") {
    res.json({ message: "Admin access granted" });
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
    console.error("Index.js executeQuery failed:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
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

  await executeQuery(mainQueries.getTasksQuery, [areaId], res);
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
    res,
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
      formValues.maxsql_points,
    ],
    res,
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
      formValues.maxsql_points,
      formValues.statement_id,
      formValues.area_id,
      formValues.default_query,
    ],
    res,
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
    res,
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
    res,
  );
});

// POST /delete-assignment
app.post("/api/delete-assignment", async (req, res) => {
  const { area_id } = req.body;
  await executeQuery(adminQueries.deleteAssignmentQuery, [area_id], res);
});

// POST /delete-userdata
app.post("/api/delete-userdata", async (req, res) => {
  const { userdata } = req.body;
  await executeQuery(adminQueries.deleteUserDataQuery, [userdata.data_id], res);
});
// POST /delete-alluserdata
app.post("/api/delete-alluserdata", async (req, res) => {
  const { username } = req.body;
  await executeQuery(adminQueries.deleteAllUserDataQuery, [username], res);
});
// POST /delete-alluserdata
app.post("/api/delete-allhistorydata", async (req, res) => {
  const { username } = req.body;
  await executeQuery(adminQueries.deleteAllHistoryDataQuery, [username], res);
});

//POST /get-status
app.post("/api/get-status", async (req, res) => {
  const { areaId } = req.body;
  await executeQuery(adminQueries.getStatusQuery, [areaId], res);
});

//POST /update-status
app.post("/api/update-status", async (req, res) => {
  const { areaId, checked } = req.body;
  await executeQuery(adminQueries.updateStatusQuery, [areaId, checked], res);
});

//################# get DB's Structure ######################################################

// Queryfunction for the structure of the PostgreSQL-DB.
const { getPgStructureQuery } = mainQueries;

app.post("/api/getPostgreSQLStructure", async (req, res) => {
  const { endpoint } = req.body;
  try {
    const postgreSQL_query = () =>
      (endpoint === "World" && pool2.query(getPgStructureQuery)) ||
      (endpoint === "Movie" && pool3.query(getPgStructureQuery)) ||
      (endpoint === "Euro" && pool4.query(getPgStructureQuery)) ||
      (endpoint === "Teachers" && pool5.query(getPgStructureQuery)) ||
      (endpoint === "Buses" && pool6.query(getPgStructureQuery));
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
  const {
    endpoint,
    execQuery,
    taskNumber,
    taskAreaId,
    maxPoints_SQL,
    feedback_on,
  } = req.body;

  const isFeedbackOn =
    feedback_on === true ||
    feedback_on === "true" ||
    feedback_on === 1 ||
    feedback_on === "1";

  try {
    // Execute user's SQL query
    let userQueryResult = [{}];
    let queryFeedback_new = "";
    let queryFeedback = "";
    if (!execQuery.includes("private") && !execQuery.includes("tool")) {
      userQueryResult = await executeQueryWithTimeout(
        () =>
          (endpoint === "World" && pool2.query(execQuery)) ||
          (endpoint === "Movie" && pool3.query(execQuery)) ||
          (endpoint === "Euro" && pool4.query(execQuery)) ||
          (endpoint === "Teachers" && pool5.query(execQuery)) ||
          (endpoint === "Buses" && pool6.query(execQuery)),
        50000,
      );

      try {
        // Check if the user's query matches the expected solution
        const { getSolutionQuery } = mainQueries;
        const expectedSolutionResult = await executeQueryWithTimeout(
          () => pool.query(getSolutionQuery, [taskNumber, taskAreaId]),
          50000,
        );

        // ######### START: SQL Query Distance ##################

        // check if no solution is stored for the exercise
        if (
          !expectedSolutionResult ||
          !expectedSolutionResult.rows ||
          expectedSolutionResult.rows.length === 0 ||
          !expectedSolutionResult.rows[0].solution_query
        ) {
          console.log("No expected solution found.");
          userQueryResult = await executeQueryWithTimeout(
            () => pool.query(execQuery),
            50000,
          );
          console.log("userQueryResult:", userQueryResult.rows);
          res.json({
            userQueryResult: userQueryResult.rows,
            expectedResult: "no solution",
            queryFeedback: "",
            queryFeedback_new: "",
            userQuery: execQuery,
            solutionQuery: "",
          });
        } else {
          console.log("expectedSolutionResult is defined.");

          //console.log("----------------------------------------------");
          //console.log("Student Query (SQL):", execQuery);
          //console.log("Solution Query (SQL):", expectedSolutionResult.rows[0].solution_query);
          //console.log("----------------------------------------------");

          let distance, steps, path;
          // Reused configuration values (config_atomic, config_horizontal, config_shortcut, config)
          // from SQL-Query-Distance (https://github.com/FAU-CS6/sql-query-distance)
          // file: ./sql-query-distance/test.js
          // License: MIT
          const config_atomic = `
          setDistinct:2
          unsetDistinct:2
          addSelectElement:1
          removeSelectElement:1
          addSelectAsterisk:1
          removeSelectAsterisk:1
          setSelectAsteriskTable:1
          unsetSelectAsteriskTable:1
          addSelectColumnReference:1
          removeSelectColumnReference:1
          setSelectColumnReferenceTable:1
          unsetSelectColumnReferenceTable:1
          addSelectLiteral:1
          removeSelectLiteral:1
          addSelectNot:1
          removeSelectNot:1
          addSelectAggregationFunction:1
          removeSelectAggregationFunction:1
          setSelectAggregationFunctionDistinct:2
          unsetSelectAggregationFunctionDistinct:2
          addSelectBinaryExpression:1
          removeSelectBinaryExpression:1
          setSelectAlias:2
          unsetSelectAlias:1
          addFromElement:2
          removeFromElement:2
          setTableJoinType:1
          unsetTableJoinType:1
          addFromColumnReference:1
          removeFromColumnReference:1
          setFromColumnReferenceTable:1
          unsetFromColumnReferenceTable:1
          addFromLiteral:1
          removeFromLiteral:1
          addFromNot:1
          removeFromNot:1
          addFromBinaryExpression:1
          removeFromBinaryExpression:1
          setFromAlias:1
          unsetFromAlias:1
          addWhereColumnReference:1
          removeWhereColumnReference:1
          setWhereColumnReferenceTable:1
          unsetWhereColumnReferenceTable:1
          addWhereLiteral:1
          removeWhereLiteral:1
          addWhereNot:1
          removeWhereNot:1
          addWhereBinaryExpression:1
          removeWhereBinaryExpression:1
          addGroupbyElement:1
          removeGroupbyElement:2
          addGroupbyColumnReference:1
          removeGroupbyColumnReference:1
          setGroupbyColumnReferenceTable:1
          unsetGroupbyColumnReferenceTable:1
          addGroupbyLiteral:1
          removeGroupbyLiteral:1
          addGroupbyNot:1
          removeGroupbyNot:1
          addGroupbyBinaryExpression:1
          removeGroupbyBinaryExpression:1
          addHavingColumnReference:1
          removeHavingColumnReference:1
          setHavingColumnReferenceTable:1
          unsetHavingColumnReferenceTable:1
          addHavingLiteral:1
          removeHavingLiteral:1
          addHavingNot:1
          removeHavingbyNot:1
          addHavingAggregationFunction:1
          removeHavingAggregationFunction:1
          setHavingAggregationFunctionDistinct:2
          unsetHavingAggregationFunctionDistinct:2
          addHavingBinaryExpression:1
          removeHavingBinaryExpression:1
          addOrderbyElement:1
          removeOrderbyElement:1
          setOrderbyDescending:1
          unsetOrderbyDescending:1
          addOrderbyColumnReference:1
          removeOrderbyColumnReference:1
          setOrderbyColumnReferenceTable:1
          unsetOrderbyColumnReferenceTable:1
          addOrderbyLiteral:1
          removeOrderbyLiteral:1
          addOrderbyNot:1
          removeOrderbyNot:1
          addOrderbyAggregationFunction:1
          removeOrderbyAggregationFunction:1
          setOrderbyAggregationFunctionDistinct:2
          unsetOrderbyAggregationFunctionDistinct:2
          addOrderbyBinaryExpression:1
          removeOrderbyBinaryExpression:1
          `;
          const config_horizontal = `
          swapSelectElements:1
          changeSelectAsteriskTable:1
          changeSelectColumnReferenceColumn:1
          changeSelectColumnReferenceTable:1
          changeSelectLiteralValue:1
          changeSelectAggregationFunctionAggregation:1
          changeSelectBinaryExpressionOperator:1
          swapSelectBinaryExpressionArguments:0
          swapSelectBinaryExpressionNesting:0
          mirrorSelectBinaryExpressionInequation:0
          changeSelectAlias:2
          swapFromElements:0
          changeFromJoinType:1
          changeFromColumnReferenceColumn:1
          changeFromColumnReferenceTable:1
          changeFromLiteralValue:1
          changeFromBinaryExpressionOperator:1
          swapFromBinaryExpressionArguments:0
          swapFromBinaryExpressionNesting:0
          mirrorFromBinaryExpressionInequation:0
          changeFromAlias:2
          changeWhereColumnReferenceColumn:1
          changeWhereColumnReferenceTable:1
          changeWhereLiteralValue:1
          changeWhereBinaryExpressionOperator:1
          swapWhereBinaryExpressionArguments:0
          swapWhereBinaryExpressionNesting:0
          mirrorWhereBinaryExpressionInequation:0
          swapGroupbyElements:0
          changeGroupbyColumnReferenceColumn:1
          changeGroupbyColumnReferenceTable:1
          changeGroupbyLiteralValue:1
          changeGroupbyBinaryExpressionOperator:1
          swapGroupbyBinaryExpressionArguments:0
          swapGroupbyBinaryExpressionNesting:0
          mirrorGroupbyBinaryExpressionInequation:0
          changeHavingColumnReferenceColumn:1
          changeHavingColumnReferenceTable:1
          changeHavingLiteralValue:1
          changeHavingAggregationFunctionAggregation:1
          changeHavingBinaryExpressionOperator:1
          swapHavingBinaryExpressionArguments:0
          swapHavingBinaryExpressionNesting:0
          mirrorHavingBinaryExpressionInequation:0
          changeOrderbyElements:1
          changeOrderbyColumnReferenceColumn:1
          changeOrderbyColumnReferenceTable:1
          changeOrderbyLiteralValue:1
          changeOrderbyAggregationFunctionAggregation:1
          changeOrderbyBinaryExpressionOperator:1
          swapOrderbyBinaryExpressionArguments:0
          swapOrderbyBinaryExpressionNesting:0
          mirrorOrderbyBinaryExpressionInequation:0
          `;
          const config_shortcut = `
          applySelectTautologyLaw:0
          applySelectDoubleNegationLaw:0
          applySelectDistributiveLaw:0
          applySelectDeMorgan:0
          applySelectAbsorptionLaw:0
          applyFromTautologyLaw:0
          applyFromDoubleNegationLaw:0
          applyFromDistributiveLaw:0
          applyFromDeMorgan:0
          applyFromAbsorptionLaw:0
          applyWhereTautologyLaw:0
          applyWhereDoubleNegationLaw:0
          applyWhereDistributiveLaw:0
          applyWhereDeMorgan:0
          applyWhereAbsorptionLaw:0
          applyGroupbyTautologyLaw:0
          applyGroupbyDoubleNegationLaw:0
          applyGroupbyDistributiveLaw:0
          applyGroupbyDeMorgan:0
          applyGroupbyAbsorptionLaw:0
          applyHavingTautologyLaw:0
          applyHavingDoubleNegationLaw:0
          applyHavingDistributiveLaw:0
          applyHavingDeMorgan:0
          applyHavingAbsorptionLaw:0
          applyOrderbyTautologyLaw:0
          applyOrderbyDoubleNegationLaw:0
          applyOrderbyDistributiveLaw:0
          applyOrderbyDeMorgan:0
          applyOrderbyAbsorptionLaw:0
          moveInnerJoinConditionToWhere:0
          moveWhereToInnerJoinCondition:0
          expandAsterisk:0
          collapseAsterisk:0
          `;
          const config = config_atomic + config_horizontal + config_shortcut;

          // schema based on the database for the exercises
          /*const schema = `
          students ( _student_id_, first_name, last_name, degree_program, graduation_year )
          graduationCeremonies ( _ceremony_id_, date, location, note )
          invitations ( _invitation_id_, _student_id [Students]_, ceremony_id [GraduationCeremonies], rsvp )
          programItems ( _item_id_, ceremony_id [GraduationCeremonies], title, start_time, duration_minutes )
          sponsors ( _sponsor_id_, name, amount )
          `;*/

          // (SQLZoo) schema based on the database for the exercises
          const schema_buses = `
          stops ( _id_, name )
          route ( _num_, _company_, _pos_, stop [stops] )
          `;

          const schema_euro = `
          eteam ( _id_, teamname, coach )
          game ( _id_, mdate, stadium, team1 [eteam], team2 [eteam] )
          goal ( _matchid [game]_, teamid [eteam], player, _gtime_ )
          `;

          const schema_movie = `
          actor ( _id_, name )
          casting ( _movieid [movie]_, _actorid [actor]_, _ord_ )
          movie ( _id_, title, yr, director [actor], budget, gross )
          `;

          const schema_teachers = `
          teacher ( _id_, dept [dept], name, phone, mobile )
          dept ( _id_, name )
          `;

          const schema_world = `
          world ( _name_, continent, area, population, gdp, capital, tld, flag )
          `;

          const schemaByEndpoint = {
            World: schema_world,
            Movie: schema_movie,
            Euro: schema_euro,
            Teachers: schema_teachers,
            Buses: schema_buses,
          };

          const schema = schemaByEndpoint[endpoint];
          if (!schema) {
            return res
              .status(400)
              .json({ error: `Unknown endpoint for schema: ${endpoint}` });
          }


          if (isFeedbackOn) {
            try {
              console.log("calculating...");
              console.time("sql-distance");

              const DEFAULT_MAX_DISTANCE = 10;

              const parsedMaxDistance = Number(maxPoints_SQL);

              const effectiveMaxDistance =
                Number.isFinite(parsedMaxDistance) && parsedMaxDistance > 0
                  ? parsedMaxDistance
                  : DEFAULT_MAX_DISTANCE;

              console.log({
                maxDistance: effectiveMaxDistance,
                queryLength: execQuery?.length,
              });

              [distance, steps, path] = await Promise.race([
                sqlQueryDistance.parseAndCalculateDistance(
                  expectedSolutionResult.rows[0].solution_query,
                  execQuery,
                  schema,
                  config,
                  effectiveMaxDistance,
                ),
                new Promise((_, reject) =>
                  setTimeout(
                    () => reject(new Error("SQL distance timeout")),
                    5000,
                  ),
                ),
              ]);

              console.timeEnd("sql-distance");

              queryFeedback = sqlQueryDistance.stringifyDistance(
                distance,
                steps,
                path,
              );

              queryFeedback_new = sqlQueryDistance.stringifyDistance_new(
                distance,
                steps,
                path,
              );
            } catch (error) {
              console.error("Error calculating sqlQueryDistance:", error);

              queryFeedback_new =
                "ERROR: " + (error?.message || "Unknown error");
            }
          }

          // ######### END: SQL Query Distance ##################

          const solutionPool =
            endpoint === "World"
              ? pool2
              : endpoint === "Movie"
                ? pool3
                : endpoint === "Euro"
                  ? pool4
                  : endpoint === "Teachers"
                    ? pool5
                    : pool6;
          const solution = await executeQueryWithTimeout(
            () =>
              solutionPool.query(expectedSolutionResult.rows[0].solution_query),
            50000,
          );
          // Send both results to the client
          res.json({
            userQueryResult: userQueryResult.rows,
            expectedResult: solution.rows,
            queryFeedback: queryFeedback,
            queryFeedback_new: queryFeedback_new,
            userQuery: execQuery,
            solutionQuery: expectedSolutionResult.rows[0].solution_query,
          });
        }
      } catch (error) {
        res.json({
          userQueryResult: userQueryResult.rows,
          expectedResult: "no solution",
          queryFeedback_new: queryFeedback_new || "",
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
app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tool.user_task_data");
    res.json(result.rows); // Send fetched data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Send 500 status on error
  }
});

// Route to get task-related data
app.post("/api/task_data", async (req, res) => {
  const { selectedTaskAreaId } = req.body;
  try {
    const result_task_data = await pool.query(
      "SELECT * FROM tool.task_statements where area_id = $1 order by statement_id",
      [selectedTaskAreaId],
    );
    res.json(result_task_data.rows); // Send fetched task data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Send 500 status on error
  }
});

// Route to get user-related data
app.get("/api/user_data", async (req, res) => {
  try {
    const result_user_data = await pool.query(
      "SELECT distinct username FROM tool.user_task_data",
    );
    res.json(result_user_data.rows); // Send fetched user data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Send 500 status on error
  }
});

// Route to get area-related data
app.get("/api/area_data", async (req, res) => {
  try {
    const result_area_data = await pool.query("SELECT * FROM tool.task_areas");
    res.json(result_area_data.rows); // Send fetched data as JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error"); // Send 500 status on error
  }
});
//################# project 5 SS24 ######################################################
// Route to get data from the database
app.get("/api/get-data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM private.users");
    term_res = res.json(result.rows);
    //console.log(term_res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route to create a new user
app.post("/api/add-user", async (req, res) => {
  //console.log("add-user", req.body)
  try {
    const { user_name, password, role } = req.body;
    //console.log(req.body);
    const newUser = await pool.query(
      "INSERT INTO private.users (user_name, password, role) VALUES ($1, $2, $3) RETURNING *",
      [user_name, password, role],
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route to update an existing user
app.put("/api/update-user", async (req, res) => {
  // console.log("add-user", req.body)
  try {
    const { user_name, password, role } = req.body;
    const userCheck = await pool.query(
      "SELECT * FROM private.users WHERE user_name = $1",
      [user_name],
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const updatedUser = await pool.query(
      "UPDATE private.users SET password = $2, role = $3 WHERE user_name = $1 RETURNING *",
      [user_name, password, role],
    );
    res.status(200).json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route to get user by username
app.get("/api/get-user-by-username/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const query = "SELECT * FROM private.users WHERE user_name = $1";
    const result = await pool.query(query, [username]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // return user found
    } else {
      res.json(null); // returns null if no user found
    }
  } catch (error) {
    console.error("Error fetching user by username:", error);
    res.status(500).send("Server Error");
  }
});

// Route to delete a user by its username
app.delete("/api/delete-user/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const query = "DELETE FROM private.users WHERE user_name = $1";
    await pool.query(query, [username]);

    res.json({ message: "Benutzer erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen des Benutzers:", error);
    res.status(500).send("Serverfehler");
  }
});

//################# tests ######################################################

//################# LLM ######################################################
app.post("/api/LLMfeedback", async (req, res) => {
  console.log("-_-_-_-_-_-_-_-_ LLM _-_-_-_-_-_-_-_-");
  const startTime = Date.now();
  const { questionData, studentAnswer, correctAnswer, toolFeedback } = req.body;

  try {
    const prompt = ` You are a helpful tutor.
      Provide clear, constructive feedback that helps the student understand their mistake and how to improve their answer,
      based on the following information:
      The exersice questiondata: "${questionData}"
      The correct sample answer: "${correctAnswer}"
      The Student Answer: "${studentAnswer}"
      The generated SQL Feedback: "${toolFeedback}"

      The students have to find the correct query themself, so do provide only a hint in your output without a solution query.
      Also limit your output to 200 characters.

      Format it strictly following exact structure, with no additional text, special characters, Markdown, Brackets or deviations
      and be precise about which table etc is needed in order to understand their mistake and how to improve their answer:
      "(1) Learning tip: [learning tip text]",
      and ensure the actual learning tip appears only after "Learning tip:".
      If more than one learning tip is really necessary, seperate them with "\n" and increase the number in ( ) with 1,
      exactly as the following structure:
      "(1) Learning tip: [learning tip text]\n(2) Learning tip: [learning tip text]".

      Ensure the learning tip(s) are for german speakers, clear, educational, and supportive, but do not stretch them unnaturally.
      `;
    const response = await axios.post("http://ollama:11434/api/generate", {
      model: "gemma3:4b", //gemma4
      prompt,
      stream: false,
    });

    // Deconstruct llm response to learning tip(s)
    const result = response.data.response || "No learning tips generated.";
    const tips_count = (result.match(/:/g) || []).length;

    const generationTime = Date.now() - startTime;
    console.log(
      `Learning tip generation took ${generationTime} ms. This ${generationTime / 60000} minutes.`,
    );
    generationTimeMinutes = generationTime / 60000;

    res.json({
      learning_tips: result,
      learning_tips_count: tips_count,
      LLM_time: generationTimeMinutes + " minutes",
    });
  } catch (error) {
    console.error("Error from Ollama:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get feedback from Ollama" });
  }
});

//################# LLM EVALUATION API #############################################
const EVALUATION_FILE = path.join(__dirname, "evaluation.xlsx");

/*
 * Health Check
 */
app.get(
  "/api/health",
  (_req, res) => {
    const localModels = (process.env.LLM_MODELS || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    const apiModels = [
      "gwdg/qwen3-coder-next",
      "gwdg/deepseek-v4-flash",
      "meta-llama-3.1-8b-instruct",
    ];

    res.json({
      ok: true,
      models: [
        ...localModels,
        ...apiModels,
      ],
      localModels,
      apiModels,
      ollamaUrl:
        process.env.OLLAMA_URL ||
        "http://localhost:11434",
      apiConfigured:
        Boolean(
          process.env.LLM_API_URL &&
          process.env.LLM_USER_ID &&
          process.env.LLM_API_KEY
        ),
    });
  }
);

/*
 * Evaluation
 */
app.post(
  "/api/evaluate",
  async (req, res) => {
    const started = Date.now();

    try {
      validate(req.body);

      const {
        task,
        studentID,
        studentSolution,
        humanEvaluation,
      } = req.body;

      const { evaluateWithModels } = await import("./services/evaluator.js");

      const results =
        await evaluateWithModels({
          task,
          studentID,
          studentSolution,
          humanEvaluation,
        });

      const successfulResults =
        results.filter(
          (result) =>
            result.success
        );

      let run = null;
      let saved = false;

      if (
        successfulResults.length > 0
      ) {
        run = getNextRun(
          task.taskID,
          studentID
        );

        const row =
          createEvaluationRow({
            task,
            studentID,
            humanEvaluation,
            results,
            run,
          });

        appendEvaluationRow(row);

        saved = true;
      }

      res.json({
        ok: true,
        evaluatedAt:
          new Date().toISOString(),
        durationMs:
          Date.now() - started,
        run,
        saved,
        results,
      });
    } catch (error) {
      console.error(
        "Evaluation error:",
        error
      );

      res.status(400).json({
        ok: false,
        error:
          error?.message ||
          "Evaluation failed",
      });
    }
  }
);


function validate(body) {
  const {
    task,
    studentID,
    studentSolution,
    humanEvaluation,
  } = body;

  if (
    !task?.taskID?.trim()
  ) {
    throw Error(
      "taskID is required"
    );
  }

  if (
    !studentID?.trim()
  ) {
    throw Error(
      "studentID is required"
    );
  }

  if (
    !task.description?.trim()
  ) {
    throw Error(
      "task.description is required"
    );
  }

  if (
    !task.referenceSolution?.trim()
  ) {
    throw Error(
      "task.referenceSolution is required"
    );
  }

  if (
    !Number.isFinite(
      Number(task.maxPoints)
    ) ||
    Number(task.maxPoints) <= 0
  ) {
    throw Error(
      "task.maxPoints must be positive"
    );
  }

  if (
    !studentSolution?.trim()
  ) {
    throw Error(
      "studentSolution is required"
    );
  }

  if (
    !humanEvaluation
  ) {
    throw Error(
      "humanEvaluation is required"
    );
  }

  if (
    !humanEvaluation.tutorID?.trim()
  ) {
    throw Error(
      "tutorID is required"
    );
  }

  if (
    !Number.isFinite(
      Number(
        humanEvaluation.points
      )
    )
  ) {
    throw Error(
      "humanEvaluation.points is required"
    );
  }
}


function getNextRun(
  taskID,
  studentID
) {
  if (
    !fs.existsSync(
      EVALUATION_FILE
    )
  ) {
    return 1;
  }

  const workbook =
    XLSX.readFile(
      EVALUATION_FILE
    );

  const sheetName =
    workbook.SheetNames[0];

  if (!sheetName) {
    return 1;
  }

  const sheet =
    workbook.Sheets[sheetName];

  const rows =
    XLSX.utils.sheet_to_json(
      sheet,
      {
        defval: "",
      }
    );

  let maxRun = 0;

  for (const row of rows) {
    if (
      String(row.taskID) ===
        String(taskID) &&
      String(row.StudID) ===
        String(studentID)
    ) {
      const currentRun =
        Number(row.Run);

      if (
        Number.isFinite(currentRun) &&
        currentRun > maxRun
      ) {
        maxRun = currentRun;
      }
    }
  }

  return maxRun + 1;
}


function createEvaluationRow({
  task,
  studentID,
  humanEvaluation,
  results,
  run,
}) {
  const row = {
    taskID: task.taskID,
    StudID: studentID,
    TutID: humanEvaluation.tutorID,
    maxPoints: Number(task.maxPoints),
    TutPoints: Number(humanEvaluation.points),
    TutCategory:
      humanEvaluation.category || "",
  };

  for (const result of results) {
    const model = result.model;

    if (!result.success) {
      row[`${model}Points`] = "";
      row[`${model}Category`] = "";
      row[`${model}Confidence`] = "";
      row[`${model}correctFeedback`] = "";
      row[`${model}Runtime`] =
        result.durationMs;
      continue;
    }

    const evaluation =
      result.evaluation;

    row[`${model}Points`] =
      evaluation.points;

    row[`${model}Category`] =
      evaluation.errorCategory;

    row[`${model}Confidence`] =
      evaluation.confidence ?? "";

    row[`${model}correctFeedback`] =
      "";

    row[`${model}Runtime`] =
      result.durationMs;
  }

  row.Run = run;

  return row;
}


function appendEvaluationRow(row) {
  const columns = [
    "taskID",
    "StudID",
    "TutID",
    "maxPoints",
    "TutPoints",
    "TutCategory",

    /*   "qwen2.5:3bPoints",
    "qwen2.5:3bCategory",
    "qwen2.5:3bConfidence",
    "qwen2.5:3bcorrectFeedback",
    "qwen2.5:3bRuntime", */

    "gemma3:4bPoints",
    "gemma3:4bCategory",
    "gemma3:4bConfidence",
    "gemma3:4bcorrectFeedback",
    "gemma3:4bRuntime",

    /*  "gemma3:12bPoints",
    "gemma3:12bCategory",
    "gemma3:12bConfidence",
    "gemma3:12bcorrectFeedback",
    "gemma3:12bRuntime",

    "gwdg/qwen3-coder-nextPoints",
    "gwdg/qwen3-coder-nextCategory",
    "gwdg/qwen3-coder-nextConfidence",
    "gwdg/qwen3-coder-nextcorrectFeedback",
    "gwdg/qwen3-coder-nextRuntime",

    "gwdg/deepseek-v4-flashPoints",
    "gwdg/deepseek-v4-flashCategory",
    "gwdg/deepseek-v4-flashConfidence",
    "gwdg/deepseek-v4-flashcorrectFeedback",
    "gwdg/deepseek-v4-flashRuntime",

    "meta-llama-3.1-8b-instructPoints",
    "meta-llama-3.1-8b-instructCategory",
    "meta-llama-3.1-8b-instructConfidence",
    "meta-llama-3.1-8b-instructcorrectFeedback",
    "meta-llama-3.1-8b-instructRuntime", */

    "Run",
  ];

  let workbook;

  if (fs.existsSync(EVALUATION_FILE)) {
    workbook =
      XLSX.readFile(
        EVALUATION_FILE
      );
  } else {
    workbook =
      XLSX.utils.book_new();
  }

  const sheetName =
    workbook.SheetNames[0] ||
    "Evaluations";

  let sheet =
    workbook.Sheets[sheetName];

  if (!sheet) {
    const headerRow = [
      columns,
    ];

    sheet =
      XLSX.utils.aoa_to_sheet(
        headerRow
      );

    workbook.Sheets[sheetName] =
      sheet;

    if (
      !workbook.SheetNames.includes(
        sheetName
      )
    ) {
      workbook.SheetNames.push(
        sheetName
      );
    }
  }

  const values =
    columns.map(
      (column) =>
        row[column] ?? ""
    );

  XLSX.utils.sheet_add_aoa(
    sheet,
    [values],
    {
      origin: -1,
    }
  );

  XLSX.writeFile(
    workbook,
    EVALUATION_FILE
  );
}


//################# start server ######################################################
app.listen(8000, "0.0.0.0", () => {
  console.log("Server running on port 8000");
});