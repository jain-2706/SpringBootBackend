import { useState } from "react";

export function MeetingTranscript({ onResult }) {
  const [text, setText] = useState("");
  const [members, setMembers] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Transcript is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://motivator-antelope-cucumber.ngrok-free.dev/process",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transcript: text,
            team_members: members
              .split(",")
              .map((m) => m.trim())
              .filter(Boolean),
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Server Error: ${res.status}`);
      }

      // 🔥 Safe parsing (fixes your error)
      const textData = await res.text();
      const data = textData ? JSON.parse(textData) : {};

      if (!data.summary || !Array.isArray(data.tasks)) {
        throw new Error("Invalid API response format");
      }

      onResult(data);
      console.log(data)
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
      <h2 className="text-lg font-semibold">Meeting Transcript</h2>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* Transcript */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste transcript here..."
        className="w-full h-40 border rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
      />

      {/* Team Members */}
      <input
        type="text"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
        placeholder="Enter team members (comma separated)"
        className="w-full px-3 py-2 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
      />

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Meeting"}
      </button>
    </div>
  );
}