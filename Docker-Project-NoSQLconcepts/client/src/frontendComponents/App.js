import React, {
  useState,
  useEffect,
  memo,
  createContext,
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./global/topbar.jsx";
import Footer from "./global/footer.jsx";
import ManageExercises from "./components/adminComponents/manageExercises.jsx";
import SignIn from "./Auth/login.jsx";
import { fetchAssignments } from "./api/adminApi.js";
import { checkAuth } from "./api/loginApi.js";
import Conditions from "./components/otherComponents/conditions.jsx";
import ExerciseSheetC from "./pages/exerciseSheet.jsx";
import NewDashboard from "./pages/dashboard.jsx";
import AdminPage from "./pages/adminPage.jsx";
import NewInformationC from "./pages/information.jsx";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({
    isAuthenticated: null,
    isAdmin: false,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      const authData = await checkAuth();
      setAuthStatus({
        isAuthenticated: authData !== null,
        isAdmin: authData?.role === "admin",
        username: authData?.username,
      });
    };
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={authStatus}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const ProtectedRoute = ({ element, isAdminRoute }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/sign-in" />;
  if (isAdminRoute && !isAdmin) return <Navigate to="/" />;

  return element;
};

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Routes component
const AppRoutes = ({ assignments }) => {
  const routes = [
    { path: "/", element: <NewDashboard /> },

    {
      path: "/manage-users",
      element: <ProtectedRoute element={<AdminPage />} isAdminRoute />,
    },

    {
      path: "/manage-exercises",
      element: <ProtectedRoute element={<ManageExercises />} isAdminRoute />,
    },
    {
      path: "/information",
      element: <NewInformationC />,
    },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/conditions", element: <Conditions /> },

    { path: "*", element: <Navigate to="/" /> },
  ];

  assignments
    .filter((assignment) => assignment.is_active)
    .forEach((assignment) => {
      routes.push({
        path: assignment.link,

        element: (
          <ExerciseSheetC
            area_id={assignment.area_id}
            area_name={assignment.area_name}
            endpoint={assignment.endpoint}
            feedback_on={assignment.feedback_on}
          />
        ),
      });
    });

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

// Main app component
const AppNewLayout = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    document.title = "NoSQLconcepts";

    const loadAssignments = async () => {
      try {
        const response = await fetchAssignments();
        setAssignments(response);
      } catch (error) {
        console.error("Error loading assignments:", error);
      }
    };

    loadAssignments();
  }, []);

  return (
    <AuthProvider>
      <div className="app">
        <main className="content">
          <Router>
            <MemoizedTopBar />
            <ErrorBoundary>
              <AppRoutes assignments={assignments} />
            </ErrorBoundary>
            <MemoizedFooter />
          </Router>
        </main>
      </div>
    </AuthProvider>
  );
};

// Memoized components
const MemoizedTopBar = memo(TopBar);
const MemoizedFooter = memo(Footer);

export { useAuth };
export default AppNewLayout;
