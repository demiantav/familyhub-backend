import { z } from 'zod';

const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  assignedToId: z.string().min(1, 'Assigned member ID is required'),
  description: z.string().optional(),
  xpReward: z.number().int().positive().min(0, 'XP reward must be a positive integer'),
  coinReward: z.number().int().positive('Coin reward must be a positive integer'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD'], 'Difficulty must be one of: EASY, MEDIUM, HARD'),
  recurrence: z.enum(
    ['NONE', 'DAILY', 'WEEKLY'],
    'Recurrence must be one of: NONE, DAILY, WEEKLY',
  ),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export { CreateTaskSchema };
