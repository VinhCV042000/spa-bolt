import { Helmet } from 'react-helmet-async';

import { Spa3GalleryPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Gallery</title>
      </Helmet>
      <Spa3GalleryPageView />
    </>
  );
}
