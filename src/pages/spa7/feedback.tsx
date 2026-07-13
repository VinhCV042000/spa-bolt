import { Helmet } from 'react-helmet-async';

import { Spa7SubFeedbackPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Cảm nhận</title>
      </Helmet>
      <Spa7SubFeedbackPageView />
    </>
  );
}
