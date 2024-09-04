import React from 'react';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {QuestionnaireFormSchema} from "@/validations/questionnaire";
import {toast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


const QuestionnaireForm = () => {

    const route = useRouter()

    const form = useForm({
        resolver: zodResolver(QuestionnaireFormSchema),
        defaultValues: {
           taskProcessType : "",
           primaryBusinessObjective : "",
           existingInfrastructure : "",
        },
    })



    const onSubmit = (data) => {

        localStorage.setItem('plannerQuestionnaire', JSON.stringify(
            {
                "plannerQuestionnaireData" : [
                    {"question" : "What are your primary business objectives and goals for this project?", "answer" : data.primaryBusinessObjective},
                    {"question" : "What specific tasks, applications, or processes do you plan to run on AWS?", "answer" : data.taskProcessType},
                    {"question" : "Existing Infrastructure ?", "answer" : data.existingInfrastructure}
                ]
            }
        ));

                    toast({
                    title: "Submitted successfully:",
                    description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-900 text-white">
                {JSON.stringify(data, null, 2)}
                </pre>
            ),
    })
    console.log("Submitted data:", data)

    route.push('/project-planner/editor');
    }

    return (
        <div className="w-1/3 mx-auto mt-10 ">
            <h1 className={'my-10 font-bold text-center text-xl'}>Project Planner Questionnaire</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        <FormField
                            control={form.control}
                            name="primaryBusinessObjective"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>What are your primary business objectives and goals for this project?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Task Process Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Increase revenue">Increase revenue</SelectItem>
                                            <SelectItem value="improve customer experience">Improve customer experience</SelectItem>
                                            <SelectItem value="reduce costs">Reduce costs</SelectItem>
                                            <SelectItem value="enhance security">Enhance security</SelectItem>
                                            <SelectItem value="scale operations">Scale operations</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taskProcessType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What specific tasks, applications, or processes do you plan to run on AWS?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Specification" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Hosting a website">Hosting a website</SelectItem>
                                            <SelectItem value="Running a database">Running a database</SelectItem>
                                            <SelectItem value="Processing large amounts of data">Processing large amounts of data</SelectItem>
                                            <SelectItem value="Backup and disaster recovery">Backup and disaster recovery</SelectItem>
                                            <SelectItem value="AI/ML workloads">AI/ML workloads</SelectItem>
                                            <SelectItem value="e-commerce platform">e-commerce platform</SelectItem>
                                            <SelectItem value="other">other</SelectItem>
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
                                    <FormLabel>Existing Infrastructure ?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Infrastructure" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="We have on-premise servers">We have on-premise servers</SelectItem>
                                            <SelectItem value="We use another cloud provider">We use another cloud provider</SelectItem>
                                            <SelectItem value="We're starting from scratch">We&apos;re starting from scratch</SelectItem>
                                            <SelectItem value="We're not sure">We&apos;re not sure</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className={'mt-6'} type="submit">Generate</Button>
                </form>
            </Form>
        </div>
    )
};

export default QuestionnaireForm;