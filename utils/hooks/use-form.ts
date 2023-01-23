import { useState } from 'react';

// Custom hook for handling form state
export function useForm<T>(data: T) {
	return useState<T>(data);
}
