import Page from "@/components/profile-page/page";
import WebApp from "@twa-dev/sdk";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const tgUser = WebApp?.initDataUnsafe?.user;

  return (
    <div>
      <ThemeProvider>
        <Page user={tgUser} auth_date={0} hash={""} signature={""} />
      </ThemeProvider>
    </div>
  );
}

export default App;
