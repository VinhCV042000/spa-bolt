import { Helmet } from 'react-helmet-async';

import { Spa14SubTrainingPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Đào tạo</title>
      </Helmet>
      <Spa14SubTrainingPageView />
    </>
  );
}
