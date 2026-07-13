import { Helmet } from 'react-helmet-async';

import { Spa16SubBeforeAfterPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Trước & Sau</title>
      </Helmet>
      <Spa16SubBeforeAfterPageView />
    </>
  );
}
