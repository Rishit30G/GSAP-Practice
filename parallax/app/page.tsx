import Parallax from '@/components/Parallax';

export default function Home() {
  return (
    <div className="pt-[30vh]">
      <h1 className="flex flex-col w-fit mx-auto mb-10">
        <span className="text-[7vw] tracking-tight font-mono translate-x-[10%]">
          Selected
        </span>
        <span className="text-[5vw] self-end font-light translate-[10%]">
          Beaches
        </span>
      </h1>
      <Parallax title="Maldives" subtitle="Peace" url="/pic1.jpg" />
      <Parallax title="Miami" subtitle="Party" url="/pic2.jpg" />
      <Parallax title="Dubai" subtitle="Paisa" url="/pic3.jpg" />
    </div>
  );
}
