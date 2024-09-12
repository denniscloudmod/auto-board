import { z } from 'zod';

// export const QuestionnaireFormSchema = z.object({
//     taskProcessType: z.string().min(1, {
//         message: 'Process type is required',
//     }),
//     primaryBusinessObjective: z.string().min(1, {
//         message: 'Business objective is required'
//     }),
//     existingInfrastructure: z.string().min(1 , {
//         message: 'Existing infrastructure is required'
//     })
// });

export const QuestionnaireFormSchema = z.object({
    numberofSprings: z.string().min(1, {
        message: 'Field is required',
    }),
    tensionControlSystemType: z.string().min(1, {
        message: 'Field is required'
    }),
    safetyFeatures: z.string().min(1 , {
        message: 'Field is required'
    })
});
