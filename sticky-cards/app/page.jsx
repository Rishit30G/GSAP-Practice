import StickyCards from './components/StickyCards/StickyCards';

export default function Home() {
  return (
    <>
      <section className="intro">
        <h1>The Foundation</h1>
      </section>

      <StickyCards/>
      <section className="outro">
        <h1>The Conclusion</h1>
      </section>
    </>
  );
}
