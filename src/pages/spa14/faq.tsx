import { Helmet } from 'react-helmet-async';

import { Spa14SubFaqPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | FAQ</title>
      </Helmet>
      <Spa14SubFaqPageView />
    </>
  );
}
