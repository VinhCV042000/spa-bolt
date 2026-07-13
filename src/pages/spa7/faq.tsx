import { Helmet } from 'react-helmet-async';

import { Spa7SubFaqPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | FAQ</title>
      </Helmet>
      <Spa7SubFaqPageView />
    </>
  );
}
