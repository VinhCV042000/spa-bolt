import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  spa2: icon('ic-user'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Ecommerce', path: paths.dashboard.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
      { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
      { title: 'Booking', path: paths.dashboard.general.booking, icon: ICONS.booking },
      { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
      { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: paths.dashboard.user.root },
          { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'List', path: paths.dashboard.user.list },
          { title: 'Create', path: paths.dashboard.user.new },
          { title: 'Edit', path: paths.dashboard.user.demo.edit },
          { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
      {
        title: 'Product',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.root },
          { title: 'Details', path: paths.dashboard.product.demo.details },
          { title: 'Create', path: paths.dashboard.product.new },
          { title: 'Edit', path: paths.dashboard.product.demo.edit },
        ],
      },
      {
        title: 'Order',
        path: paths.dashboard.order.root,
        icon: ICONS.order,
        children: [
          { title: 'List', path: paths.dashboard.order.root },
          { title: 'Details', path: paths.dashboard.order.demo.details },
        ],
      },
      {
        title: 'Invoice',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.demo.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
        ],
      },
      {
        title: 'Blog',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: 'List', path: paths.dashboard.post.root },
          { title: 'Details', path: paths.dashboard.post.demo.details },
          { title: 'Create', path: paths.dashboard.post.new },
          { title: 'Edit', path: paths.dashboard.post.demo.edit },
        ],
      },
      {
        title: 'Job',
        path: paths.dashboard.job.root,
        icon: ICONS.job,
        children: [
          { title: 'List', path: paths.dashboard.job.root },
          { title: 'Details', path: paths.dashboard.job.demo.details },
          { title: 'Create', path: paths.dashboard.job.new },
          { title: 'Edit', path: paths.dashboard.job.demo.edit },
        ],
      },
      {
        title: 'Tour',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'List', path: paths.dashboard.tour.root },
          { title: 'Details', path: paths.dashboard.tour.demo.details },
          { title: 'Create', path: paths.dashboard.tour.new },
          { title: 'Edit', path: paths.dashboard.tour.demo.edit },
        ],
      },
      { title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
      {
        title: 'Mail',
        path: paths.dashboard.mail,
        icon: ICONS.mail,
        info: (
          <Label color="error" variant="inverted">
            +32
          </Label>
        ),
      },
      { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      { title: 'Kanban', path: paths.dashboard.kanban, icon: ICONS.kanban },
      {
        title: 'Spa2',
        path: paths.dashboard.spa2.root,
        icon: ICONS.spa2,
        children: [
          { title: 'About', path: paths.dashboard.spa2.about },
          { title: 'Services', path: paths.dashboard.spa2.services },
          { title: 'Training', path: paths.dashboard.spa2.training },
          { title: 'Blog', path: paths.dashboard.spa2.blog },
          { title: 'Careers', path: paths.dashboard.spa2.careers },
          { title: 'Booking', path: paths.dashboard.spa2.booking },
          { title: 'Contact', path: paths.dashboard.spa2.contact },
          { title: 'Offers', path: paths.dashboard.spa2.offers },
          { title: 'Feedback', path: paths.dashboard.spa2.feedback },
          { title: 'Promotions', path: paths.dashboard.spa2.promotions },
          { title: 'Branches', path: paths.dashboard.spa2.branches },
          { title: 'Account', path: paths.dashboard.spa2.account },
          { title: 'Partners', path: paths.dashboard.spa2.partners },
          { title: 'Treatments', path: paths.dashboard.spa2.treatments },
          { title: 'Before & After', path: paths.dashboard.spa2.beforeAfter },
          { title: 'FAQ', path: paths.dashboard.spa2.faq },
          { title: 'Policy', path: paths.dashboard.spa2.policy },
          { title: 'Gallery', path: paths.dashboard.spa2.gallery },
          { title: 'Membership', path: paths.dashboard.spa2.membership },
          { title: 'Gift Card', path: paths.dashboard.spa2.giftCard },
          { title: 'Wellness Package', path: paths.dashboard.spa2.wellnessPackage },
          { title: 'Skin Quiz', path: paths.dashboard.spa2.skinQuiz },
          { title: 'Corporate', path: paths.dashboard.spa2.corporate },
          { title: 'Shop', path: paths.dashboard.spa2.shop },
          { title: 'Sustainability', path: paths.dashboard.spa2.sustainability },
          { title: 'Events', path: paths.dashboard.spa2.events },
          { title: 'Referral', path: paths.dashboard.spa2.referral },
          { title: 'App Download', path: paths.dashboard.spa2.appDownload },
          { title: 'Special Occasions', path: paths.dashboard.spa2.specialOccasions },
          { title: 'Home Service', path: paths.dashboard.spa2.homeService },
          { title: 'Skin Diary', path: paths.dashboard.spa2.skinDiary },
          { title: 'Mindfulness', path: paths.dashboard.spa2.mindfulness },
          { title: 'Medical Spa', path: paths.dashboard.spa2.medicalSpa },
          { title: 'Spa Etiquette', path: paths.dashboard.spa2.spaEtiquette },
          { title: 'Loyalty Rewards', path: paths.dashboard.spa2.loyaltyRewards },
          { title: 'Review', path: paths.dashboard.spa2.review },
          { title: 'Seasonal Package', path: paths.dashboard.spa2.seasonalPackage },
          { title: 'Nutrition', path: paths.dashboard.spa2.nutrition },
          { title: 'Consultation', path: paths.dashboard.spa2.consultation },
          { title: 'VIP Room', path: paths.dashboard.spa2.vipRoom },
          { title: 'Package Builder', path: paths.dashboard.spa2.packageBuilder },
          { title: 'Appointment', path: paths.dashboard.spa2.appointment },
          { title: 'Newsletter', path: paths.dashboard.spa2.newsletter },
          { title: 'Press', path: paths.dashboard.spa2.press },
          { title: 'Affiliate', path: paths.dashboard.spa2.affiliate },
          { title: 'Spa Finder', path: paths.dashboard.spa2.spaFinder },
          { title: 'Spa Menu', path: paths.dashboard.spa2.spaMenu },
          { title: 'Ingredient Guide', path: paths.dashboard.spa2.ingredientGuide },
          { title: 'Skin School', path: paths.dashboard.spa2.skinSchool },
          { title: 'Therapist Profile', path: paths.dashboard.spa2.therapistProfile },
          { title: 'Sleep Wellness', path: paths.dashboard.spa2.sleepWellness },
          { title: 'Prenatal Spa', path: paths.dashboard.spa2.prenatalSpa },
          { title: 'Wellness Assessment', path: paths.dashboard.spa2.wellnessAssessment },
          { title: 'Men Spa', path: paths.dashboard.spa2.menSpa },
          { title: 'Hair & Beauty', path: paths.dashboard.spa2.hairBeauty },
          { title: 'Kids Spa', path: paths.dashboard.spa2.kidsSpa },
          { title: 'Anti-Aging', path: paths.dashboard.spa2.antiAging },
          { title: 'Water Therapy', path: paths.dashboard.spa2.waterTherapy },
          { title: 'Ayurveda', path: paths.dashboard.spa2.ayurveda },
          { title: 'Spa Hotel', path: paths.dashboard.spa2.spaHotel },
          { title: 'Community', path: paths.dashboard.spa2.community },
          { title: 'Franchise', path: paths.dashboard.spa2.franchise },
          { title: 'Group Booking', path: paths.dashboard.spa2.groupBooking },
          { title: 'Certificate Wall', path: paths.dashboard.spa2.certificateWall },
          { title: 'Video Guide', path: paths.dashboard.spa2.videoGuide },
          { title: 'Price List', path: paths.dashboard.spa2.priceList },
          { title: 'Wait List', path: paths.dashboard.spa2.waitList },
          { title: 'Voucher Check', path: paths.dashboard.spa2.voucherCheck },
          { title: 'Accessibility', path: paths.dashboard.spa2.accessibility },
        ],
      },
    ],
  },
  /**
   * Item State
   */
  {
    subheader: 'Misc',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'Permission',
        path: paths.dashboard.permission,
        icon: ICONS.lock,
        roles: ['admin', 'manager'],
        caption: 'Only admin can see this item',
      },
      {
        title: 'Level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'Level 1a',
            path: '#/dashboard/menu_level/menu_level_1a',
            children: [
              {
                title: 'Level 2a',
                path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
              },
              {
                title: 'Level 2b',
                path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
                children: [
                  {
                    title: 'Level 3a',
                    path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
                  },
                  {
                    title: 'Level 3b',
                    path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
                  },
                ],
              },
            ],
          },
          { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
        ],
      },
      {
        title: 'Disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },
      {
        title: 'Label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label
            color="info"
            variant="inverted"
            startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
          >
            NEW
          </Label>
        ),
      },
      {
        title: 'Caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'Params',
        path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        icon: ICONS.parameter,
      },
      {
        title: 'External link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
        info: <Iconify width={18} icon="prime:external-link" />,
      },
      { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
    ],
  },
];
