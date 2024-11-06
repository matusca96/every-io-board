import "./lib/theme.css";

import { Board, Header } from "./components";
import { ThemeProvider } from "./context";

export const App = (): JSX.Element => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col p-4 max-w-screen-xl mx-auto">
        <Header />
        <main className="flex-1 flex mt-6">
          <Board />
        </main>
      </div>
    </ThemeProvider>
  );
};
