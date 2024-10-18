"use server";


import {db} from "@/db";
import {projectPlan} from "@/db/schemas/projectPlanSchema";
import {eq} from "drizzle-orm";

export const generateProjectPlan = async (data) => {

    try {
        const response = await fetch(`${process.env.BEDROCK_API_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // console.log("Response1", response);

        if (!response.ok) {
            throw new Error("Failed to generate project plan");
        }

        const plan = await response.text()
        // const plan = await response.json();
        // console.log("Generated project plan:", plan);
        return plan;
    } catch (error) {
        console.error("Error generating project plan:", error);
        throw error;
    }

}




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

export const getProjectPlan = async (id) => {
    try {
        // const result = await db.query.projectPlan.findFirst({
        //     where: eq(projectPlan.id, id),
        // });

        const result = await db.select().from(projectPlan).where(eq(projectPlan.id, id));

        console.log("Questionnaire data:", result);
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

export const getProjectPlans = async () => {
    try {
        const result = await db.select().from(projectPlan);

        // console.log("Projects:", result);
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

export const deleteProjectPlan = async (id) => {
    try {
        const result = await db.delete(projectPlan).where(eq(projectPlan.id, id)).returning()

        console.log("Questionnaire data:", result);
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