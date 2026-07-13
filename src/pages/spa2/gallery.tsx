import { Helmet } from 'react-helmet-async';

import { Spa2GalleryPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Gallery</title>
      </Helmet>
      <Spa2GalleryPageView />
    </>
  );
}
