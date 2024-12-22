import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";


async function getData(userId: string) {
    const data = await prisma.availablity.findMany({
        where: {
            userId: userId
        }
    })
    if (!data) {
        return notFound();
    }
    return data;
}
export default async function AvailablityRoute() {
    const session = await requireUser();
    const data = await getData(session.user?.id as string)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>
                    In this section you can manage your Availability!
                </CardDescription>
            </CardHeader>
            <form>
                <CardContent className="flex flex-col gap-y-4">
                    {data.map((item)=>(
                        <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4">
                           <div className="flex items-center gap-x-3">
                                <Switch defaultChecked={item.isActive}/>
                                <p>{item.day}</p>
                           </div>
                           <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder='From Time'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    
                                </SelectGroup>
                            </SelectContent>
                           </Select>
                        </div>
                    ))}
                </CardContent>
            </form>
        </Card>
    )
}