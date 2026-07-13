import { Helmet } from 'react-helmet-async';

import { Spa2SkinDiaryPageView } from 'src/sections/spa2/view/spa2-content-pages3';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Skin Diary</title>
      </Helmet>
      <Spa2SkinDiaryPageView />
    </>
  );
}
