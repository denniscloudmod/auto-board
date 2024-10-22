"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import {getProjectPlans} from "@/actions/project-plan/all";
import {Loader2} from "lucide-react";

const EditorDataTable = ({ columns }) => {

    const router = useRouter();

    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setIsLoading(true);
                const { data } = await getProjectPlans();
                const fetchData = data.map(project => ({
                    id: project.id,
                    title: project.title,
                    createdAt: project.createdAt.toLocaleString(),
                    updatedAt: project.updatedAt.toLocaleString()
                }));
                setTableData(fetchData);
            } catch (error) {
                console.error("Error fetching project plans:", error);
                // Optionally, you can set an error state here and display it to the user
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlans();
    }, []);


    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleRowClick = (projectId) => {
        router.push(`/project-planner/docs/${projectId}`);
        // router.push(`/project-planner/editor/${projectId}`);
    };

    if (isLoading) {
        return (
            <div className={'flex items-center justify-center mt-1/2'}>
                <Loader2 className={'animate-spin w-4 h-4'}/>
            </div>
        );
    }

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
                                onClick={() => handleRowClick(row.original.id)}
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
