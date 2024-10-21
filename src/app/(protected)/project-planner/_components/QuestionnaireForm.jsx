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
import { invokeBedrockAgent } from "@/actions/invoke-agent";
import {generateUserId} from "@/utils/helpers";
import {saveProjectPlan} from "@/actions/project-plan/create";
import {Input} from "@/components/ui/input";
import {generateProjectPlan} from "@/actions/project-plan/generate-plan";
import {Textarea} from "@/components/ui/textarea";

const QuestionnaireForm = () => {
    const route = useRouter();

    const form = useForm({
        resolver: zodResolver(QuestionnaireFormSchema),
        defaultValues: {
            projectTitle: "Untitled",
            awsTasksApplications: "",
           primaryBusinessObjectiveGoals: "",
            existingInfrastructure: "",
           scalabilityPerformanceRequirements: "",
           securityComplianceGovernance: "",
            otherRequirements: ""
        },
    });

    const [isLoading, setIsLoading] = useState(false);


    const handleSendMessage = async (input, sessionId) => {
        try {
            const response = await invokeBedrockAgent(input, sessionId);
            console.log("response11", response);
            return response.completion;
        } catch (error) {
            // console.error('Error invoking Bedrock agent:', error);
            toast({
                title: "Error",
                description: "Something went wrong, please try again later.",
                variant: "destructive",
            });
            throw error;
        }
    }

    const onSubmit = async (data) => {
        setIsLoading(true);

        const formData = {
            project_name: data.projectTitle,
            tasks_applications : data.awsTasksApplications,
            business_objectives : data.primaryBusinessObjectiveGoals,
            existing_infrastructure : data.existingInfrastructure,
            scalability_performance : data.scalabilityPerformanceRequirements,
            security_compliance : data.securityComplianceGovernance,
            // title : data.projectTitle
            other_requirements : data.otherRequirements
        };

        console.log("formData", formData)


        try {
            const generatePlanResponse = await generateProjectPlan(formData)

            const savePlanResponse = await saveProjectPlan({
                title: data.projectTitle,
                userId : "e16575cd-e9d3-47d5-b3ba-d3ef612f5683",
                content : generatePlanResponse
            })

            // 'e16575cd-e9d3-47d5-b3ba-d3ef612f5683', generatePlanResponse

            console.log("savedPlan", savePlanResponse.data)

            console.log("Form generate plan data", generatePlanResponse)
            toast({
                // title: "Submitted successfully:",
                description: (
                    <div className={'p-2 bg-green-600 rounded text-white'}>
                        {/*Please wait while we generate the project plan for you.*/}
                        Plan generated and saved successfully.
                    </div>
                ),
            });


            // form.reset()

            // console.log("Questionnaire data:", existingQuestionnaires);
            route.push(`/project-planner/chat/${savePlanResponse.data.id}`);
            // route.push('/project-planner');
            // route.push('/project-planner/editor?projectId=' + plannerQuestionnaireData.id);
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
        <div className="w-2/3 lg:w-1/2 mx-auto mt-10 ">
        {/*<div className="w-1/3 mx-auto mt-10 ">*/}
            <h1 className={'my-10 font-bold text-center text-xl'}>Project Planner Questionnaire</h1>
            <div className="shadow-md p-10 rounded bg-white">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            <FormField
                                control={form.control}
                                name="projectTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter project title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="awsTasksApplications"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>What specific tasks, applications, or processes do you plan to run on AWS?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Hosting a website">Hosting a website</SelectItem>
                                                <SelectItem value="Running a database">Running a database</SelectItem>
                                                <SelectItem value="Processing large amounts of data">Processing large amounts of data</SelectItem>
                                                <SelectItem value="Backup and disaster recovery">Backup and disaster recovery</SelectItem>
                                                <SelectItem value="AI/ML workloads">AI/ML workloads</SelectItem>
                                                <SelectItem value="e-commerce platform">E-commerce platform</SelectItem>
                                                <SelectItem value="Other">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="primaryBusinessObjectiveGoals"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What are your primary business objectives and goals for this project?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Increase revenue">Increase revenue</SelectItem>
                                                <SelectItem value="improve customer experience">Improve customer experience</SelectItem>
                                                <SelectItem value="reduce costs">Reduce costs</SelectItem>
                                                <SelectItem value="enhance security">Enhance security</SelectItem>
                                                <SelectItem value="scale operations">Scale operations</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="existingInfrastructure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Do you have any existing infrastructure, and how do you plan to integrate or migrate it to AWS?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="We have on-premise servers.">We have on-premise servers.</SelectItem>
                                                <SelectItem value="We use another cloud provider">We use another cloud provider</SelectItem>
                                                <SelectItem value="We're starting from scratch">We&apos;re starting from scratch</SelectItem>
                                                <SelectItem value="We're not sure">We&apos;re not sure</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="scalabilityPerformanceRequirements"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What are your scalability and performance requirements?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Handle seasonal spikes in traffic">Handle seasonal spikes in traffic</SelectItem>
                                                <SelectItem value="Support a growing number of users">Support a growing number of users</SelectItem>
                                                <SelectItem value="Maintain fast response times under heavy load">Maintain fast response times under heavy load</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="securityComplianceGovernance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What are your security, compliance, and governance requirements?</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Data encryption">Data encryption</SelectItem>
                                                <SelectItem value="Sser access control">Sser access control</SelectItem>
                                                <SelectItem value="compliance with specific regulations (e.g., GDPR, HIPAA)">compliance with specific regulations (e.g., GDPR, HIPAA)</SelectItem>
                                                <SelectItem value="Audit trails">Audit trails</SelectItem>
                                                <SelectItem value="others">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="otherRequirements"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Other Requirements (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Others" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isLoading} className={'mt-6 text-white'} type="submit">
                            {isLoading && <Loader2 className={'w-4 h-4 animate-spin mr-2 '}/>}  {isLoading ? 'Generating...' : 'Generate Project Plan'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default QuestionnaireForm;