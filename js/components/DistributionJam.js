import stepMixin from "./stepMixin.js";

const DistributionJam = {
    template:
        '<div class="container">' +
            '<div class="row justify-content-md-center">' +
                '<p class="text-center fs-3">' +
                    'Укажите объем готового варенья' +
                '</p>' +
                '<div class="col-sm-auto">' +
                    '<div ' +
                        'v-for="(pot, type) in pots" ' +
                        'class="mb-3"' +
                    '>' +
                        '<label ' +
                            ':for="type"' +
                            'class="form-label text-center"' +
                        '>' +
                            '{{pot.name}} варенье' +
                        '</label>' +
                        '<input ' +
                            '@change="changePot(type, $event)"' +
                            'type="number"' +
                            'class="form-control"' +
                            ':id="type"' +
                            'placeholder="2500"' +
                        '>' +
                    '</div>'+
                '</div>' +
            '</div>' +
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
                    '<div class="p-2 bd-highlight">' +
                        '<button ' +
                            '@click="next"' +
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
    
    methods: {
        /**
         * Изменить кол-во варенья в кастрюле
         * @param type
         * @param e
         */
        changePot(type, e) {
            this.$emit('changed-pot', {
                type: type,
                volume: e.target.value
            })
        },
        
        next() {
            if (this.checkPots(this.pots)) {
                this.distributeJam(); 
            } else {
                this.errorInput();
            }
        },

        /**
         * Распределить варенье по банкам
         */
        distributeJam() {
            let pots = this.cloneObj(this.pots);
            let banks = this.cloneObj(this.banks);
            this.distributeForBanks(banks, pots, (ind, type) => {
                return banks[ind].volume <= pots[type].volume;
            })
            if (this.checkFreeBanks(banks) && this.checkPots(pots)) {
                this.distributeForBanks(banks, pots, (ind, type) => {
                    return banks[ind].volume >= pots[type].volume;
                }, false)
            }
            this.$emit('result-distribute', {
                pots: pots,
                banks: banks
            })
            this.nextStep()
        },

        /**
         * Распределить варенье по банкам согласно условию
         * @param banks 
         * @param pots
         * @param condition
         * @param reverse
         */
        distributeForBanks(banks, pots, condition, reverse = true) {
            for (const type in pots) {
                for (const ind in banks) {
                    if (pots[type].volume > 0) {
                        if (banks[ind].volume > 0 && !banks[ind].hasOwnProperty('jam') && condition(ind, type)) {
                            const volume = condition(ind, type) && reverse ? banks[ind].volume : pots[type].volume;
                            
                            banks[ind].jam = type;
                            banks[ind].inside = volume;
                            banks[ind].volume -= volume;
                            pots[type].volume -= volume;
                        }
                    }
                }
            }
        },

        /**
         * Есть ли свободные банки
         * @param banks
         * @returns {boolean}
         */
        checkFreeBanks(banks) {
            for (const ind in banks) {
                if (banks[ind].volume > 0) {
                    return true;
                }
            }
            return false;
        },

        /**
         * Есть ли варенье хотя бы в 1 кастрюле
         * @param pots
         * @returns {boolean}
         */
        checkPots(pots) {
            for (const ind in pots) {
                if (pots[ind].hasOwnProperty('volume') && pots[ind].volume) {
                    return true;
                }
            }
            return false;
        },
        
        cloneObj(obj) {
            return JSON.parse(JSON.stringify(obj))
        }
    }
};

export default DistributionJam;