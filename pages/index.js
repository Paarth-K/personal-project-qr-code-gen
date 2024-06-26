import Head from "next/head";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
// import { useRouter } from "next/router";
import filter from "@/components/profanityFilter";
const dmsans = DM_Sans({ subsets: ["latin"] });
function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export default function Home() {
  const [name, setName] = useState("");
  const nameInputRef = useRef();
  // const router = useRouter();
  const [url, setUrl] = useState("https://www.paarthkukreja.com/");
  const [bypass, setBypass] = useState(false);
  var cleanName = "";
  useEffect(() => {
    if (!bypass) {
      try {
        cleanName = filter.clean(name);
        setName(cleanName);
      } catch {
        cleanName = name;
      }
    } else {
      cleanName = name;
    }
    setUrl(
      `https://www.paarthkukreja.com/${
        cleanName ? `?to=${toTitleCase(cleanName).replace(" ", "%20")}` : ""
      }`
    );
    window.addEventListener("keydown", (e) => {
      nameInputRef.current.focus();
    });
  }, [name, bypass]);
  return (
    <>
      <Head>
        <title>boo!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${dmsans.className}`}>
        <div
          className={`${name ? "" : styles.conditionalBlur} ${styles.qrCode}`}
          onClick={() => {
            window.open(url);
          }}
        >
          <QRCode value={url}></QRCode>
        </div>
        <p className={`${name ? "" : styles.hidden} ${styles.scanPrompt}`}>
          now scan the code!
        </p>
        <br />
        <input
          type="text"
          value={name}
          className={styles.nameInput}
          placeholder="type your name"
          ref={nameInputRef}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <div
          onClick={() => {
            setBypass(!bypass);
            nameInputRef.current.focus();
          }}
          className={styles.biggerHitBox}
        >
          <div
            className={`${styles.line} ${!bypass ? styles.green : styles.red}`}
          ></div>
        </div>
        <div
          onClick={() => {
            setName("");
            nameInputRef.current.focus();
          }}
          className={styles.biggerHitBox}
        >
          <p className={styles.resetButton}>clear</p>
        </div>
        {/* <div className={styles.generateButton}>Generate QR Code</div> */}
      </main>
    </>
  );
}
