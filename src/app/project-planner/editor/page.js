// 'use client';
// import {useEffect, useRef, useState} from "react";
// import { Editor } from 'smart-webcomponents-react/editor';
// import 'smart-webcomponents-react/source/styles/smart.default.css';
//
//
// const Page = () => {
//
//     const editorRef = useRef(null);
//
//     const toolbarItems = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
//         'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
//         'LowerCase', 'UpperCase', '|',
//         'Formats', 'Alignment', 'OrderedList', 'UnorderedList',
//         'Outdent', 'Indent', '|',
//         'hyperlink', 'table', 'Image', '|', 'ClearFormat', 'Print',
//         'SourceCode', 'splitmode', 'FullScreen', '|', 'Undo', 'Redo', 'subscript', 'superscript', 'delete'
//     ];
//
//     const initEditor = () => {
//         editorRef.current?.expandToolbar();
//     };
//
//     const [formData, setFormData] = useState(null);
//
//     useEffect(() => {
//         const data = localStorage.getItem('plannerQuestionnaire');
//         if (data) {
//             setFormData(JSON.parse(data));
//
//             console.log("data.orderSummary.order.products", JSON.parse(data))
//             // console.log("data.orderSummary.order.products", data?.orderSummary?.order?.products)
//         }
//     }, []);
//
//     if (!formData) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className={'relative w-full md:w-[80%] mx-auto mt-20'}>
//             <Editor  onReady={initEditor} ref={editorRef} id="editor" toolbarItems={toolbarItems}>
//                 <div>
//                     {formData}
//                 </div>
//             </Editor>
//         </div>
//     );
// }
//
//
//
// export default Page;

'use client';
import { useEffect, useRef, useState } from "react";
import { Editor } from 'smart-webcomponents-react/editor';
import 'smart-webcomponents-react/source/styles/smart.default.css';

const Page = () => {
    const editorRef = useRef(null);
    const [productsData, setProductsData] = useState(null);

    const toolbarItems = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignment', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'hyperlink', 'table', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'splitmode', 'FullScreen', '|', 'Undo', 'Redo', 'subscript', 'superscript', 'delete'
    ];

    const initEditor = () => {
        editorRef.current?.expandToolbar();
    };

    useEffect(() => {
        const data = localStorage.getItem('plannerQuestionnaire');
        if (data) {
            const parsedData = JSON.parse(data);
            console.log("parsedData", parsedData.plannerQuestionnaireData)
            const htmlContent = parsedData.plannerQuestionnaireData.map(item =>
                `<p style="margin-bottom: 1rem"><strong>${item.question}</strong> <br> ${item.answer}</p>`
            ).join('');
            setProductsData(htmlContent);
        }
    }, []);

    // if (!productsData) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className={'relative w-full md:w-[80%] mx-auto mt-20'}>
            <Editor onReady={initEditor} ref={editorRef} id="editor" toolbarItems={toolbarItems}>
                <div dangerouslySetInnerHTML={{ __html: productsData }} />
            </Editor>
        </div>
    );
}

export default Page;