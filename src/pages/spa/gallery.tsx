import { Helmet } from 'react-helmet-async';

import { SpaGalleryPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Gallery</title>
      </Helmet>
      <SpaGalleryPageView />
    </>
  );
}
