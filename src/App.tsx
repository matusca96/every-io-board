import "./lib/theme.css";

import { Board, Header } from "./components";

export const App = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col p-4 max-w-screen-xl mx-auto">
      <Header />
      <main className="flex-1 flex mt-6">
        <Board />
      </main>
    </div>
  );
};
