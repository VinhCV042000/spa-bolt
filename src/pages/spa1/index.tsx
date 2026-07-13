import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { Spa1View } from 'src/sections/spa1/view';

// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslate('spa1');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      <Spa1View />
    </>
  );
}
