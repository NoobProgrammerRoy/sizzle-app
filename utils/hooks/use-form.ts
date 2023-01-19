import { useState } from 'react';

export function useForm<T>(data: T) {
	return useState<T>(data);
}
