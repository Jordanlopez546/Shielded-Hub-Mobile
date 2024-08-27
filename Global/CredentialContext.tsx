import React, { ReactNode, createContext, useState } from "react";
import { CredentialContextProps, CredentialItemProps } from "../types/types";

/*

  CREDENTIAL CONTEXT

*/

const CredentialContext = createContext<CredentialContextProps | undefined>(
  undefined
);

const CredentialProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [credentialList, setCredentialList] = useState<CredentialItemProps[]>(
    []
  );
  const [recycleBList, setRecycleBList] = useState<CredentialItemProps[]>([]);

  return (
    <CredentialContext.Provider
      value={{
        credentialList,
        setCredentialList,
        recycleBList,
        setRecycleBList,
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export { CredentialContext, CredentialProvider };
