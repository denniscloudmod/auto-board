"use client";

import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionnaireFormSchema } from "@/validations/questionnaire";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
// import { invokeBedrockAgent } from "@/actions/invoke-agent";

const QuestionnaireForm = () => {
    const route = useRouter();

    const form = useForm({
        resolver: zodResolver(QuestionnaireFormSchema),
        defaultValues: {
           numberofSprings: "",
           tensionControlSystemType: "",
           safetyFeatures: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const generateSessionId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const generatePlannerQuestionnaireId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const generateCreatedAt = () => {
        return new Date().toISOString().split('T')[0];
    };

    const generateUpdatedAt = () => {
        return new Date().toISOString().split('T')[0];
    };

    const generateUserName = () => {
        const adjectives = ["Quick", "Lazy", "Happy", "Sad", "Bright", "Dark"];
        const nouns = ["Fox", "Dog", "Cat", "Mouse", "Bear", "Lion"];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomNumber = Math.floor(Math.random() * 1000);
        return `${randomAdjective} ${randomNoun}${randomNumber}`;
    };

    const generateUserData = () => {
        return {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            name: generateUserName()
        };
    };

    const generateProjectName = () => {
        const adjectives = ["Innovative", "Creative", "Agile", "Dynamic", "Smart", "Intelligent"];
        const nouns = ["Project", "Solution", "Product", "Service", "System", "Platform"];
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${randomAdjective} ${randomNoun}`;
    };

    // const handleSendMessage = async (input, sessionId) => {
    //     try {
    //         const response = await invokeBedrockAgent(input, sessionId);
    //         console.log("response11", response);
    //         return response.completion;
    //     } catch (error) {
    //         console.error('Error invoking Bedrock agent:', error);
    //     }
    // }

    const onSubmit = async (data) => {
        setIsLoading(true);

        try {
            // const sessionId = generateSessionId();
            const plannerQuestionnaireData = {
                projectName: generateProjectName(),
                id: generatePlannerQuestionnaireId(),
                owner: generateUserData(),
                createdAt: generateCreatedAt(),
                lastUpdated: generateUpdatedAt(),
                data: [
                    { question: "Number of springs", answer:  data.numberofSprings },
                    { question: "Type of tension control system", answer:  data.tensionControlSystemType },
                    { question: "Safety features", answer:  data.safetyFeatures }

                    // { question: "Number of springs", answer: await handleSendMessage(data.numberofSprings, sessionId) },
                    // { question: "Type of tension control system", answer: await handleSendMessage(data.tensionControlSystemType, sessionId) },
                    // { question: "Safety features", answer: await handleSendMessage(data.safetyFeatures, sessionId) }
                ]
            };

            const existingQuestionnaires = JSON.parse(localStorage.getItem('plannerQuestionnaires')) || [];
            existingQuestionnaires.push(plannerQuestionnaireData);

            localStorage.setItem('plannerQuestionnaires', JSON.stringify(existingQuestionnaires));
            toast({
                title: "Submitted successfully:",
                description: `Questionnaires ${plannerQuestionnaireData.projectName} has been submitted successfully.`,
                variant: "outline",
                // description: (
                //     <div className={'p-2 bg-green-500'}>
                //         Questionnaires {plannerQuestionnaireData.projectName} has been submitted successfully.
                //     </div>
                // ),

                // description: (
                //     <div className="mt-2 w-[340px] rounded-md bg-slate-900 text-white">
                //         {JSON.stringify(data, null, 2)}
                //     </div>
                // ),
            });
            console.log("Questionnaire data:", existingQuestionnaires);
            route.push('/project-planner');
            // route.push('/project-planner/editor');
        } catch (error) {
            console.error('Error saving questionnaire data:', error);
            toast({
                title: "Error",
                description: "An error occurred while submitting the form.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-1/3 mx-auto mt-10 ">
            <h1 className={'my-10 font-bold text-center text-xl'}>Project Planner Questionnaire</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="numberofSprings"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Number of springs</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="How  many springs can you produce?">How  many springs can you produce?</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tensionControlSystemType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type of tension control system</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="What type of tension control system do you have?">What type of tension control system do you have?</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="safetyFeatures"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Safety features</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Do you have safety features ?">Do you have safety features ?</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={isLoading} className={'mt-6'} type="submit">
                        {isLoading && <Loader2 className={'w-4 h-4 animate-spin mr-2 '}/>}  Generate
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default QuestionnaireForm;