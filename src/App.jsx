import { useState } from "react";
import { Context } from "./contexts/Context";

import Navbar from "./components/navigation/Navbar";
import Content from "./components/content/Content";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState("World");
  const [limit, setLimit] = useState(15);

  return (
    <main>
      <Context.Provider
        value={{
          context1: [query, setQuery],
          context2: [limit, setLimit],
        }}
      >
        <Navbar />
        <Content />
      </Context.Provider>
    </main>
  );
};

export default App;
