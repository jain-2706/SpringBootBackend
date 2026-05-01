export function Analysis({ data }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow border p-6 text-center h-full">
        <div className="text-4xl mb-3">📋</div>
        <h3 className="font-semibold text-gray-700">No Analysis Yet</h3>
        <p className="text-sm text-gray-500">
          Paste a meeting transcript and click "Analyze Meeting"
        </p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border space-y-6">
      <h2 className="text-lg font-semibold">Analysis</h2>

      {/* Summary */}
      <div>
        <h3 className="font-medium text-blue-600 mb-1">Summary</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Tasks Table */}
      <div>
        <h3 className="font-medium text-purple-600 mb-3">Tasks</h3>

        {data.tasks.length === 0 ? (
          <p className="text-gray-500 text-sm">No tasks found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-2 text-left">Task</th>
                  <th className="p-2 text-left">Assigned</th>
                  <th className="p-2 text-left">Deadline</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {data.tasks.map((t, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2">{t.task}</td>
                    <td className="p-2 capitalize">{t.assigned_to}</td>
                    <td className="p-2">{t.deadline}</td>

                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${getPriorityColor(
                          t.priority
                        )}`}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td className="p-2">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}