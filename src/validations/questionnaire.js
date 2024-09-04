import { z } from 'zod';

export const QuestionnaireFormSchema = z.object({
    taskProcessType: z.string().min(1, {
        message: 'Process type is required',
    }),
    primaryBusinessObjective: z.string().min(1, {
        message: 'Business objective is required'
    }),
    existingInfrastructure: z.string().min(1 , {
        message: 'Existing infrastructure is required'
    })
});
