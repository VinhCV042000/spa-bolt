import { Helmet } from 'react-helmet-async';

import { Spa5View } from 'src/sections/spa5/view';

// ----------------------------------------------------------------------

export default function Spa5Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo — French Luxury Spa</title>
        <meta
          name="description"
          content="Découvrez Lumière Balnéo — spa balnéothérapie phong cách Pháp sang trọng với thermal bath, vinotherapy và thalassotherapy đặc trưng."
        />
      </Helmet>

      <Spa5View />
    </>
  );
}