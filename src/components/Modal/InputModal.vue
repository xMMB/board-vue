<template>
	<div class="modal-wrapper"
		:class="{ 'active': isActive }"
	>
		<div class="modal-inner">
			<div class="modal-content">
				<p class="md-headline">{{ title }}</p>
				<div class="inp">
					<slot></slot>
				</div>
				<div class="btns right">
					<md-button class="md-accent"
						@click="canceled"
					>Отмена</md-button>
					<md-button class="md-primary"
						@click="confirmed"
					>Готово</md-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
export default {
	name: 'InputModal',
	props: {
		isActive: {
			type: Boolean,
			default: false
		},
		title: String
	},
	methods: {
		canceled()
		{
			this.$emit('canceled');
		},
		confirmed()
		{
			this.$emit('confirmed');
		}
	}
}

</script>

<style scoped>
	
@import url("../../assets/css/input-modal.css");

.modal-wrapper .modal-inner {
	align-items: center;
}

.modal-wrapper .modal-content {
	margin: 0;
}

.modal-wrapper .md-headline {
	white-space: nowrap;
}

</style>