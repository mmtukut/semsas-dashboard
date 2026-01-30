import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>SEMSAS Dashboard</title>
        <link rel="icon" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_IY8YkQAmLSc96OLkmXQ3fSxDtIMY/fwappc7yj79BW1KK8gCfSq/public/images/nemsas-logo.png" />
      </Head>
      <main>{children}</main>
    </>
  );
}