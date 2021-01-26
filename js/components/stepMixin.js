const mixin = {
    props: {
        banks: {
            type: Array,
            default: () => []
        },
        pots: {
            type: Object,
            default: () => {}
        }
    },
    
    methods: {
        nextStep() {
            this.$emit('next-step')
        },

        backStep() {
            this.$emit('back-step')
        },
        
        errorInput() {
            this.$toast.error('Заполните все поля', {
                position: 'bottom'
            });
        }
    }
}

export default mixin