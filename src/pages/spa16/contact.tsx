import { Helmet } from 'react-helmet-async';

import { Spa16SubContactPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Liên hệ</title>
      </Helmet>
      <Spa16SubContactPageView />
    </>
  );
}
