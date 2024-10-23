"use server";
import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";
import {eq} from "drizzle-orm";



export const deleteProjectPlan = async (id) => {
    try {
        const result = await db.delete(projectPlan).where(eq(projectPlan.id, id)).returning()
        return {
            data: result[0],
            status: 200,
            message: 'Questionnaire data deleted successfully',
            error: null
        };
    } catch (error) {
        console.error('Error deleting questionnaire data:', error);
        return {
            error: error.message,
            data: null,
            status: 500,
            message: 'Failed to delete questionnaire data'
        };
    }
};