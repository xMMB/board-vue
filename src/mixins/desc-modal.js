export default {
	data()
	{
		return {
			descModal: {
				active: false,
				desc: {
					boardId: 0,
					title: '',
					desc: '',
					list: [],
					term: '',
					status: 0
				}
			}
		}
	},
	methods: {
		toggleDescModal()
		{
			if ( this.descModal.active )
			{
				this.editDescModal();

				document.body.style.overflow = 'auto';
			}
			else
			{
				document.body.style.overflow = 'hidden';
			}

			this.descModal.active = !this.descModal.active;
		},
		editDescModal( descData )
		{
			if ( descData )
			{
				this.descModal.desc.boardId = descData.boardId;
				this.descModal.desc.title = descData.title;
				this.descModal.desc.desc = descData.desc;
				this.descModal.desc.list.length = 0;
				this.descModal.desc.term = descData.term;
				this.descModal.desc.status = descData.status;
				this.descModal.desc.parent = descData.parent;
				this.descModal.desc.list = [...descData.list];

				return;
			}

			this.descModal.desc.boardId = 0;
			this.descModal.desc.title = '';
			this.descModal.desc.desc = '';
			this.descModal.desc.list.length = 0;
			this.descModal.desc.term = '';
			this.descModal.desc.status = false;
			this.descModal.desc.parent = '';
		}
	}
}