"use server";

import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";
import {eq} from "drizzle-orm";

export const updateProjectPlan = async (data) => {
    try {

        if (!data.id || typeof data.id !== "number") {
            return {
                error: 'Invalid project ID',
                data: null,
                status: 400,
                message: 'Failed to update questionnaire data'
            };
        }

        if (!data) {
            return {
                error: 'Invalid data',
                data: null,
                status: 400,
                message: 'Failed to update questionnaire data'
            };
        }


        const result = await db.update(projectPlan).set(data).where(eq(projectPlan.id, data.id))

        console.log("Questionnaire data:", result);
        console.log("Questionnaire data result:", result[0]);
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
