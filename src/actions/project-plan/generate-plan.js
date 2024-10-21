"use server";
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

        // const plan = await response.json();
        // console.log("Generated project plan:", plan);
        return await response.text();
    } catch (error) {
        console.error("Error generating project plan:", error);
        throw error;
    }

}