import { Helmet } from 'react-helmet-async';

import { Spa8GalleryPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Gallery</title>
      </Helmet>
      <Spa8GalleryPageView />
    </>
  );
}
