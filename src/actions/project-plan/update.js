"use server";

import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";
import {eq} from "drizzle-orm";

export const updateProjectPlan = (data) => {
    try {
        const result = db.update(projectPlan).set(data).where(eq(projectPlan.id, data.id)).returning()

        console.log("Questionnaire data:", result);
        return {
            data: result[0],
            status: 201,
            message: 'Questionnaire data updated successfully',
            error: null
        };
    } catch (error) {
        console.error('Error updating questionnaire data:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            message: 'Failed to update questionnaire data'
        };
    }
};
