import { Helmet } from 'react-helmet-async';

import { Spa7View } from 'src/sections/spa7/view';

// ----------------------------------------------------------------------

export default function Spa7Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose — Beauty Clinic Spa | Glass Skin Technology</title>
        <meta
          name="description"
          content="Noir & Rose — Nơi công nghệ làm đẹp tiên tiến gặp nghệ thuật chăm sóc da Hàn Quốc. LED therapy, RF Micro-Needling, HIFU và Cryotherapy Facial."
        />
      </Helmet>
      <Spa7View />
    </>
  );
}
