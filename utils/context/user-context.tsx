import { ReactNode, createContext, useContext } from 'react';

const userContext = createContext(null);

// Context provider for the user object
function UserContextProvider(children: ReactNode) {
	return <userContext.Provider value={null}>{children}</userContext.Provider>;
}

// Function to access the user object in context
function useUser() {
	return useContext(userContext);
}

export { UserContextProvider, useUser };
