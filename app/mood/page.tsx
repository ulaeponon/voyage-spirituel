import { emotions, emotionUI } from "@/lib/emotions";
import { mood } from "../actions/hasMood";

export default function MoodPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#FAF9F7]">
      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">Comment te sens-tu aujourd’hui ?</h1>

      <form action={mood} className="w-full max-w-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        
          {emotions.map((emotion) => {
            const { label, icon } = emotionUI[emotion];

            return (
              <button
                key={emotion}
                type="submit"
                name="emotion"
                value={emotion}
                className="flex flex-col items-center justify-center h-28 rounded-2xl bg-white shadow-sm border border-gray-300 transition-all duration-200 hover:shadow-sm hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-300 active:scale-95"
              >
                <span className="text-3xl mb-2" >{icon}</span>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </button>
            );
          })}
        </div>
      </form>
    </main>
  );
}
