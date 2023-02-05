import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const ligne_num = "1";
  const arret = "Caen-Quai Meslin";
  const direction = "CAEN Chemin Vert";
  const route_color = "#d8005b";

  const { data, error } = useSWR(
    "/api/get-bus-time?arret=" +
      encodeURI(arret) +
      "&direction=" +
      encodeURI(direction),
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Twisto Next</title>
        <meta
          name="description"
          content="A micro app to consult Twisto real time API"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h2>
            <span
              style={{
                backgroundColor: route_color,
                color: "white",
                padding: "5px",
              }}
            >
              {ligne_num}
            </span>
            &nbsp;{arret}
          </h2>
          <p style={{marginTop: "10px"}}>
            Direction <i>{direction}</i>
          </p>
          {data.data.records.map((record, index) => (
            <li key="index">{record.record.fields.horaire_de_depart_reel}</li>
          ))}
        </div>
      </main>
    </>
  );
}
