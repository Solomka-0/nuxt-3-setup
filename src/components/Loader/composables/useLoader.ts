export const useLoader = () => reactive(new Loader())

class Loader {
    static insistence: Loader | null = null
    public state = false

    constructor() {
        if (Loader.insistence == null) {
            Loader.insistence = this
            return Loader.insistence
        }
        return Loader.insistence
    }

    public setState(state?: boolean) {
        this.state = !!state
    }
}