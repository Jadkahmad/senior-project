const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lamaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">“Education is the passport to the future.”</h2>
            
          </div>
          <p className="text-sm text-gray-400 mt-1">
            The future belongs to those who prepare for it today. Let's keep building tomorrow, one lesson at a time.
          </p>
        </div>

        <div className="bg-lamaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">“Be the change you want to see in this world.”</h2>
            
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Every session, every question, and every idea strengthens your mind. Keep going—knowledge is forever.
          </p>
        </div>

        <div className="bg-lamaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">“An investment in knowledge pays the best interest.”</h2>
            
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Whether you're learning or teaching your time matters. Let's make this week a step forward in growth and success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
