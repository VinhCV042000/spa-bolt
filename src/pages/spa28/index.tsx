import { Helmet } from 'react-helmet-async';

import { Spa28View } from 'src/sections/spa28/spa28-view';

export default function Spa28Page() {
  return (
    <>
      <Helmet>
        <title>Pink Pop Studio — Playful Beauty Bar</title>
        <meta
          name="description"
          content="Pink Pop Studio — beauty bar Y2K năng động: nail, lash, brow, glow facial trong không gian hồng kẹo bùng nổ."
        />
      </Helmet>
      <Spa28View />
    </>
  );
}
