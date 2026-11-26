import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Alert,
  Button,
} from "@mui/material";

import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
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
          "Failed to add card. Check if Area ID already exist. Also make sure to fill all fields in the dialog form.",
        );
      }
      if (actionType === "delete") {
        alert(
          "Failed to delete exercise. There is user/exercise data for this assignment.",
        );
      }
      if (actionType === "edit") {
        alert(
          "Failed to edit exercise. Try another area_id and make sure to fill all input fields in the dialog form.",
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
    Euro: <StorageIcon />,
    Movie: <StorageIcon />,
    Buses: <StorageIcon />,
    Teachers: <StorageIcon />,
    Quiz: <QuizIcon />,
    World: <StorageIcon />,
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 4 },
        minHeight: "45vh",
        backgroundColor: "background.default",
        transition: "background-color 0.2s ease",
      }}
    >
      <Grid container spacing={2}>
        {assignments.map((assignment, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                backgroundColor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 1,
                transition: "all 0.3s ease",
                opacity: assignment.is_active ? 1 : 0.6,
                filter: assignment.is_active ? "none" : "grayscale(0.5)",

                "&:hover": assignment.is_active
                  ? {
                      transform: "translateY(-5px)",
                      boxShadow: 4,
                      borderColor: "primary.light",
                    }
                  : {},
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
                    minHeight: 190,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  {/* HEADER */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 0,
                      }}
                    >
                      {/* ICON */}
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2.5,
                          backgroundColor: assignment.is_active
                            ? "primary.50"
                            : "action.disabledBackground",
                          background: assignment.is_active
                            ? "linear-gradient(135deg, #E8EEFF, #EFF3FF)"
                            : undefined,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 23,
                          color: "primary.main",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                        }}
                      >
                        {endpointIcons[assignment.endpoint]}
                      </Box>

                      {/* TITLE */}
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "text.primary",
                            fontWeight: 750,
                            fontSize: "1.05rem",
                            lineHeight: 1.3,
                            letterSpacing: "-0.3px",
                          }}
                        >
                          {assignment.area_id} : {assignment.area_name}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.75rem",
                          }}
                        >
                          {assignment.descr}
                        </Typography>
                      </Box>
                    </Box>

                    {/* ADMIN ACTIONS */}
                    {isAdmin && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          flexShrink: 0,
                        }}
                      >
                        <Tooltip title="Bearbeiten">
                          <IconButton
                            size="small"
                            sx={{
                              color: "text.secondary",
                              backgroundColor: "action.hover",
                              "&:hover": {
                                backgroundColor: "action.selected",
                                color: "primary.main",
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
                              color: "text.secondary",
                              backgroundColor: "action.hover",
                              "&:hover": {
                                backgroundColor: "error.light",
                                color: "error.dark",
                              },
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

                  {/* DESCRIPTION */}
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2.5,
                      mb: 2,
                      color: "text.secondary",
                      fontSize: "0.85rem",
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {assignment.long_descr}
                  </Typography>

                  {/* FOOTER */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                      pt: 1.5,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {/* STATUS */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {assignment.is_active ? (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                          }}
                        >
                          {/* Bereich öffnen */}
                         {/*  <Box
                            component="span"
                            sx={{
                              ml: 0.7,
                              color: "primary.main",
                              fontWeight: 700,
                            }}
                          >
                            →
                          </Box> */}
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            px: 1.2,
                            py: 0.5,
                            borderRadius: 2,
                            backgroundColor: "action.disabledBackground",
                            color: "text.disabled",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          Inaktiv
                        </Box>
                      )}
                    </Box>

                    {/* PROGRESS */}
                    <Box sx={{ width: "100%" }}>
                      <ProgressWithLabel area_id={assignment.area_id} />
                    </Box>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {/* ADD ASSIGNMENT BUTTON */}
        {isAdmin && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                height: "100%",
                minHeight: 190,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed",
                borderColor: "divider",
                borderRadius: 3,
                backgroundColor: "background.paper",
                transition: "all 0.25s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
            >
              <Tooltip title="Neuen Bereich hinzufügen">
                <IconButton
                  aria-label="add new card"
                  onClick={handleAdd}
                  sx={{
                    width: 56,
                    height: 56,
                    color: "primary.main",
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* CONFIRMATION DIALOG */}
      {isAdmin && (
        <Dialog
          open={confirmationDialogOpen}
          onClose={handleConfirmationDialogClose}
          PaperProps={{
            sx: {
              borderRadius: 3,
              minWidth: { sm: 380 },
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "text.primary",
              fontWeight: 700,
            }}
          >
            Confirmation
          </DialogTitle>

          <DialogContent>
            <DialogContentText sx={{ color: "text.secondary" }}>
              Are you sure you want to {actionType} this assignment?
            </DialogContentText>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, pt: 1 }}>
            <Button onClick={handleConfirmationDialogClose} color="inherit">
              Cancel
            </Button>

            <Button
              onClick={handleConfirmation}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* ADD / EDIT DIALOG */}
      {isAdmin && (
        <Dialog
          open={openFormDialog}
          onClose={handleFormDialogClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: 3,
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "text.primary",
              fontWeight: 700,
              pb: 1,
            }}
          >
            {actionType === "add" ? "Add Assignment" : "Edit Assignment"}
          </DialogTitle>

          <DialogContent sx={{ pt: "16px !important" }}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Area_Id - Unique identifier for an area with type integer"
              name="area_id"
              value={formValues.area_id}
              onChange={handleFormInputChange}
              sx={{ mb: 1.5, mt: 0.5 }}
            />

            <TextField
              required
              fullWidth
              variant="outlined"
              label="Area_Name"
              name="area_name"
              value={formValues.area_name}
              onChange={handleFormInputChange}
              sx={{ mb: 1.5 }}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Short Description - optional"
              name="descr"
              value={formValues.descr}
              onChange={handleFormInputChange}
              sx={{ mb: 1.5 }}
            />

            <TextField
              required
              fullWidth
              variant="outlined"
              label="Name for Exercise Sheet URL - e.g. 'new-area-name'"
              name="link"
              value={formValues.link}
              onChange={handleFormInputChange}
              sx={{ mb: 1.5 }}
            />

            <FormControl fullWidth required variant="outlined" sx={{ mb: 1.5 }}>
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
                {/* <MenuItem value="PostgreSQL">PostgreSQL</MenuItem> */}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" required sx={{ mb: 1.5 }}>
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

            <FormControl fullWidth variant="outlined" required sx={{ mb: 1.5 }}>
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

          <DialogActions
            sx={{
              p: 2.5,
              pt: 1,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Alert
              severity="warning"
              sx={{
                width: "100%",
                borderRadius: 2,
              }}
            >
              Attention! When you edit an existing Area ID, the current Area
              settings with that ID will be overwritten.
            </Alert>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                width: "100%",
              }}
            >
              <Button onClick={handleFormDialogClose} color="inherit">
                Cancel
              </Button>

              <Button
                onClick={handleConfirmation}
                variant="contained"
                color="primary"
              >
                {actionType === "add" ? "Add" : "Save"}
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

//alter Cardcontainer:
/*    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                      <ProgressWithLabel area_id={assignment.area_id} />
                    </Box>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>

           
          </Grid> */
