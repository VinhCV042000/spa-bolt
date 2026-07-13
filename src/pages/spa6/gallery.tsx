import { Helmet } from 'react-helmet-async';

import { Spa6GalleryPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Gallery</title>
      </Helmet>
      <Spa6GalleryPageView />
    </>
  );
}
