<template>
	<div class="modal-wrapper"
		:class="{ 'active': isActive }"
	>
		<div class="modal-inner">
			<div class="modal-content">

				<div class="modal-head">
					<div>
						<p class="md-headline">{{ desc.title }}</p>
						<p class="md-subheading">в "{{ desc.parent }}"</p>
					</div>
					<div class="btns-ver">
						<md-button class="md-icon-button"
							@click="closeDescModal"
						>
							<md-icon>close</md-icon>
						</md-button>	
						<md-button class="md-icon-button md-accent"
							@click="delCard"
						>
							<md-icon>delete</md-icon>
						</md-button>					
					</div>
				</div>		
				
				<div class="inp target-parent">
					
					<div class="modal-row subhead">
						<md-icon>alarm</md-icon>
						<p class="md-title">Срок</p>
					</div>
					
					<div class="modal-row inp">
						<div class="modal-row badge">
							<time class="main"
								:class="{
									'empty': desc.term == ''
								}"
							>{{ desc.term }}</time>
							<p
								:class="termDateClass()"
							></p>
							<div class="target-btn"
								@click="toggleTarget"
							></div>
						</div>
					</div>

					<div class="inp no-m edit-inner">
						<md-datepicker
							v-model="term"
							:md-open-on-focus="false"
						>
							<label>Дата окончания(дд.мм.гггг)</label>
						</md-datepicker>
						<div class="btns left">
							<md-button class="md-raised targeted-btn"
								@click="editTerm"
							>Сохранить</md-button>
							<md-button class="md-icon-button md-accent targeted-btn"
								@click="toggleTarget"
							>
								<md-icon>close</md-icon>
							</md-button>
						</div>
					</div>

				</div>

				<div class="inp target-parent">
					
					<div class="modal-row subhead">
						<md-icon>subject</md-icon>
						<p class="md-title">Описание</p>
					</div>

					<div class="inp no-m">
						<md-field class="no-p">
							<md-textarea class="target-btn" placeholder="Добавить описание"								
								v-model.trim="descVal"
								@focus="toggleTarget"
							></md-textarea>
						</md-field>
					</div>

					<div class="inp no-m edit-inner">
						<div class="btns left">
							<md-button class="md-raised targeted-btn"
								@click="editDesc"
							>Сохранить</md-button>
							<md-button class="md-icon-button md-accent targeted-btn"
								@click="toggleTarget"
							>
								<md-icon>close</md-icon>
							</md-button>
						</div>
					</div>

				</div>

				<div class="inp target-parent">
					
					<div class="modal-row subhead">
						<md-icon>assignment_turned_in</md-icon>
						<div class="modal-row badge">
							<p class="md-title">Статус</p>
							<p class="sub"
								v-if="desc.status !== false"
								:style="{
									backgroundColor: statuses[desc.status].bg,
									color: statuses[desc.status].color
								}"
							>{{ statuses[desc.status].text }}</p>
						</div>
					</div>

					<div class="inp no-m edit-inner">

						<div class="modal-row radio-list">

							<label class="radio-item">
								<md-radio class="md-primary"
									v-model="stats"
									:value="statuses.length"
								></md-radio>
								<div class="label-text">
									<span class="text">Нет статуса</span>
									<div class="line"></div>
								</div>
							</label>

							<label class="radio-item"
								v-for="(status, idx) in statuses"
								:key="idx"
							>
								<md-radio class="md-primary"
									v-model="stats"
									:value="idx"
								></md-radio>
								<div class="label-text">
									<span class="text">{{ status.text }}</span>
									<div class="line"
										:style="{
											backgroundColor: status.bg
										}"
									></div>
								</div>
							</label>

						</div>
						
						<div class="btns left">
							<md-button class="md-raised targeted-btn"
								@click="saveStatus"
							>Сохранить</md-button>
							<md-button class="md-icon-button md-accent targeted-btn"
								@click="toggleTarget"
							>
								<md-icon>close</md-icon>
							</md-button>
						</div>

					</div>

					<md-button class="md-primary target-btn"
						@click="toggleTarget"
					>Изменить</md-button>

				</div>

				<div class="inp target-parent">
					
					<div class="modal-row subhead">
						<md-icon>done_all</md-icon>
						<p class="md-title">Чек-лист</p>
					</div>

					<div class="modal-row inp no-m"
						v-if="desc.list.length > 0"
					>
						<div class="percent">{{ listAmount }}%</div>
						<md-progress-bar md-mode="determinate"
							:md-value="listAmount"
						></md-progress-bar>
					</div>

					<div class="inp no-m"
						v-if="desc.list.length > 0"
					>

						<div class="list-item modal-row"
							v-for="(item, idx) in desc.list"
							:key="idx"
						>

							<div class="modal-row">
								<md-checkbox class="md-primary"
									v-model="item.status"
								>
									<p class="text"
										:class="{
											'checked': item.status
										}"
									>{{ item.text }}</p>
								</md-checkbox>								
							</div>

							<md-button class="md-icon-button md-primary"
								@click="delListItem(idx)"
							>
								<md-icon>close</md-icon>
							</md-button>

						</div>

					</div>

					<div class="inp no-m edit-inner">

						<md-field
							:class="{
								'md-invalid': invalidListText
							}"
						>
							<label>Текст</label>
							<md-input								
								v-model.trim="checkListText"
							></md-input>
							<span class="md-error">Заполните поле</span>
						</md-field>
						
						<div class="btns left mt-2">
							<md-button class="md-raised"
								@click="addCheckList"
							>Добавить</md-button>
							<md-button class="md-icon-button md-accent targeted-btn"
								@click="toggleTarget"
							>
								<md-icon>close</md-icon>
							</md-button>
						</div>

					</div>

					<md-button class="md-primary target-btn"
						@click="toggleTarget"
					>Добавить</md-button>

				</div>

			</div>
		</div>
	</div>
</template>

<script>
	
export default {
	name: 'CardDescModal',
	props: {
		isActive: Boolean,
		desc: Object,
		statuses: Array
	},
	data()
	{
		return {
			stats: this.desc.status,
			term: this.dateFormat(),
			checkListText: '',
			invalidListText: false,
			descVal: '',
			firstDesc: ''
		}
	},
	methods: {
		closeDescModal()
		{
			this.$emit('close-desc-modal');
		},
		delListItem( idx )
		{
			this.$emit('del-list-item', [this.desc.boardId, idx]);
		},
		delCard()
		{
			this.resetToggle();

			this.$emit('del-card', this.desc.boardId);
		},
		addCheckList()
		{
			if ( this.checkListText != '' )
			{
				if ( this.invalidListText )
					this.invalidListText = false;

				this.$emit('add-check-list', {
					boardId: this.desc.boardId,
					val: this.checkListText
				});

				this.checkListText = '';
			}
			else
				this.invalidListText = true;
		},
		editDesc(e)
		{
			if ( this.descVal != this.firstDesc )
			{
				this.$emit('edit-desc', {
					boardId: this.desc.boardId,
					val: this.descVal
				});

				this.firstDesc = this.descVal;

				this.toggleTarget(e);
			}
		},
		editTerm(e)
		{
			this.$emit('edit-term', {
				boardId: this.desc.boardId,
				val: this.term
			});

			this.toggleTarget(e);
		},
		dateFormat()
		{
			let
				curDate = new Date(),
				curDay  = curDate.getDate(),
				curMon  = curDate.getMonth() + 1,
				curYear = curDate.getFullYear(),
				dateStr = '';

			if ( curDay < 10 )
				curDay = '0' + curDay;

			if ( curMon < 10 )
				curMon = '0' + curMon;

			dateStr += curDay + '.' + curMon + '.' + curYear;

			return dateStr;
		},
		toggleTarget(e)
		{
			let
				targetElem = e.path.find(elem => {
					if ( elem instanceof HTMLElement )
						return elem.classList.contains('target-btn') ? true : false;
				}),
				targetedEl = e.path.find(elem => {
					if ( elem instanceof HTMLElement )
						return elem.classList.contains('targeted-btn') ? true : false;
				}),
				parentElem = e.target.closest('.target-parent');

			if ( targetElem )
			{
				targetElem.classList.add('off');

				parentElem.querySelector('.edit-inner')
					.classList.add('active');
			}
			else if ( targetedEl )
			{
				targetedEl.closest('.edit-inner')
					.classList.remove('active');

				parentElem.querySelector('.target-btn')
					.classList.remove('off');
			}
		},
		saveStatus(e)
		{
			this.$emit('save-card-status', {
				boardId: this.desc.boardId,
				status: this.stats
			});

			this.toggleTarget(e);
		},
		resetToggle()
		{
			this.stats = this.desc.status;

			this.removeSelClass('.edit-inner', 'active');
			this.removeSelClass('.target-btn', 'off');
		},
		removeSelClass( sel, className )
		{
			this.$el.querySelectorAll(sel)
				.forEach(elem => {
					if ( elem.classList.contains(className) )
						elem.classList.remove(className)
				});
		},
		termDateClass()
		{
			if ( this.desc.status == 2 )
				return 'sub done';

			if ( this.desc.term )
			{
				let
					arrDate = this.desc.term.split('.'),
					curTime = Date.parse(new Date()),
					comTime = null,
					difTime = 0;

				if ( arrDate[0][0] == '0' )
					arrDate[0] = '0' + (+arrDate[0][1] - 1).toString();
				else
					arrDate[0] = (+arrDate[0] - 1).toString();

				comTime = Date.parse(new Date(arrDate[2]+ '-' + arrDate[1] + '-' + arrDate[0] + 'T23:59:59'));

				difTime = comTime - curTime;

				if ( difTime >= 0 )
				{
					difTime /= 3600000;

					if ( difTime <= 24 )
						return 'sub will-expire';

					return '';
				}
				
				return 'sub expired';
			}

			return '';
		}
	},
	watch: {
		isActive( val )
		{
			if ( val )
				this.resetToggle();

			this.descVal = this.desc.desc;
			this.firstDesc = this.desc.desc;

			this.term = this.desc.term || this.dateFormat();
		},
		stats( val )
		{
			if ( val === false )
				this.stats = this.statuses.length;
		}
	},
	computed: {
		listAmount()
		{
			let
				count  = this.desc.list.reduce((sum, item) => item.status ? ++sum : sum, 0),
				amount = Math.round(count * 100 / this.desc.list.length);
			
			return amount;
		}
	}
}

</script>

<style scoped>
	
@import url("../../assets/css/input-modal.css");
@import url("../../assets/css/card-desc-modal.css");

.modal-wrapper .modal-content {
	width: 600px;
}

.modal-wrapper .modal-inner {
	align-items: flex-start;
}

.modal-wrapper .modal-content {
	margin: 50px 0;
}

.modal-wrapper .md-headline {
	white-space: normal;
	word-break: break-all;
}

.modal-wrapper .md-subheading {
	word-break: break-all;
}

.btns-ver {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.btns-ver .md-button {
	margin: 0 6px;
}

</style>

<style>
	
.md-checkbox .md-checkbox-label {
	padding-left: 0!important;
	position: static!important;
}

</style>