const StatsCard = ({ label, value, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    green: "from-green-50 to-green-100 border-green-200 text-green-700",
    purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-700",
    orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-700",
  };

  const colorClass = colorClasses[color] || colorClasses.blue;

  return (
    <div
      className={`bg-gradient-to-br ${colorClass} border rounded-xl p-5 shadow-sm hover:shadow-md transition-all`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default StatsCard;
