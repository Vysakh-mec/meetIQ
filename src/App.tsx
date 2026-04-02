import { AppRouter } from "./navigation/AppRouter";
import { theme } from "@/constants/theme";

function App() {
  return (
    <div style={styles.app}>
      <AppRouter />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    backgroundColor: theme.colors.bgMain,
    minHeight: "100vh",
    color: "white",
    fontFamily: "'Inter', sans-serif",
  }
};

export default App;
