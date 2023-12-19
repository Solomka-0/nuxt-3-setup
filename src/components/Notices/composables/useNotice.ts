import type {ReactiveVariable} from "vue/macros";

export const useNotice = () => reactive(new NoticeQueue())

export class Notice {
    static count = 0
    public message: string
    public state: boolean = true
    public index: number

    private timer: NodeJS.Timeout | undefined
    static timeout = 4000

    constructor(message: string) {
        this.message = message
        this.index = Notice.count++
        this.reset()
    }

    public stop() {
        clearTimeout(this.timer)
    }

    public reset() {
        if (!!this.timer) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
            this.state = false;
            (new NoticeQueue()).update()
        }, Notice.timeout)
    }
}

class NoticeQueue {
    static insistence: NoticeQueue | null = null
    private render = ref(true)

    public queue: Array<Notice> = reactive([])

    constructor() {
        if (NoticeQueue.insistence == null) {
            NoticeQueue.insistence = this
            return NoticeQueue.insistence
        }
        return NoticeQueue.insistence
    }

    public call(message: string) {
        this.queue.push(new Notice(message))
    }

    public update() {
        this.render.value = !this.render.value
    }

    public drop(index: number) {
        this.queue = this.queue.filter((item) => item.index != index)
    }
}