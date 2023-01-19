import { useState } from 'react';

// Custom hook to handle error state
export function useError() {
	return useState<boolean>(false);
}
