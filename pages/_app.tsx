import '@/styles/globals.css';
import { UserContextProvider } from '@/utils/context/user-context';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextProvider>
			<Component {...pageProps} />
		</UserContextProvider>
	);
}
