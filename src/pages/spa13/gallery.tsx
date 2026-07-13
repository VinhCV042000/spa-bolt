import { Helmet } from 'react-helmet-async';

import { Spa13GalleryView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13GalleryView />
    </>
  );
}
