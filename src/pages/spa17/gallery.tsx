import { Helmet } from 'react-helmet-async';

import { Spa17SubGalleryPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Gallery</title>
      </Helmet>
      <Spa17SubGalleryPageView />
    </>
  );
}
