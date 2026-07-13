import { Helmet } from 'react-helmet-async';

import { Spa10GalleryPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Gallery</title>
      </Helmet>
      <Spa10GalleryPageView />
    </>
  );
}
