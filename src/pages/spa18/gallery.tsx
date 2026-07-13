import { Helmet } from 'react-helmet-async';

import { Spa18SubGalleryPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Gallery</title>
      </Helmet>
      <Spa18SubGalleryPageView />
    </>
  );
}
