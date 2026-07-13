import { Helmet } from 'react-helmet-async';

import { Spa7SubAboutPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Giới thiệu</title>
      </Helmet>
      <Spa7SubAboutPageView />
    </>
  );
}
