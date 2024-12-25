import { CreateMeetingAction } from "@/app/actions";
import { Calendar } from "@/app/components/bookingForm/Calandar";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/bookingForm/Timetable";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";


async function getData(eventUrl: string, userName: string) {
    const data = await prisma.eventType.findFirst({
        where: {
            url: eventUrl,
            User: {
                userName: userName
            },
            active: true,
        },
        select: {
            id: true,
            description: true,
            title: true,
            duration: true,
            videoCallsSoftware: true,
            User: {
                select: {
                    image: true,
                    name: true,
                    availablity: {
                        select: {
                            day: true,
                            isActive: true
                        }
                    }
                }
            }
        }
    })

    if (!data) {
        return notFound();
    }
    return data;
}

export default async function BookingFormRoute({ params, searchParams }: { params: { username: string; eventUrl: string }; searchParams: { date?: string; time?: string } }) {
    const { username, eventUrl } = params;
    const { date, time } = searchParams
    const data = await getData(eventUrl, username);
    const selectedDate = date ? new Date(date) : new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }).format(selectedDate);

    const showForm = !!date && !!time;

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            {showForm ? (
                <Card className="max-w-[600px] w-full">
                    <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr] gap-4">
                        <div>
                            <img className="size-10 rounded-full" src={data.User?.image as string} alt='profile image of user' />
                            <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                            <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                            <div className="mt-5 flex flex-col gap-y-3">
                                <p className="flex items-center">
                                    <CalendarX2 className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">{formattedDate}</span>
                                </p>
                                <p className="flex items-center">
                                    <Clock className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                                </p>
                                <p className="flex items-center">
                                    <VideoIcon className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">{data.videoCallsSoftware} </span>
                                </p>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-full w-[1px]" />
                        <form action={CreateMeetingAction} className="flex flex-col gap-y-4">
                            <input type="hidden" name="fromTime" value={time} />
                            <input type="hidden" name="eventDate" value={date} />
                            <input type="hidden" name="meetingLength" value={data.duration} />
                            <input type="hidden" name="provider" value={data.videoCallsSoftware} />
                            <input type="hidden" name="username" value={username} />
                            <input type="hidden" name="eventTypeId" value={data.id} />
                            <div className="flex flex-col gap-y-2">
                                <Label>Your Name</Label>
                                <Input name="name" placeholder="Your Name" />
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <Label>Your Email</Label>
                                <Input name="email" placeholder="test@example.com" />
                            </div>
                            <SubmitButton className="w-full mt-5" text="Book Meeting" />
                        </form>
                    </CardContent>
                </Card>
            ) : (
                <Card className="max-w-[1000px] w-full mx-auto">
                    <CardContent className="p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4">
                        <div>
                            <img className="size-10 rounded-full" src={data.User?.image as string} alt='profile image of user' />
                            <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
                            <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
                            <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
                            <div className="mt-5 flex flex-col gap-y-3">
                                <p className="flex items-center">
                                    <CalendarX2 className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">{formattedDate}</span>
                                </p>
                                <p className="flex items-center">
                                    <Clock className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                                </p>
                                <p className="flex items-center">
                                    <VideoIcon className="size-4 mr-2 text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">{data.videoCallsSoftware} </span>
                                </p>
                            </div>
                        </div>
                        <Separator orientation="vertical" className="h-full w-[1px]" />
                        <RenderCalendar availability={data.User?.availablity as any} />
                        <Separator orientation="vertical" className="h-full w-[1px]" />
                        <TimeTable duration={data.duration} selectedDate={selectedDate} userName={username} />
                    </CardContent>
                </Card>
            )}
        </div>
    )
} 