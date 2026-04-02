import { AuthSidePanel } from "../components/AuthSidePanel";
import { SignupForm } from "../components/SignupForm";
import { theme } from "@/constants/theme";

export const SignupPage = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <AuthSidePanel type="signup" />
        <SignupForm />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    backgroundColor: theme.colors.bgMain,
  },
  container: {
    width: "100%",
    maxWidth: "1100px",
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    borderRadius: "24px",
    overflow: "hidden",
    border: `1px solid ${theme.colors.borderGlass}`,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
};
