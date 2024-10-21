// import React from "react";
// import {getProjectPlan} from "@/actions/project-plan/detail";
//
// const EditorDetail = async ({params}) => {
//     const { docId } = params;
//
//
//     const planDetail = async () => {
//         try {
//             const {data} = await getProjectPlan(params)
//             return data;
//         } catch (error) {
//             console.log('error loading', error);
//         }
//     }
//
//     const {title, content}  = await planDetail()
//
//
//     return(
//     <div>
//         <div>{title}</div>
//         <div>{content}</div>
//     </div>
//     )
//
// };
//
// export default EditorDetail

// import React from "react";
// import { getProjectPlan } from "@/actions/project-plan/detail";
//
// const EditorDetail = async ({ params }) => {
//     const { docId } = params;
//
//     try {
//         const { data } = await getProjectPlan(docId);
//         const { title, content } = data;
//
//         return (
//             <div>
//                 <div>{title}</div>
//                 <div>{content}</div>
//             </div>
//         );
//     } catch (error) {
//         console.error('Error loading project plan:', error);
//         return <div>Error loading project plan</div>;
//     }
// };
//
// export default EditorDetail;


import React from "react";
import { getProjectPlan } from "@/actions/project-plan/detail";
import { AlertCircle } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {MDXRemote} from "next-mdx-remote/rsc";

// const EditorDetail = async ({ params }) => {
//     const { docId } = params;
//
//     try {
//         const {data} = await getProjectPlan(docId);
//         const {title, content, createdAt} = data;
//
//         // return (
//         //     <div className="container mx-auto px-4 py-8">
//         //         <Card className="w-full max-w-3xl mx-auto">
//         //             <CardHeader>
//         //                 <CardTitle className="text-2xl font-bold text-gray-800">{title}</CardTitle>
//         //                 <div className="text-sm text-gray-500">
//         //                     <span>Last updated: {new Date(createdAt).toLocaleDateString()}</span>
//         //                     <span className="mx-2">|</span>
//         //                     <span>Author: {"author"}</span>
//         //                 </div>
//         //             </CardHeader>
//         //             <CardContent>
//         //                 <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
//         //                     <ReactMarkdown>{content}</ReactMarkdown>
//         //                 </div>
//         //             </CardContent>
//         //         </Card>
//         //     </div>
//         // );
//
//         return (
//             <MDXRemote source={content} />
//         )
//
//     } catch(error){
//
//
//
//         console.error('Error loading project plan:', error);
//         // return (
//         //     <div className="container mx-auto px-4 py-8">
//         //         <Alert variant="destructive">
//         //             <AlertCircle className="h-4 w-4" />
//         //             <AlertTitle>Error</AlertTitle>
//         //             <AlertDescription>
//         //                 There was an error loading the project plan. Please try again later.
//         //             </AlertDescription>
//         //         </Alert>
//         //     </div>
//         // );
//     }
// };
//
// export default EditorDetail;


const EditorDetail = async ({ params }) => {
    const { docId } = params;

    try {
        const { data } = await getProjectPlan(docId);
        const { title, content } = data;

        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
                    {/*<div className="prose prose-lg text-gray-700">*/}
                        <MDXRemote source={content}/>
                    {/*</div>*/}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading project plan:', error);
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-600 text-center">
                    Error loading project plan
                </div>
            </div>
        );
    }
};

export default EditorDetail;
