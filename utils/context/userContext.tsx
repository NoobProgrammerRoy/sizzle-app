import { createContext, useContext, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/supabase/supabaseClient';

type userData = {
	user: User | null;
	session: Session | null;
};

type userContext = {
	user: userData;
	signupUser?: (
		email: string,
		password: string
	) => Promise<{ data: userData; error: AuthError | null } | undefined>;
	signinUser?: (
		email: string,
		password: string
	) => Promise<{ data: userData; error: AuthError | null } | undefined>;
	signoutUser?: () => Promise<{ error: AuthError | null } | undefined>;
};

// Create user context
const UserContext = createContext<userContext>({
	user: { user: null, session: null },
});

// Context provider for user
function UserProvider({ children }: any) {
	const [user, setUser] = useState<userData>({ user: null, session: null });

	// Function to sign up a new user
	async function signupUser(email: string, password: string) {
		try {
			const { data, error } = await supabase.auth.signUp({ email, password });
			if (!error) {
				setUser(data);
				return { data, error };
			}
		} catch (err) {
			console.log(err);
		}
	}

	// Function to sign in the user
	async function signinUser(email: string, password: string) {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (!error) {
				setUser(data);
				return { data, error };
			}
		} catch (err) {
			console.log(err);
		}
	}

	// Function to sign out the user
	async function signoutUser() {
		try {
			const { error } = await supabase.auth.signOut();
			if (!error) {
				setUser({ user: null, session: null });
				return { error };
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<UserContext.Provider value={{ user, signupUser, signinUser, signoutUser }}>
			{children}
		</UserContext.Provider>
	);
}

// Custom hook to get contextual user value
function useUser() {
	return useContext<userContext>(UserContext);
}

export { UserProvider, useUser };
