import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./scenes/global/Topbar";

import Dashboard from "./scenes/dashboard";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Tutorial from "./components/tutorial";

import {
  BasicsC,
  JoinOperationC,
  MoreJoinOperationsC,
  SelectFromWorldC,
  SelectWithinSelectC,
  SelfJoinC,
  SumAndCountC,
  UsingNullC,
} from "./components/tutorialTasks/topicCMain";
import { NamesC } from "./components/tutorialTasks/topicCMain";
import {
  SelectQuizC,
  BBCQuizC,
  NestedSelectQuizC,
  SumAndCountQuizC,
  JoinQuizC,
  JoinQuiz2C,
  UsingNullQuizC,
  SelfJoinQuizC,
} from "./components/tutorialTasks/selectQuizMain";

function App() {
  const [theme, colorMode] = useMode();
  useEffect(() => {
    document.title = "NoSQLconcepts";
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <div className="app">
            {/* <Sidebar /> */}
            <main className="content">
              <TopBar />
              <Routes>
                {/* <Route path="/" element={<PgLogin />} /> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/tutorial/basics" element={<BasicsC />} />
                <Route path="/tutorial/names" element={<NamesC />} />
                <Route path="/tutorial/selectquiz" element={<SelectQuizC />} />
                <Route
                  path="/tutorial/selectfromworld"
                  element={<SelectFromWorldC />}
                />
                <Route
                  path="/tutorial/selectwithinselect"
                  element={<SelectWithinSelectC />}
                />
                <Route
                  path="/tutorial/sumandcount"
                  element={<SumAndCountC />}
                />
                <Route path="/tutorial/bbcquiz" element={<BBCQuizC />} />
                <Route
                  path="/tutorial/nestedselectquiz"
                  element={<NestedSelectQuizC />}
                />
                <Route
                  path="/tutorial/sumandcountquiz"
                  element={<SumAndCountQuizC />}
                />
                <Route
                  path="/tutorial/joinoperation"
                  element={<JoinOperationC />}
                />

                <Route path="/tutorial/joinquiz" element={<JoinQuizC />} />
                <Route path="/tutorial/joinquiz2" element={<JoinQuiz2C />} />
                <Route
                  path="/tutorial/morejoinoperations"
                  element={<MoreJoinOperationsC />}
                />
                <Route path="/tutorial/usingnull" element={<UsingNullC />} />
                <Route
                  path="/tutorial/usingnullquiz"
                  element={<UsingNullQuizC />}
                />
                <Route path="/tutorial/selfjoin" element={<SelfJoinC />} />

                <Route
                  path="/tutorial/selfjoinquiz"
                  element={<SelfJoinQuizC />}
                />
              </Routes>{" "}
              {/* <Footer/> */}
            </main>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Fehlerberichterstattung hier
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }

    return this.props.children;
  }
}
