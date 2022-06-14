import Head from "next/head";
import Image from "next/image";

export async function getServerSideProps({ res, req }) {
  const { readdir } = require("fs/promises");
  const [variant, message] = req.cookies.flash?.split(":") ?? [];

  res.setHeader(
    "Set-Cookie",
    `flash=; path=/; expires=${new Date().toUTCString()}`
  );

  return {
    props: {
      files: await readdir('./public/upload'),
      flash: variant && message ? { variant, message } : null,
    },
  };
}

export default function Home({ flash, files }) {
  return (
    <section className="container p-4">
      <Head>
        <title>Watermarker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {flash && (
        <div className={`alert alert-${flash.variant}`}> {flash.message}</div>
      )}
      <h1 className="d-flex align-items-center gap-4 mb-4">Watermarker</h1>
      <form
        action="/api/upload"
        method="post"
        className="mb-4 d-flex flex-column"
        id="form"
        encType="multipart/form-data"
      >
        <input
          name="file"
          type="file"
          accept="image/*"
          id="file"
          className="form-control mb-2"
        />
        <button id="btn" className="btn btn-primary align-self-end">
          Upload
        </button>
      </form>
      <div className="d-flex flex-column gap-4">
        {files.map(file =>
          <div className="d-flex align-items-center" key={file}>
            <div className="flex-shrink-0">
              <Image
                className="rounded"
                src={`/upload/${file}`}
                width="200"
                height="100"
                objectFit="cover"
                objectPosition="center"
                alt={file}
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <a href={`/upload/${file}`} target="_blank">
                {file}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
