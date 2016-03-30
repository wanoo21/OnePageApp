interface App {
    name: string,
    price: number
}

function Name(a: App[]) {
    return a.splice(0)
}