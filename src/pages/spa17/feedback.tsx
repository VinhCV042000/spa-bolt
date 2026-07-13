import { Helmet } from 'react-helmet-async';

import { Spa17SubFeedbackPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Cảm nhận</title>
      </Helmet>
      <Spa17SubFeedbackPageView />
    </>
  );
}
