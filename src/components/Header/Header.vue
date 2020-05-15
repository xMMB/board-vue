<template>
	<md-toolbar class="md-dense md-primary">

		<h3 class="md-title" style="flex: 1">
			<span class="title-text"
				@click="editBoardTitle"
			>
				<md-ripple>
					{{ title }}
				</md-ripple>
			</span>
		</h3>
		
		<div class="icon-btn">
			<md-button class="md-icon-button"
				@click="addBoardCol"
			>
				<md-icon>add</md-icon>			
			</md-button>
			<md-tooltip md-direction="left">Добавить колонку</md-tooltip>
		</div>

	</md-toolbar>
</template>

<script>
	
export default {
	name: 'Header',
	props: {
		title: String
	},
	methods: {
		editBoardTitle()
		{
			this.$emit('edit-board-title', {
				title: 'Переименование доски',
				label: 'Введите название',
				val: this.title,
				target: 'editBoardTitle'
			});
		},
		addBoardCol()
		{
			this.$emit('add-board-col', {
				title: 'Новая колонка',
				label: 'Введите название',
				target: 'addBoardCol'
			});
		}
	}
}

</script>

<style scoped>

@import url("../../assets/css/header.css");

</style>