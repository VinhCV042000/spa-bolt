import { Helmet } from 'react-helmet-async';

import { Spa16SubFeedbackPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Cảm nhận</title>
      </Helmet>
      <Spa16SubFeedbackPageView />
    </>
  );
}
