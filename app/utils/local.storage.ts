export interface PersistanceService {
    getItem(item: string): any
    setItem(item: string, value: any): void
    removeItem(item: string): void
    persistState(authToken: string): void
    getSavedState(): string
    clearSavedState(): void
}

export class LocalStoragePersistanceService implements PersistanceService {
    private STATE_KEY: string = 'state'
    public getItem(item: string): any {
        const value = window.localStorage.getItem(item)
        if (!value) {
            return null
        }
        return JSON.parse(value)
    }

    public setItem(item: string, value: any): void {
        window.localStorage.setItem(item, JSON.stringify(value))
    }

    public removeItem(item: string): void {
        window.localStorage.removeItem(item)
    }

    public persistState(authToken: string): void {
        window.localStorage.setItem(
            this.STATE_KEY, authToken
        )
    }

    public getSavedState() {
        const value =  window.localStorage.getItem(this.STATE_KEY)
        if (!value) {
            return ""
        }
        return value
    }

    public clearSavedState() {
        return this.removeItem(this.STATE_KEY)
    }
}
