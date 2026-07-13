import { Helmet } from 'react-helmet-async';

import { SpasListingView } from 'src/sections/spas-listing/view';

export default function SpasListingPage() {
  return (
    <>
      <Helmet>
        <title>Khám phá tất cả Spa — Spa Collection</title>
        <meta
          name="description"
          content="Khám phá 12 spa với phong cách hoàn toàn khác nhau — từ Kyoto đến Morocco, từ Amazon đến Vienna. Lọc theo phong cách: Châu Á, Châu Âu, Thiên nhiên, Xa xỉ, Công nghệ."
        />
      </Helmet>
      <SpasListingView />
    </>
  );
}
