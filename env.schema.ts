import { z } from 'zod';
export default {
    PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    SITE: z.string().url(),
    OPENAI_API_KEY: z.string(),
};