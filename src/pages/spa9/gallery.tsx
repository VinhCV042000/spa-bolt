import { Helmet } from 'react-helmet-async';

import { Spa9GalleryPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Gallery</title>
      </Helmet>
      <Spa9GalleryPageView />
    </>
  );
}
