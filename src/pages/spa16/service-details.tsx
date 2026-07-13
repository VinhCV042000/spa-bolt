import { Helmet } from 'react-helmet-async';

import { Spa16SubServiceDetailsPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa16SubServiceDetailsPageView />
    </>
  );
}
