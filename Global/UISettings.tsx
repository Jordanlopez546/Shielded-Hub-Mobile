import { createContext } from "react";

const ModalContext = createContext<boolean>(false);
const IsDarkModeContext = createContext<boolean>(false);
const UserTokenContext = createContext<string | null>(null);

export { ModalContext, IsDarkModeContext, UserTokenContext };
