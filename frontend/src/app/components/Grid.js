import Link from "next/link";

export default function Grid({ items }) {
  return (
    <div className="okvirslike">
      <section className="glavne-slike">
        <div className="slike-grid">
          {items.map((item, i) => (
            <div key={i} className={item.className || "glslike"}>
              <Link href={item.href}>
                <img src={item.img} alt={item.label} />
              </Link>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}