"use server";

import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";
import {eq} from "drizzle-orm";

export const getProjectPlan = async (id) => {
    try {
        const result = await db.select().from(projectPlan).where(eq(projectPlan.id, id));

        // console.log("Questionnaire data:", result);
        return {
            data: result[0],
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

