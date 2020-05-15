export default {
	data()
	{
		return {
			inpModal: {
				invalid: false,
				active: false,
				val: '',
				title: '',
				label: '',
				target: '',
				error: 'Поле не должно быть пустым'
			}
		}
	},
	methods: {
		inpModalConfirm()
		{
			if ( !this.inpModal.val )
			{
				this.inpModal.invalid = true;

				return;
			}

			this[this.inpModal.target](this.inpModal.val);

			this.resetInpModal();
		},
		inpModalCancel()
		{
			this.resetInpModal();
		},
		openInpModal( val )
		{
			for ( let key in val )
			{
				if ( key in this.inpModal )
					this.inpModal[key] = val[key];
			}

			this.inpModal.active = true;

			this.$refs.modalInput.$el.focus();

			setTimeout(() => {
				this.$refs.modalInput.$el.focus()
			}, 50);
		},
		resetInpModal()
		{
			this.inpModal.val = '';
			this.inpModal.title = '';
			this.inpModal.target = '';
			this.inpModal.label = '';
			this.inpModal.active = false;
			this.inpModal.invalid = false;
		}
	}
}