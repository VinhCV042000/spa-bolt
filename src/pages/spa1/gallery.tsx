import { Helmet } from 'react-helmet-async';

import { Spa1GalleryPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Gallery</title>
      </Helmet>
      <Spa1GalleryPageView />
    </>
  );
}
