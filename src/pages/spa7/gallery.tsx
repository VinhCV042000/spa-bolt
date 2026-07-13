import { Helmet } from 'react-helmet-async';

import { Spa7SubGalleryPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Gallery</title>
      </Helmet>
      <Spa7SubGalleryPageView />
    </>
  );
}
