'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // main 
    const mainCategories = await queryInterface.bulkInsert(
      'categories',
      [
        { name: 'Велика побутова техніка', slug: 'velyka-pobutova-tehnika', parent_id: null },
        { name: 'Дрібна побутова техніка', slug: 'dribna-pobutova-tehnika', parent_id: null },
        { name: 'Кліматична техніка', slug: 'klimatychna-tehnika', parent_id: null },
        { name: 'Товари для кухні', slug: 'tovary-dlya-kuhni', parent_id: null },
        { name: 'Дім та декор', slug: 'dim-ta-dekor', parent_id: null },
        { name: 'Сад та город', slug: 'sad-ta-gorod', parent_id: null },
        { name: 'Інше', slug: 'inshe', parent_id: null }
      ],
      { returning: true }
    );

    const getIdBySlug = (slug) => mainCategories.find(c => c.slug === slug).id;

    // subCategories
    await queryInterface.bulkInsert('categories', [

      // Велика побутова техніка
      { name: 'Холодильники та морозильні камери', slug: 'holodilnyky', parent_id: getIdBySlug('velyka-pobutova-tehnika') },
      { name: 'Пральні та сушильні машини', slug: 'pralni-mashyny', parent_id: getIdBySlug('velyka-pobutova-tehnika') },
      { name: 'Кухонні плити та духові шафи', slug: 'plyty-duhovky', parent_id: getIdBySlug('velyka-pobutova-tehnika') },
      { name: 'Посудомийні машини', slug: 'posudomyyni-mashyny', parent_id: getIdBySlug('velyka-pobutova-tehnika') },
      { name: 'Витяжки', slug: 'vytyazhky', parent_id: getIdBySlug('velyka-pobutova-tehnika') },
      { name: 'Інше', slug: 'inshe-velyka', parent_id: getIdBySlug('velyka-pobutova-tehnika') },

      // Дрібна техніка
      { name: 'Кухонна техніка', slug: 'kuhonna-tehnika', parent_id: getIdBySlug('dribna-pobutova-tehnika') },
      { name: 'Прибирання та догляд', slug: 'prybyrannya', parent_id: getIdBySlug('dribna-pobutova-tehnika') },
      { name: 'Фени', slug: 'feny', parent_id: getIdBySlug('dribna-pobutova-tehnika') },
      { name: 'Інше', slug: 'inshe-dribna', parent_id: getIdBySlug('dribna-pobutova-tehnika') },

      // Кліматична техніка
      { name: 'Кондиціонери', slug: 'kondytsionery', parent_id: getIdBySlug('klimatychna-tehnika') },
      { name: 'Обігрівачі', slug: 'obigrivachi', parent_id: getIdBySlug('klimatychna-tehnika') },
      { name: 'Зволожувачі та очищувачі повітря', slug: 'zvolozhuvachi', parent_id: getIdBySlug('klimatychna-tehnika') },
      { name: 'Вентилятори', slug: 'ventylyatory', parent_id: getIdBySlug('klimatychna-tehnika') },
      { name: 'Інше', slug: 'inshe-klimatychna', parent_id: getIdBySlug('klimatychna-tehnika') },

      // Кухня
      { name: 'Посуд для приготування', slug: 'posud-prygotuvannya', parent_id: getIdBySlug('tovary-dlya-kuhni') },
      { name: 'Столовий посуд', slug: 'stolovyi-posud', parent_id: getIdBySlug('tovary-dlya-kuhni') },
      { name: 'Кухонне приладдя', slug: 'kuhonne-pryladdya', parent_id: getIdBySlug('tovary-dlya-kuhni') },
      { name: 'Зберігання продуктів', slug: 'zberigannya-produktiv', parent_id: getIdBySlug('tovary-dlya-kuhni') },
      { name: 'Інше', slug: 'inshe-dlya-kuhni', parent_id: getIdBySlug('tovary-dlya-kuhni') },

      // Дім
      { name: 'Освітлення', slug: 'osvitlennya', parent_id: getIdBySlug('dim-ta-dekor') },
      { name: 'Домашній текстиль', slug: 'tekstyl', parent_id: getIdBySlug('dim-ta-dekor') },
      { name: 'Декор', slug: 'dekor', parent_id: getIdBySlug('dim-ta-dekor') },
      { name: 'Організація простору', slug: 'organizatsiya', parent_id: getIdBySlug('dim-ta-dekor') },
      { name: 'Інше', slug: 'inshe-dim-ta-dekor', parent_id: getIdBySlug('dim-ta-dekor') },

      // Сад
      { name: 'Садовий інструмент', slug: 'sadovyi-instrument', parent_id: getIdBySlug('sad-ta-gorod') },
      { name: 'Меблі для тераси', slug: 'mebli-terasa', parent_id: getIdBySlug('sad-ta-gorod') },
      { name: 'Грилі та барбекю', slug: 'gryli-barbekyu', parent_id: getIdBySlug('sad-ta-gorod') },
      { name: 'Інше', slug: 'inshe-sad-ta-gorod', parent_id: getIdBySlug('sad-ta-gorod') }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};