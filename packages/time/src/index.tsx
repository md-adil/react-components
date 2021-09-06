import {
    parseISO, format as newFormat, isToday, differenceInHours, formatDistance, isThisWeek, formatRelative, isThisYear
} from "date-fns";
import React, { useEffect, useMemo, useState } from "react";

type DateFormats = "string" | "datetime" | "intelligent" | "date" | "time";
interface IProps {
    value?: Date | string;
    format?: DateFormats;
    defaultDateTimeFormat?: string;
    defaultDateFormat?: string;
    defaultTimeFormat?: string;
}
export function Time(props: IProps): React.ReactElement {
    const { value, format } = props;
    const date = useMemo(() => {
        if (!props.value) {
            return new Date();
        }
        if (props.value instanceof Date) {
            return props.value;
        }
        return parseISO(props.value);
    }, [value]);

    const [label, setLabel] = useState(getFormatted(date, format ?? "intelligent"));

    useEffect(() => {
        if (props.format !== "intelligent") {
            return;
        }
        const timer = setInterval(() => {
            setLabel(getIntelligentFormat(date));
        }, 60000);
        return () => clearInterval(timer);
    }, [value]);
    return <time dateTime={date.toJSON()}>{label}</time>;
}

function getFormatted(date: Date, props: IProps) {
    switch (props.format) {
    case "datetime":
        return newFormat(date, props.defaultDateTimeFormat!);
    case "date":
        return newFormat(date, props.defaultDateFormat!);
    case "time":
        return newFormat(date, props.defaultTimeFormat!);
    case "intelligent":
        return getIntelligentFormat(date);
    default:
        return newFormat(date, props.format!);
    }
}

function getIntelligentFormat(date: Date) {
    const currentDate = new Date();
    if (Math.abs(differenceInHours(date, currentDate)) <= 3) {
        return formatDistance(date, currentDate, { addSuffix: true });
    }

    if (isToday(date)) {
        return newFormat(date, defaultTimeFormat);
    }

    if (isThisWeek(date)) {
        return formatRelative(date, currentDate);
    }

    if (isThisYear(date)) {
        return newFormat(date, "dd MMM p");
    }
    return newFormat(date, defaultDateFormat);
}
