import stepMixin from './stepMixin.js';

const ShowResult = {
    template: 
        '<div class="container">' +
            '<p class="text-center fs-3">' +
                'Распределенное варенье по банкам' +
            '</p>' +
            '<table class="table">' +
                '<thead>' +
                    '<tr>' +
                        '<th scope="col">#</th>' +
                        '<th scope="col">Номер банки</th>' +
                        '<th scope="col">Объем банки в мл</th>' +
                        '<th scope="col">Варенье</th>' +
                        '<th scope="col">Объем варенья</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    '<tr v-for="(bank, ind) in banks">' +
                        '<th scope="row">{{ ind+1 }}</th>' +
                        '<td>{{ bank.number }}</td>' +
                        '<td>{{ bank.volume }}</td>' +
                        '<td>{{ pots[bank.jam].name }}</td>' +
                        '<td>{{ bank.inside }}</td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>' +
            '<div class="row">' +
                '<div class="d-flex bd-highlight mb-3">' +
                    '<div class="me-auto p-2 bd-highlight">' +
                        '<button ' +
                            '@click="backStep"' +
                            'type="button"' +
                            'class="btn btn-warning"' +
                        '>' +
                            'Назад' +
                        '</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>',

    mixins: [
        stepMixin
    ],
};

export default ShowResult;