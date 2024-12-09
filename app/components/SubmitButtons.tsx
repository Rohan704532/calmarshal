"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import GoogleLogo from '@/public/google.svg'
import GitHubLogo from '@/public/github.svg'
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function GoogleAuthButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled variant='outline' className="w-full">
                    <Loader2 className="size-4 my-2 animate-spin" />Please wait
                </Button>
            ) : (
                <Button variant='outline' className="w-full">
                    <Image src={GoogleLogo} alt="github" className="size-4 mr-2" /> Sign in with Google
                </Button>
            )}
        </>
    )
}

export function GitHubAuthButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled variant='outline' className="w-full">
                    <Loader2 className="size-4 my-2 animate-spin" />Please wait
                </Button>
            ) : (
                <Button variant='outline' className="w-full">
                    <Image src={GitHubLogo} alt="google" className="size-4 mr-2" /> Sign in with GitHub
                </Button>
            )}
        </>
    )
}