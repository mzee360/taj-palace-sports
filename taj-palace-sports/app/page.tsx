import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Taj Palace Sports Center</h1>
      <p>Brahmankirta, Keraniganj</p>

      <Link href="/book">
        <button>Book Turf</button>
      </Link>
    </main>
  );
}