"use client"

import { Calendar } from "./Calandar";
import {today,getLocalTimeZone} from '@internationalized/date'

export function RenderCalendar(){
    return(
        <Calendar minValue={today(getLocalTimeZone())}/>
    )
}