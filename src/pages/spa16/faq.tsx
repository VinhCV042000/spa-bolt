import { Helmet } from 'react-helmet-async';

import { Spa16SubFaqPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | FAQ</title>
      </Helmet>
      <Spa16SubFaqPageView />
    </>
  );
}
