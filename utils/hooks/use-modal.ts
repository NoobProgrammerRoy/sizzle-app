import { useState } from 'react';

export function useModal() {
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	return {
		loading,
		setLoading,
		success,
		setSuccess,
		error,
		setError,
	};
}
