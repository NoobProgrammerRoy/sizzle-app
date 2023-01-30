import { useState } from 'react';

// Custom hook to handle error state
export function useError(message = 'An error has occured') {
	return useState<{ error: boolean; message: string }>({
		error: false,
		message: message,
	});
}
