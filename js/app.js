import BanksInit from './components/BanksInit.js';
import DistributionJam from './components/DistributionJam.js';
import ShowResult from './components/ShowResult.js';

Vue.use(VueToast);

const app = {
    components: {
        BanksInit,
        DistributionJam,
        ShowResult
    },
    
    data: {
        steps: {
            1: 'BanksInit',
            2: 'DistributionJam',
            3: 'ShowResult'
        }, 
        step: 1,
        banks: [],
        pots: {
            strawberry: {
                name: 'Клубничное',
                volume: ''
            },
            cherry: {
                name: 'Вишневое',
                volume: ''
            },
            apricot: {
                name: 'Абрикосовое',
                volume: ''
            }
        },
    },
    
    methods: {
        nextStep() {
            if (this.step !== 3) {
                this.step++;
            }
        },
        
        backStep() {
            if (this.step !== 1) {
                this.step--; 
            }
        },
        
        addEmptyBank(bank) {
            this.banks.push(bank);
        },
        
        removeEmptyBank() {
            this.banks.splice(this.banks.length - 1);
        },

        changePot({type, volume}) {
            this.pots[type].volume = parseInt(volume)
        },

        /**
         * Сохранить результат распределения
         * @param pots
         * @param banks
         */
        saveResult({pots, banks}) {
            for (const type in pots) {
                this.pots[type].residual = pots[type].volume
            }
            
            for (const ind in banks) {
                this.banks[ind].inside = banks[ind].inside;
                this.banks[ind].jam = banks[ind].jam;
            }
        }
    }
};


new Vue(app).$mount('#app');