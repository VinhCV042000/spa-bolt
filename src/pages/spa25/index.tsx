import { Helmet } from 'react-helmet-async';

import { Spa25View } from 'src/sections/spa25/view';

export default function Spa25Page() {
  return (
    <>
      <Helmet>
        <title>Neon Glow — Cyber Beauty Spa | Future of Beauty Tech</title>
        <meta
          name="description"
          content="Trải nghiệm beauty spa tương lai với công nghệ LED, Cryo, RF và AI skin analysis. Điều trị không xâm lấn, hiệu quả vượt trội."
        />
      </Helmet>
      <Spa25View />
    </>
  );
}
