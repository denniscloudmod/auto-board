"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {getProjectPlans} from "@/actions/project-plan";
import {useEffect, useState} from "react";

const EditorDataTable = ({ columns }) => {

    const router = useRouter();

    // const getProjectsFromLocalStorage = () => {
    //     if (typeof window === "undefined") {
    //         return [];
    //     }
    //
    //     const data = localStorage.getItem('plannerQuestionnaires');
    //     if (!data) {
    //         return [];
    //     }
    //
    //     const parsedData = JSON.parse(data);
    //
    //     return parsedData.map(project => ({
    //         id: project.id,
    //         projectName: project.projectName,
    //         owner: project.owner.name,
    //         createdAt: project.createdAt,
    //         lastUpdated: project.lastUpdated
    //     }));
    // };

    const [tableData, setTableData] = useState([]);

    const fetchPlans = async () => {
        const { data} = await getProjectPlans();
        // console.log('dataaaa', data)
        return data.map(project => ({
            id: project.id,
            projectName: "T",
            // projectName: project.projectName,
            owner: project.userId,
            // owner: project.owner.name,
            createdAt: project.createdAt,
            lastUpdated: project.updatedAt
        }));
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await getProjectPlans();
    //         setTableData(result?.data);
    //     };
    //     fetchData();
    // }, []);

    // console.log('tableData', tableData);

    const table = useReactTable({
        data: fetchPlans(),
        // data: getProjectsFromLocalStorage(),
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleRowClick = (projectId) => {
        router.push(`/project-planner/editor/${projectId}`);
    };

    return (
        <div className="rounded-md border shadow-md">
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
                                // onClick={() => handleRowClick(row.original.id)}
                                className="cursor-pointer"
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

export default EditorDataTable;
