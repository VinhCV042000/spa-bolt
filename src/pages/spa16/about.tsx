import { Helmet } from 'react-helmet-async';

import { Spa16SubAboutPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Giới thiệu</title>
      </Helmet>
      <Spa16SubAboutPageView />
    </>
  );
}
