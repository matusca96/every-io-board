import "./lib/theme.css";

import { ChallengeComponent } from "./ChallengeComponent";
import { Header } from "./components";

export const App = (): JSX.Element => {
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <Header />
      <main>
        <ChallengeComponent />
      </main>
    </div>
  );
};
