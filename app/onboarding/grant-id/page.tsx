import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VideoGif from '@/public/work-is-almost-over-happy.gif'
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function onboardingrouteTwo() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>You are almost done</CardTitle>
                    <CardDescription>We have to now connect your calendar to your account.</CardDescription>
                    <Image src={VideoGif} alt="Almost done gif" className="w-full rounded-lg" />
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href='/api/auth'>
                        <CalendarCheck2 className="size-4 my-2"/>
                            Connect calendar to your account
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}