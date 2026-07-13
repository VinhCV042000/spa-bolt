import { Helmet } from 'react-helmet-async';

import { Spa5GalleryPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Galerie</title>
      </Helmet>
      <Spa5GalleryPageView />
    </>
  );
}
