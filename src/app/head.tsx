export default function Head() {
  return (
    <head>
      <title>loophole</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="og:title" content="loophole.gg" />
      <meta
        name="og:description"
        content="loophole is a bot aimed towards security and safety of users. Advanced moderation features and a 2fa verification system."
      />
      <meta name="theme-color" content="#fecd56" />
      <meta name="og:image" content="/logo_white.png" />
      <meta name="og:url" content="https://loophole.gg" />
      <link rel="icon" href="/favicon.ico" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font*/}
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      ></link>
    </head>
  );
}
