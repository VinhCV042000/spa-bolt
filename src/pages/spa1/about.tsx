import { Helmet } from 'react-helmet-async';

import { Spa1AboutPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | About</title>
      </Helmet>
      <Spa1AboutPageView />
    </>
  );
}
