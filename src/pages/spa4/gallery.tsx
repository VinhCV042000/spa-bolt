import { Helmet } from 'react-helmet-async';

import { Spa4GalleryPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Gallery</title>
      </Helmet>
      <Spa4GalleryPageView />
    </>
  );
}
