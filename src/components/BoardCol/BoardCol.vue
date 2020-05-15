<template>
	<md-card>
		<div class="md-elevation-1">
			<md-card-header>

				<md-card-header-text>
					<div class="md-title">{{ colData.title }}</div>
				</md-card-header-text>	

				<md-menu md-size="big" md-direction="bottom-end">

					<md-button class="md-icon-button" md-menu-trigger>
						<md-icon>more_vert</md-icon>
					</md-button>

					<md-menu-content>

						<md-menu-item
							@click="addCard(i)"
						>
							<span>Добавить</span>
							<md-icon>add</md-icon>
						</md-menu-item>

						<md-menu-item
							@click="editColTitle(i)"
						>
							<span>Переименовать</span>
							<md-icon>edit</md-icon>
						</md-menu-item>

						<md-menu-item
							@click="delCol(i)"
						>
							<span>Удалить</span>
							<md-icon>delete</md-icon>
						</md-menu-item>

					</md-menu-content>

				</md-menu>

			</md-card-header>
		</div>

		<md-card-content>
			<draggable
				:list="colData.cards"
				class="list-group"
				draggable=".item"
				group="a"
			>
				<md-content class="item"
					v-for="card in colData.cards"
					:key="card.boardId"
					@click="moreCard(card.boardId)"
				>
					<md-ripple>

						<div class="status"
							v-if="card.status !== false"
							:style="{
								backgroundColor: status[card.status].bg,
								color: status[card.status].color
							}"
						>{{ status[card.status].text }}</div>

						<p class="text">{{ card.title }}</p>

						<div class="props"
							:class="{
								'active': card.term.length > 2 | card.list.length > 0,
								'term': card.term.length > 2,
								'list': card.list.length > 0
							}"
						>

							<div class="prop term">
								<md-icon>alarm</md-icon>
								<span>{{ card.term }}</span>
							</div>

							<div class="prop list">
								<md-icon>done_all</md-icon>
								<span>{{ getListCount(card.list) }}</span>
							</div>

						</div>

					</md-ripple>
				</md-content>
			</draggable>		
		</md-card-content>

	</md-card>
</template>

<script>

import draggable from 'vuedraggable';
	
export default {
	name: 'BoardCol',
	props: {
		status: Array,
		colData: Object,
		i: Number
	},
	components: {
		draggable
	},
	methods: {
		addCard( idx )
		{
			this.$emit('add-card', idx);
		},
		editColTitle( idx )
		{
			this.$emit('edit-col', idx);
		},
		delCol( idx )
		{
			this.$emit('del-col', idx);
		},
		getListCount( list )
		{
			return list.reduce((sum, item) => item.status ? ++sum : sum, 0) + '/' + list.length;
		},
		moreCard( boardId )
		{
			this.$emit('open-desc-modal', boardId);
		}
	}
}

</script>

<style scoped>

@import url('../../assets/css/board-col.css');

</style>