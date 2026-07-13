import { Helmet } from 'react-helmet-async';

import { Spa14SubAboutPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Giới thiệu</title>
      </Helmet>
      <Spa14SubAboutPageView />
    </>
  );
}
