import { Helmet } from 'react-helmet-async';

import { Spa14View } from 'src/sections/spa14/view';

export default function Spa14Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna — Belle Époque Wellness &amp; Vinotherapy</title>
        <meta
          name="description"
          content="Imperial Vienna — Wellness hoàng gia Áo-Hung: Vinotherapy Grüner Veltliner, suối khoáng Bad Gastein, liệu pháp Hoàng hậu Sisi và massage Vienna Waltz."
        />
      </Helmet>
      <Spa14View />
    </>
  );
}
