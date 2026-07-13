import { Helmet } from 'react-helmet-async';

import { Spa5TrainingPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Formation</title>
      </Helmet>
      <Spa5TrainingPageView />
    </>
  );
}
