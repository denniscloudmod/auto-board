"use server";

import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";

export const saveProjectPlan = async (data) => {
    try {
        const result = await db.insert(projectPlan).values(data).returning()

        console.log("saveProjectPlan data1:", result[0]);
        return {
            data: result[0],
            status: 201,
            message: 'Questionnaire data saved successfully',
            error: null
        };
    } catch (error) {
        console.error('Error saving questionnaire data:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            message: 'Failed to save questionnaire data'
        };
    }
};


