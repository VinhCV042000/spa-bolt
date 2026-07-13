import { Helmet } from 'react-helmet-async';

import { Spa14SubGalleryPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Gallery</title>
      </Helmet>
      <Spa14SubGalleryPageView />
    </>
  );
}
