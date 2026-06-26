import Grid from "./components/Grid";

export default function HomePage() {
  const items = [
    { href: "/oprojektu", img: "/assets/images/oprojektu.jpg"},
    { href: "/stosveznam", img: "/assets/images/stosveznam.jpg"},
    { href: "/slusam", img: "/assets/images/slusam.jpg" },
    { href: "/izgovaram", img: "/assets/images/izgovaram.jpg"},
    { href: "/sva4ponavljam", img: "/assets/images/ponavljam.jpg" },
    { href: "/glagoli", img: "/assets/images/glagoli.jpg" },
  ];

  return (
    <main className="bodypocetna">
      <Grid items={items} />
    </main>
  );
}