"use client"

import { useGetMyEvents } from '@/lib/hooks/use-get-my-events';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
    id: string;
    title: string;
    date: string;
    description: string;
}

export default function MyEventsList() {
    const { data: events, isLoading, error } = useGetMyEvents();

    console.log(events)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading events</div>;
    }

    if (!events || events.length === 0) {
        return <div>No events found</div>;
    }

    return (
        <div className="space-y-4">
            {events.events.map((event: Event) => (
                <Card key={event.id}>
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p>{event.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
