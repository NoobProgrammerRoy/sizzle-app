import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react';

type userContext = {
	user: boolean;
	id?: string;
	name?: string;
};

type context = {
	user: userContext;
	setUser: Dispatch<SetStateAction<userContext>>;
};

const userContext = createContext<context | null>(null);

// Context provider for the user object
function UserContextProvider({ children }: any) {
	const [user, setUser] = useState<userContext>({
		user: false,
	});

	return (
		<userContext.Provider value={{ user, setUser }}>
			{children}
		</userContext.Provider>
	);
}

// Function to access the user object in context
function useUser() {
	return useContext(userContext);
}

export { UserContextProvider, useUser };
