import EventCalendar from "@/components/EventCalendar";
import UserCard from "@/components/UserCard";

const StudentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="attendance" value="80%" />
          <UserCard type="upcoming events" value={3} />
          <UserCard type="active projects" value={2} />
          <UserCard type="duty leaves" value="2 Pending" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>
    </div>
  );
};

export default StudentPage;
