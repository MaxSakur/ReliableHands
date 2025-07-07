import { ContentLinkType } from "components/content";

export const aboutContent: ContentLinkType[] = [
  {
    name: 'Про нас',
    description: `
      Сьогодні "Надійні руки" — це клініка професіоналів, де працюють висококваліфіковані фахівці, готові стати підтримкою для кожного власника тварини. Ми розуміємо, що ваші улюбленці — це частинка вашої родини, і тому завжди прагнемо дбати про них із любов'ю та відданістю.
    `,
    lists: [
      {
        header: 'Наші цінності',
        items: [
          'Професійність — ми постійно вдосконалюємо свої знання та уміння.',
          'Дбайливий підхід — кожен улюбленець отримує особливу увагу.',
          'Чесність — відкрито інформуємо про всі методи лікування та процедури.',
          'Надійність — ваша довіра є для нас найбільшою нагородою.'
        ]
      }
    ],
    images: [
      require('../../media/about-1.jpg'),
      require('../../media/about-2.jpg'),
      require('../../media/about-3.jpg'),
      require('../../media/about-4.jpg'),
      require('../../media/about-5.jpg'),
      require('../../media/about-6.jpg'),
      require('../../media/about-7.jpg'),
      require('../../media/about-9.jpg'),
    ]
  }
];