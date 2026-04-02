import { useEffect } from "react";
import { AppRouter } from "./navigation/AppRouter";
import { theme } from "@/constants/theme";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout, setUser } from "./redux/features/auth/authSlice";
import { auth } from "./firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in", user);
        dispatch(
          setUser({
            displayName: user.displayName || "",
            email: user.email || "",
            uid: user.uid || "",
          }),
        );
      } else {
        console.log("User is logged out");
        dispatch(logout());
      }
    });
    return () => unsubscribe();
  }, []);

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
  },
};

export default App;
