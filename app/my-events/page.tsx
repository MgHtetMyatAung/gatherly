import MyEventsList from "@/components/my-events-list";
import ProtectedRoute from "@/components/protected-route";

export default function MyEventsPage() {
    return(
        <ProtectedRoute>
            <div className="max-w-[1200px] w-full p-6">
                <h1 className="text-xl font-medium mb-6">My Events</h1>
                <MyEventsList />
            </div>
        </ProtectedRoute>
    )
}