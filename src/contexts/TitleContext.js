import { createContext, useState } from "react";

export const TitleContext = createContext({
  title: "",
  setTitle: (arg) => {},
});

const TitleContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  // console.log(children)

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleContextProvider;
