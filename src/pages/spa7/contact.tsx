import { Helmet } from 'react-helmet-async';

import { Spa7SubContactPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Liên hệ</title>
      </Helmet>
      <Spa7SubContactPageView />
    </>
  );
}
