import { z } from 'zod';

export const restaurantDetailsSchema = z.object({
	name: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
	description: z.string().regex(/^[a-zA-Z0-9\s]{1,100}$/),
	contact: z.string().regex(/^[0-9]{10}$/),
});
