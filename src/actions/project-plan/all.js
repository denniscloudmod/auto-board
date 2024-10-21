"use server";

import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";
import {desc} from "drizzle-orm";

export const getProjectPlans = async () => {
    try {
        const result = await db.select().from(projectPlan).orderBy(desc(projectPlan.createdAt));

        return {
            data: result,
            status: 200,
            message: 'Questionnaire data retrieved successfully',
            error: null
        };
    } catch (error) {
        console.error('Error retrieving questionnaire data:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            message: 'Failed to retrieve questionnaire data'
        };
    }
};
