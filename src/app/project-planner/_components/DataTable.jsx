// "use client";
// import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
//
// const DataTable = ({ columns }) => {
//
//     const getProjectsFromLocalStorage =  () => {
//         const data = localStorage.getItem('plannerQuestionnaires');
//         if (!data) {
//             return [];
//         }
//
//         const parsedData = JSON.parse(data);
//
//         return parsedData.map(project => ({
//             id: project.id,
//             projectName: project.projectName,
//             owner: project.owner.name,
//             createdAt: project.createdAt,
//             lastUpdated: project.lastUpdated
//         }));
//     };
//
//     const table = useReactTable({
//         data: getProjectsFromLocalStorage(),
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });
//
//     return (
//         <div className="rounded-md border">
//             <Table>
//                 <TableHeader>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <TableRow key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => (
//                                 <TableHead key={header.id}>
//                                     {header.isPlaceholder
//                                         ? null
//                                         : flexRender(
//                                             header.column.columnDef.header,
//                                             header.getContext()
//                                         )}
//                                 </TableHead>
//                             ))}
//                         </TableRow>
//                     ))}
//                 </TableHeader>
//                 <TableBody>
//                     {table.getRowModel().rows && table.getRowModel().rows.length ? (
//                         table.getRowModel().rows.map((row) => (
//                             <TableRow
//                                 key={row.id}
//                                 data-state={row.getIsSelected() && "selected"}
//                             >
//                                 {row.getVisibleCells().map((cell) => (
//                                     <TableCell key={cell.id}>
//                                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         ))
//                     ) : (
//                         <TableRow>
//                             <TableCell colSpan={columns.length} className="h-24 text-center">
//                                 No results.
//                             </TableCell>
//                         </TableRow>
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };
//
// export default DataTable;
"use client";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DataTable = ({ columns }) => {

    const getProjectsFromLocalStorage = () => {
        if (typeof window === "undefined") {
            return [];
        }

        const data = localStorage.getItem('plannerQuestionnaires');
        if (!data) {
            return [];
        }

        const parsedData = JSON.parse(data);

        return parsedData.map(project => ({
            id: project.id,
            projectName: project.projectName,
            owner: project.owner.name,
            createdAt: project.createdAt,
            lastUpdated: project.lastUpdated
        }));
    };

    const table = useReactTable({
        data: getProjectsFromLocalStorage(),
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows && table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
