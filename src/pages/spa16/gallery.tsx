import { Helmet } from 'react-helmet-async';

import { Spa16SubGalleryPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Gallery</title>
      </Helmet>
      <Spa16SubGalleryPageView />
    </>
  );
}
