import { z } from 'zod';

export const reviewSchema = z.object({
	name: z.string().regex(/^[a-zA-Z\s]{1,100}$/),
	contact: z.string().regex(/^[0-9]{10}$/),
	taste: z.number().gte(1).lte(5),
	service: z.number().gte(1).lte(5),
	ambience: z.number().gte(1).lte(5),
	pricing: z.number().gte(1).lte(5),
	recommend: z.number().gte(1).lte(5),
	info: z.string().regex(/^[a-zA-Z\s]{1,100}$/),
	feedback: z.string().regex(/^[a-zA-Z\s]{1,100}$/),
});
