import { emotions, emotionUI } from "@/lib/emotions";
import { mood } from "../actions/hasMood";

export default function MoodPage() {
  return (
    <main>
      <h1>Comment te sens-tu aujourd’hui ?</h1>

      <form action={mood}>
        <div
        >
          {emotions.map((emotion) => {
            const { label, icon } = emotionUI[emotion];

            return (
              <button
                key={emotion}
                type="submit"
                name="emotion"
                value={emotion}
              >
                <span >{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </form>
    </main>
  );
}
