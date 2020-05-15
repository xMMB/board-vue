<template>
	<div id="app">

		<Header
			:title="board.title"
			@edit-board-title="openInpModal"
			@add-board-col="openInpModal"
		/>

		<main class="board-cols-wrapper">
			<div class="board-cols">
				<BoardCol
					v-for="(col, idx) in board.cols"
					:key="col.boardId"
					:col-data="col"
					:i="idx"
					:status="board.statuses"
					@del-col="delCol"
					@edit-col="editCol"
					@add-card="addCard"
					@open-desc-modal="openDescModal"
				/>
			</div>
		</main>

		<InputModal
			:is-active="inpModal.active"
			@canceled="inpModalCancel"
			@confirmed="inpModalConfirm"
			:title="inpModal.title"
		>
			<md-field
				:class="{ 'md-invalid': inpModal.invalid }"
			>
				<label>{{ inpModal.label }}</label>
				<md-input
					v-model.trim="inpModal.val"
					@keydown.enter="inpModalConfirm"
					ref="modalInput"
				></md-input>
				<span class="md-error">{{ inpModal.error }}</span>
			</md-field>
		</InputModal>

		<CardDescModal
			:is-active="descModal.active"
			:desc="descModal.desc"
			:statuses="board.statuses"
			@close-desc-modal="toggleDescModal"
			@del-list-item="delListItem"
			@del-card="delCard"
			@save-card-status="saveCardStatus"
			@add-check-list="addCheckList"
			@edit-desc="editDesc"
			@edit-term="editTerm"
		/>

	</div>
</template>

<script>

// EXAMPLE DATA
import board from './data/example.js';

import InpModal from './mixins/inp-modal.js';
import DescModal from './mixins/desc-modal.js';

import Header from './components/Header/Header.vue';
import BoardCol from './components/BoardCol/BoardCol.vue';
import InputModal from './components/Modal/InputModal.vue';
import CardDescModal from './components/Modal/CardDescModal.vue';

let
	curId = 1;

board.cols.forEach(( col ) => {

	col.boardId = curId++;

	for (let i = 0; i < col.cards.length; i++)
	{
		col.cards[i].boardId = curId++;
	}

});

export default {
	name: 'App',
	components: {
		Header,
		BoardCol,
		InputModal,
		CardDescModal
	},
	mixins: [
		InpModal,
		DescModal
	],
	data()
	{
		return {
			// selectedDate: '14.06.2020',
			board: JSON.parse(JSON.stringify(board)),
			curColEditIdx: 0
		}
	},
	methods: {
		editBoardTitle( val )
		{
			this.board.title = val;
		},
		addBoardCol( val )
		{
			this.board.cols.push({
				boardId: ++curId,
				title: val,
				cards: []
			});
		},
		delCol( idx )
		{
			this.board.cols.splice(idx, 1);
		},
		openDescModal( boardId )
		{
			let
				foundCard = this.findCard(boardId);

			if ( foundCard )
				this.editDescModal(foundCard);

			if ( boardId == this.descModal.desc.boardId )
				this.toggleDescModal();
		},
		delListItem ( arr )
		{
			let
				foundCard = this.findCard(arr[0]);

			foundCard.list.splice(arr[1], 1);

			this.editDescModal(foundCard);
		},
		findCard( boardId )
		{
			for (let i = 0; i < this.board.cols.length; i++)
			{
				let
					curCol = this.board.cols[i],
					found  = curCol.cards.find((card, idx) => {

						if ( card.boardId == boardId )
						{
							card.idx = idx;

							return true;
						}

					});

				if ( found )
				{
					found.parent = curCol.title;
					found.colIdx = i;					

					return found;
				}
			}

			return false;		
		},
		delCard( boardId )
		{
			let
				delElem = this.findCard(boardId);

			this.toggleDescModal();

			if ( delElem !== false )
				this.board.cols[delElem.colIdx].cards.splice(delElem.idx, 1);
		},
		saveCardStatus( cardData )
		{
			let
				saveElem = this.findCard(cardData.boardId);

			if ( saveElem !== false )
			{
				if ( this.board.statuses.length == cardData.status )
					saveElem.status = false;
				else
					saveElem.status = cardData.status;

				this.editDescModal(saveElem);
			}
		},
		addCheckList( checkListData )
		{
			let
				card = this.findCard(checkListData.boardId);

			if ( card !== false )
			{
				card.list.push({
					text: checkListData.val,
					status: false
				});

				this.editDescModal(card);
			}
		},
		editDesc( descData )
		{
			let
				desc = this.findCard(descData.boardId);

			if ( desc !== false )
			{
				desc.desc = descData.val;
			}
		},
		editTerm( termData )
		{
			let
				term = this.findCard(termData.boardId);

			if ( term !== false )
			{
				if ( termData.val )
					term.term = termData.val;
				else
					term.term = '';

				this.editDescModal(term);
			}				
		},
		editCol( idxOrVal )
		{
			if ( idxOrVal.constructor.name === 'Number' )
			{
				this.curColEditIdx = idxOrVal;

				this.openInpModal({
					val: this.board.cols[idxOrVal].title,
					target: 'editCol',
					title: 'Переименование колонки',
					label: 'Введите название'
				});

				return;
			}

			this.board.cols[this.curColEditIdx].title = idxOrVal;
		},
		addCard ( idxOrVal )
		{
			if ( idxOrVal.constructor.name === 'Number' )
			{
				this.curColEditIdx = idxOrVal;

				this.openInpModal({
					target: 'addCard',
					title: 'Новая карточка',
					label: this.board.cols[idxOrVal].title
				});

				return;
			}

			this.board.cols[this.curColEditIdx].cards.push({
				boardId: ++curId,
				title: idxOrVal,
				desc: '',
				list: [],
				term: '',
				status: false
			});
		}
	}
}

</script>

<style>
	
@import url("./assets/css/material-icons.css");

.board-cols { 
	display: flex;
	align-items: flex-start;
	padding: 10px;
}

.board-cols-wrapper { 
	max-width: 100%;
	overflow: auto;
}

@media screen and (max-width: 480px) {

	.board-cols {
		flex-direction: column;
		align-items: center;
		padding: 10px 0;
	}

}

</style>