export default {
	title: 'Название доски 1',
	statuses: [
		{
			text: 'Запланировано',
			bg: '#63BCB2',
			color: '#000000'
		},
		{
			text: 'В процессе',
			bg: '#5C64FF',
			color: '#FFFFFF'
		},
		{
			text: 'Готово',
			bg: '#1BC46B',
			color: '#FFFFFF'
		}
	],
	cols: [
		{
			title: 'Название колонки 1',
			cards: [
				{
					title: 'Название карточки 1/1',
					desc: 'Описание карточки 1/1',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						}
					],
					term: '16.05.2020',
					status: 1
				},
				{
					title: 'Название карточки 1/2',
					desc: 'Описание карточки 1/2',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						}
					],
					term: '14.05.2020',
					status: false
				},
				{
					title: 'Название карточки 1/3',
					desc: 'Описание карточки 1/3',
					list: [],
					term: '18.05.2020',
					status: 0
				}
			]
		},
		{
			title: 'Название колонки 2',
			cards: [
				{
					title: 'Название карточки 2/1',
					desc: 'Описание карточки 2/1',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						},
						{
							text: 'Check list 3',
							status: false
						},
						{
							text: 'Check list 4',
							status: true
						}
					],
					term: '',
					status: 2
				},
				{
					title: 'Название карточки 2/2',
					desc: 'Описание карточки 2/2',
					list: [],
					term: '',
					status: 0
				}
			]
		},
		{
			title: 'Название колонки 3',
			cards: [
				{
					title: 'Название карточки 3/1',
					desc: 'Описание карточки 3/1',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						}
					],
					term: '13.05.2020',
					status: 0
				},
				{
					title: 'Название карточки 3/2',
					desc: 'Описание карточки 3/2',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						}
					],
					term: '',
					status: false
				},
				{
					title: 'Название карточки 3/3',
					desc: 'Описание карточки 3/3',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						}
					],
					term: '14.05.2020',
					status: 2
				},
				{
					title: 'Название карточки 3/4',
					desc: 'Описание карточки 3/4',
					list: [
						{
							text: 'Check list 1',
							status: false
						},
						{
							text: 'Check list 2',
							status: true
						}
					],
					term: '14.05.2020',
					status: 2
				}
			]
		},
		{
			title: 'Название колонки 4',
			cards: []
		},
		{
			title: 'Название колонки 5',
			cards: []
		}
	]
};