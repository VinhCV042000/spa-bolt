import { Helmet } from 'react-helmet-async';

import { Spa22View } from 'src/sections/spa22/spa22-view';

export default function Spa22Page() {
  return (
    <>
      <Helmet>
        <title>Aurora Beauty Lab — Glass Skin · Lab · K-Beauty</title>
        <meta
          name="description"
          content="Aurora Beauty Lab — phòng lab vẻ đẹp tương lai: protocol K-beauty cao cấp, LED đa quang phổ, cryo therapy và serum exosome. Glass skin trong 90 phút."
        />
      </Helmet>
      <Spa22View />
    </>
  );
}
