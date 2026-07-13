import { Helmet } from 'react-helmet-async';

import { Spa7SubTrainingPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Đào tạo</title>
      </Helmet>
      <Spa7SubTrainingPageView />
    </>
  );
}
