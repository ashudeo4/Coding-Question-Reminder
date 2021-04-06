import "./App.css";
import Navbar from "./components/layout/Navbar";
import Default from "./components/layout/Default";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Box } from "@material-ui/core";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Box component="div" height="100">
        <Default />
      </Box>
    </ThemeProvider>
  );
}

export default App;
