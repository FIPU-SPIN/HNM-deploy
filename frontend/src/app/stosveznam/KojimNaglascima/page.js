import Quiz from "../../components/Quiz";
import kviz1 from "../../data/kviz1";

export default function KojimNaglascimaPage() {
  return (
    <main className="bodydruga">
      <div className="quiz-wrapper">
        <Quiz steps={kviz1}/>
      </div>
    </main>
  );
}