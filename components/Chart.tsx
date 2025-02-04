
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { calculatePercentage, convertFileSize } from "@/lib/utils";


export const Chart = ({ used = 0 }: { used: number; }) => {


    return (
        <Card className="chart">
            <CardContent className="flex-1 p-0">
            <div className="w-full grid place-items-center">
                <div className="flex justify-center flex-col items-center bg-brand-100 rounded-full w-[180px] h-[180px]">
                    <h1 className="h1"> {calculatePercentage(used)} %</h1>
                    <p className=" font-bold">Space Used</p>
                </div>
                </div>
            </CardContent>
            <CardHeader className="chart-details">
                <CardTitle className="chart-title">Available Storage</CardTitle>
                <CardDescription className="chart-description">
                    {used ? convertFileSize(used) : "0 GB"} / 2GB
                </CardDescription>
            </CardHeader>
        </Card>
    );
};