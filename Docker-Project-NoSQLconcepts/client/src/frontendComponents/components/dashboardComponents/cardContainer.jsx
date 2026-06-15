import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Alert,
  Button,
  CardActions,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import QuizIcon from "@mui/icons-material/Quiz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  addAssignment,
  deleteAssignment,
  fetchAssignments,
  updateAssignment,
} from "../../api/adminApi";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { checkAuth } from "../../api/loginApi";
import CircularProgressC from "./circularProgressC";
import ProgressWithLabel from "./progressWithLabel";
export default function CardContainer() {
  const [assignments, setAssignments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [maxId, setMaxId] = useState(0);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [formValues, setFormValues] = useState({
    area_id: maxId || 0,
    area_name: "",

    descr: "",
    link: "",
    endpoint: "",
    is_active: false,
    feedback_on: false,
  });
  const [openFormDialog, setOpenFormDialog] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setIsAuthenticated(authData !== null);
      if (authData) {
        setIsAdmin(authData.role === "admin");
      }
    };

    verifyAuth();

    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const response = await fetchAssignments();
      setAssignments(response);
      //console.log(response);
      if (response.length > 0) {
        let idArray = response.map((item) => item.area_id);
        let maxId = Math.max(...idArray) + 1;

        setMaxId(maxId);
      } else setMaxId(1);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAdd = () => {
    setActionType("add");
    setFormValues({
      area_id: maxId || 0,
      area_name: "",

      descr: "",
      link: "",
      endpoint: "",
      is_active: false,
      feedback_on: false,
    });
    setOpenFormDialog(true);
  };

  const handleEdit = (assignment) => {
    setActionType("edit");
    setSelectedAssignment(assignment);
    setFormValues({ ...assignment });
    setOpenFormDialog(true);
  };

  const handleDelete = (assignment) => {
    setActionType("delete");
    setSelectedAssignment(assignment);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };
  const handleFormDialogClose = () => {
    setOpenFormDialog(false);
    setFormValues({
      area_id: maxId || 0,
      area_name: "",

      descr: "",
      link: "",
      endpoint: "",
      is_active: false,
      feedback_on: false,
    });
  };
  const handleConfirmation = async () => {
    try {
      if (actionType === "delete") {
        await deleteAssignment(selectedAssignment.area_id);
      } else if (actionType === "add") {
        if (
          formValues.area_id &&
          formValues.area_name &&
          formValues.link &&
          formValues.endpoint
        ) {
          await addAssignment(formValues);
          window.location.reload();
        } else {
          alert("Please fill all required fields!");
        }
      } else if (actionType === "edit") {
        if (
          formValues.area_id &&
          formValues.area_name &&
          formValues.link &&
          formValues.endpoint
        ) {
          await updateAssignment(formValues);
          window.location.reload();
        } else {
          alert("Please fill all required fields!");
        }
      }

      loadAssignments();
    } catch (error) {
      console.error("Error:", error);
      if (actionType === "add") {
        alert(
          "Failed to add card. Check if Area ID already exist. Also make sure to fill all fields in the dialog form."
        );
      }
      if (actionType === "delete") {
        alert(
          "Failed to delete exercise. There is user/exercise data for this assignment."
        );
      }
      if (actionType === "edit") {
        alert(
          "Failed to edit exercise. Try another area_id and make sure to fill all input fields in the dialog form."
        );
      }
    }
    setConfirmationDialogOpen(false);
    setOpenFormDialog(false);
  };
  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const endpointColors = {
    Euro: "rgba(8, 15, 86, 1)",
    Movie: "rgba(8, 15, 86, 1)", //"#043a5eff",
    Buses: "rgba(8, 15, 86, 1)", //"#1f4704ff",
    Teachers: "rgba(8, 15, 86, 1)", //"#385603ff",
    Quiz: "#043a5eff", //"#032729ff",
    World: "rgba(8, 15, 86, 1)", //"#2f0361ff",
  };
  const endpointIcons = {
    Euro: <AssignmentIcon />,
    Movie: <AssignmentIcon />,
    Buses: <AssignmentIcon />,
    Teachers: <AssignmentIcon />,
    Quiz: <QuizIcon />,
    World: <AssignmentIcon />,
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        /* backgroundColor: '#f5f7fa', */ minHeight: "45vh",
      }}
    >
      <Grid container spacing={1}>
        {assignments.map((assignment, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background:
                  "linear-gradient(270deg, #0f2027, #203a43, #2c5364)",
                backgroundSize: "600% 600%",
                animation: "gradientMove 12s ease infinite",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                opacity: assignment.is_active ? 1 : 0.45,
                filter: assignment.is_active ? "none" : "grayscale(0.3)",
                /*  pointerEvents: assignment.is_active ? "auto" : "none", */
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                },
                "@keyframes gradientMove": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" },
                  "100%": { backgroundPosition: "0% 50%" },
                },
              }}
            >
              <CardActionArea
                component={assignment.is_active ? Link : "div"}
                to={assignment.is_active ? assignment.link : undefined}
                sx={{
                  height: "100%",
                  cursor: assignment.is_active ? "pointer" : "default",
                }}
              >
                <Box
                  sx={{
                    p: 2.5,
                    minHeight: 170,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {/* ---------- HOVER OVERLAY CTA ---------- */}
                  {/*  <Box
        className="hover-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 5,
          pointerEvents: "none",
          ".MuiCard-root:hover &": {
            opacity: 1,
          },
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: 999,
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          }}
        >
          Zum Quiz →
        </Box>
      </Box> */}

                  {/* ---------- HEADER ---------- */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      zIndex: 2,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      {/* Icon Box */}
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          background: "rgba(255,255,255,0.15)",
                          backdropFilter: "blur(8px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          color: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          flexShrink: 0,
                        }}
                      >
                        {endpointIcons[assignment.endpoint]}
                      </Box>

                      {/* Title + Sub */}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#fff",
                            fontWeight: 800,
                            lineHeight: 1.2,
                            letterSpacing: 0.3,
                          }}
                        >
                          {assignment.area_name}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                          }}
                        >
                          {assignment.descr}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Admin */}
                    {isAdmin && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Bearbeiten">
                          <IconButton
                            size="small"
                            sx={{
                              background: "rgba(255,255,255,0.15)",
                              color: "#fff",
                              backdropFilter: "blur(6px)",
                              "&:hover": {
                                background: "rgba(255,255,255,0.35)",
                              },
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleEdit(assignment);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Löschen">
                          <IconButton
                            size="small"
                            sx={{
                              background: "rgba(255,255,255,0.15)",
                              color: "#fff",
                              backdropFilter: "blur(6px)",
                              "&:hover": { background: "rgba(255,80,80,0.6)" },
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDelete(assignment);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>

                  {/* ---------- DESCRIPTION ---------- */}
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.5,
                      zIndex: 2,
                    }}
                  >
                    {assignment.long_descr}
                  </Typography>

                  {/* ---------- FOOTER ---------- */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      zIndex: 2,
                    }}
                  >
                    {!assignment.is_active && (
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 999,
                          fontSize: 12,
                          fontWeight: 700,
                          background: "rgba(0,0,0,0.6)",
                          color: "#fff",
                        }}
                      >
                        Inaktiv
                      </Box>
                    )}

                    {/* Progress */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
                      }}
                    >
                      <ProgressWithLabel area_id={assignment.area_id}/* value={assignment.progress ?? 5} */ />
                    </Box>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>

            {/*          <Card
  sx={{
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
    transition: "all 0.35s ease",
    opacity: assignment.is_active ? 1 : 0.45,
    pointerEvents: assignment.is_active ? "auto" : "none",
    "&:hover": {
      transform: "translateY(-6px) scale(1.02)",
      boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    },
  }}
>
  <CardActionArea
    component={Link}
    to={assignment.link}
    sx={{ height: "100%" }}
  >
    <Box
      sx={{
        p: 2.5,
        minHeight: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              flexShrink: 0,
            }}
          >
            {endpointIcons[assignment.endpoint]}
          </Box>

          <Box>
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {assignment.area_name}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "rgba(255,255,255,0.7)",
              }}
            >
               {assignment.descr}
            </Typography>
          </Box>
        </Box>

      
        {isAdmin && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Bearbeiten">
              <IconButton
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                  "&:hover": { background: "rgba(255,255,255,0.3)" },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEdit(assignment);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Löschen">
              <IconButton
                size="small"
                sx={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(6px)",
                  "&:hover": { background: "rgba(255,80,80,0.6)" },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(assignment);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      
      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.5,
        }}
      >
        {assignment.long_descr}
      </Typography>

      
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        
        {!assignment.is_active && (
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              background: "rgba(0,0,0,0.6)",
              color: "#fff",
            }}
          >
            Inaktiv
          </Box>
        )}

        
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <CircularProgressC areaId={assignment.area_id} />
        </Box>
      </Box>
    </Box>
  </CardActionArea>
</Card> */}

            {/*      <Card
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
                opacity: assignment.is_active ? 1 : 0.5,
                pointerEvents: assignment.is_active ? "auto" : "none",
              }}
            >
              <CardActionArea
                component={Link}
                to={assignment.link}
                aria-label={`Open ${assignment.area_name}`}
              >
                <Box
                  sx={{
                    height: 150,
                    backgroundColor:
                      endpointColors[assignment.endpoint] ||
                      "rgba(52, 105, 184, 1)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    //borderRadius: 4,
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(234, 229, 229, 0.6), rgba(239, 228, 228, 0))",
                      zIndex: 1,
                    },
                  }}
                >
                  
                  {isAdmin && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 10,
                        display: "flex",
                        gap: 1,
                        pointerEvents: "auto",
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(95, 93, 93, 0.4)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEdit(assignment);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(95, 93, 93, 0.4)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(assignment);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}

                  
                  <CardActions>
                    <CircularProgressC areaId={assignment.area_id} />
                  </CardActions>

                  <CardContent
                    sx={{
                      position: "relative",
                      zIndex: 10,
                      color: "white",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6" >
                     
                      {endpointIcons[assignment.endpoint]}
                      {assignment.area_name}
                    </Typography>
                    <Typography>{assignment.descr}</Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card> */}
          </Grid>
        ))}
        {isAdmin && (
          <Box p={2}>
            <IconButton aria-label="add new card" onClick={handleAdd}>
              <AddIcon />
            </IconButton>
          </Box>

          /*  </Card> */
        )}
      </Grid>
      {isAdmin && (
        <Dialog
          open={confirmationDialogOpen}
          onClose={handleConfirmationDialogClose}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to {actionType} this assignment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose}>Cancel</Button>
            <Button onClick={handleConfirmation} color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {isAdmin && (
        <Dialog open={openFormDialog} onClose={handleFormDialogClose}>
          <DialogTitle>
            {actionType === "add" ? "Add Assignment" : "Edit Assignment"}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Area_Id - Unique identifier for an area with type integer"
              name="area_id"
              value={formValues.area_id}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px", marginTop: "5px" }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Area_Name"
              name="area_name"
              value={formValues.area_name}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px" }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Short Description - optional"
              name="descr"
              value={formValues.descr}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Name for Exercise Sheet URL - e.g. 'new-area-name'"
              name="link"
              value={formValues.link}
              onChange={handleFormInputChange}
              style={{ marginBottom: "10px" }}
            />

            <FormControl
              fullWidth
              required
              variant="outlined"
              style={{ marginBottom: "10px" }}
            >
              <InputLabel id="database-endpoint-label">
                Database Endpoint
              </InputLabel>
              <Select
                labelId="database-endpoint-label"
                id="database-endpoint"
                name="endpoint"
                value={formValues.endpoint}
                onChange={handleFormInputChange}
                label="Database Endpoint"
              >
                <MenuItem value="World">World</MenuItem>
                <MenuItem value="Euro">Euro</MenuItem>
                <MenuItem value="Movie">Movie</MenuItem>
                <MenuItem value="Teachers">Teachers</MenuItem>
                <MenuItem value="Buses">Buses</MenuItem>
                {/*  <MenuItem value="PostgreSQL">PostgreSQL</MenuItem> */}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              variant="outlined"
              required
              style={{ marginBottom: "10px" }}
            >
              <InputLabel id="database-active-label">Activate area?</InputLabel>
              <Select
                labelId="database-active-label"
                id="database-active"
                name="is_active"
                value={formValues.is_active}
                onChange={handleFormInputChange}
                label="Activate area"
              >
                <MenuItem value={true}>Yes, activate</MenuItem>
                <MenuItem value={false}>No, deactivate</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              variant="outlined"
              required
              style={{ marginBottom: "10px" }}
            >
              <InputLabel id="feedback-label">Query feedback on?</InputLabel>
              <Select
                labelId="feedback-label"
                id="feedback-on"
                name="feedback_on"
                value={formValues.feedback_on}
                onChange={handleFormInputChange}
                label="Query feedback on?"
              >
                <MenuItem value={true}>Yes, activate</MenuItem>
                <MenuItem value={false}>No, deactivate</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Alert severity="warning">
              Attention! When you edit an existing Area ID, the current Area
              settings with that ID will be overwritten.
            </Alert>
            <Button onClick={handleFormDialogClose}>Cancel</Button>
            <Button onClick={handleConfirmation} color="primary">
              {actionType === "add" ? "Add" : "Save"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
