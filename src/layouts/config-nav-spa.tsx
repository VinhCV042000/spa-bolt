import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function useSpaNavData() {
  const { t } = useTranslate('spa');

  return [
    {
      title: t('nav.home'),
      path: '/',
      icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
    },
    {
      title: t('nav.about'),
      path: paths.spa.about,
      icon: <Iconify width={22} icon="solar:info-circle-bold-duotone" />,
    },
    {
      title: t('nav.services'),
      path: paths.spa.services,
      icon: <Iconify width={22} icon="solar:leaf-bold-duotone" />,
      children: [
        {
          subheader: t('nav.subheaderServices'),
          items: [
            { title: t('nav.servicesAll'), path: paths.spa.services },
            { title: t('nav.serviceMassage'), path: paths.spa.serviceDetails('massage-tri-lieu') },
            { title: t('nav.serviceFacial'), path: paths.spa.serviceDetails('cham-soc-da-mat') },
            { title: t('nav.serviceBody'), path: paths.spa.serviceDetails('lieu-phap-body') },
            { title: t('nav.serviceAroma'), path: paths.spa.serviceDetails('aromatherapy') },
            { title: t('nav.serviceHair'), path: paths.spa.serviceDetails('cham-soc-toc-da-dau') },
            { title: t('nav.serviceCouple'), path: paths.spa.serviceDetails('couple-vip-retreat') },
          ],
        },
      ],
    },
    {
      title: t('nav.offers'),
      path: paths.spa.offers,
      icon: <Iconify width={22} icon="solar:tag-price-bold-duotone" />,
    },
    {
      title: t('nav.explore'),
      path: paths.spa.gallery,
      icon: <Iconify width={22} icon="solar:gallery-wide-bold-duotone" />,
      children: [
        {
          subheader: t('nav.subheaderContent'),
          items: [
            { title: t('nav.training'), path: paths.spa.training },
            { title: t('nav.blog'), path: paths.spa.blog },
            { title: t('nav.gallery'), path: paths.spa.gallery },
            { title: t('nav.wellness'), path: paths.spa.wellness },
            { title: t('nav.membership'), path: paths.spa.membership },
            { title: t('nav.careers'), path: paths.spa.careers },
          ],
        },
      ],
    },
    {
      title: t('nav.contact'),
      path: paths.spa.contact,
      icon: <Iconify width={22} icon="solar:phone-bold-duotone" />,
    },
    {
      title: t('nav.booking'),
      path: paths.spa.booking,
      icon: <Iconify width={22} icon="solar:calendar-add-bold-duotone" />,
    },
  ];
}
