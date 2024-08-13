import { createContext } from "react";

const TitleContext = createContext({
    title: "",
    setTitle: () => { }
});

export default TitleContext;