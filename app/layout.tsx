import "./globals.css";

const dnsPrefetchDomains = [
  "admin.almostcrackd.ai",
  "matrix.almostcrackd.ai",
  "slightlyhumorous.org",
  "stats.slightlyhumorous.org",
  "puniversity.vercel.app",
  "admin.crackd.ai",
  "matrix.crackd.ai",
  "humorstudy.org",
  "stats.humorstudy.org",
  "brain.crackd.ai",
];

const preconnectDomains = [
  "admin.almostcrackd.ai",
  "matrix.almostcrackd.ai",
  "admin.crackd.ai",
  "matrix.crackd.ai",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Humor Hub</title>
        <link href="/favicon.ico?v=5" rel="icon" sizes="any" />
        <link href="/favicon.ico?v=5" rel="shortcut icon" sizes="any" />
        <link href="/icon.png?v=5" rel="icon" sizes="96x96" type="image/png" />
        {dnsPrefetchDomains.map((domain) => (
          <link href={`//${domain}`} key={`dns-${domain}`} rel="dns-prefetch" />
        ))}
        {preconnectDomains.map((domain) => (
          <link href={`https://${domain}`} key={`preconnect-${domain}`} rel="preconnect" />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
