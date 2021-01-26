import stepMixin from './stepMixin.js';

const BanksInit = {
    template: 
        '<div class="container">' +
            '<div class="row justify-content-md-center">' +
                '<p class="text-center fs-3">' +
                    'Введите пустые банки' +
                '</p>' +
                '<div class="col-sm-auto">' +
                    '<div class="mb-3">' +
                        '<label ' +
                            'for="number"' +
                            'class="form-label text-center"' +
                        '>' +
                            'Номер банки' +
                        '</label>' +
                        '<input ' +
                            'type="text"' +
                            'v-model="number"' +
                            'class="form-control"' +
                            'id="number"' +
                            'placeholder="N123"' +
                        '>' +
                        '<label ' +
                            'for="volume"' +
                            'class="form-label text-center"' +
                        '>' +
                            'Объем банки в мл' +
                        '</label>' +
                        '<input ' +
                            'type="number"' +
                            'v-model="volume"' +
                            'class="form-control"' +
                            'id="volume"' +
                            'placeholder="500"' +
                        '>' +
                    '</div>'+
                '</div>' +
                '<div ' +
                    'v-if="show" ' +
                    'class="col-sm-4"' +
                '>' +
                    '<div v-for="(bank, ind) in banks"' +
                        ':key="ind"' +
                        'class="row"' +
                    '>' +
                        '<div class="col text-center">{{ind+1}}</div>' +
                        '<div class="col">Номер: {{bank.number}}</div>' +
                        '<div class="col">Объем: {{bank.volume}}мл</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="row">' +
                '<div class="d-flex bd-highlight mb-3">' +
                    '<div class="me-auto p-2 bd-highlight">' +
                            '<button ' +
                                'v-if="show"' +
                                '@click="removeBank"' +
                                'type="button"' +
                                'class="btn btn-danger"' +
                            '>' +
                                'Удалить банку' +
                            '</button>' +
                    '</div>' +
                    '<div class="p-2 bd-highlight">' +
                        '<button ' +
                            '@click="addBank"' +
                            'type="button"' +
                            'class="btn btn-primary"' +
                        '>' +
                            'Добавить банку' +
                        '</button>' +
                    '</div>' +
                    '<div class="p-2 bd-highlight">' +
                    '<button ' +
                        'v-if="show"' +
                        '@click="nextStep"' +
                        'type="button"' +
                        'class="btn btn-success"' +
                    '>' +
                        'Готово' +
                    '</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>',
    
    mixins: [
        stepMixin
    ],
    
    data() {
        return {
            number: '',
            volume: ''
        }
    },
    
    computed: {
        show() {
            return !!this.banks.length;
        },

        /**
         * Проверка инпутов для ввода данных о банке
         * @returns {boolean}
         */
        checkInput() {
            return this.number.trim() !== '' && this.volume.trim() !== '';
        }
    },
    
    methods: {
        /**
         * Добавляем новую банку к списку банок
         */
        addBank() {
            if (this.checkInput) {
                this.$emit('added-bank', {
                    number: this.number,
                    volume: parseInt(this.volume)
                });
                
                this.number = '';
                this.volume = '';
                document.getElementById('number').focus();
            } else {
                this.errorInput()
            }
        },

        removeBank() {
            this.$emit('removed-bank');
        }
    }
};

export default BanksInit;