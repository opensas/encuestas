const normalizeSort = (order: any) : any => {
    // used for order of fields of foreign tables
    // example: orderBy = {"event.name": "desc"} => orderBy = {"event": {"name": "desc"}}

    if (!order)
        return order

    let field = Object.getOwnPropertyNames(order)[0]
    let parsed = field.split(".")

    if (parsed.length < 1)
        return order

    const { [field]: value } = order;

    let lastField = parsed[parsed.length - 1]
    let o: any = {}
    o[lastField] = value

    for (let i = parsed.length - 2; i === 0; i--) {
        let p = {...o}
        o = {}
        o[parsed[i]] = {...p}
    }

    return o
}

const normalizeWhere = (filter: any) : any => {
    // used for where of fields of foreign tables
    // example: where = {"event.name": "RACE"} => where = {"event": {"name": "RACE"}}

    if (!filter)
        return filter

    return normalizeFilter(filter)

}


const normalizeFilterStr = (field: string, value: any) : any => {
    let parsed = field.split(".")
    let c: any = {}

    if (parsed.length <= 1) 
        return { [field]: value }

    let lastField = parsed[parsed.length - 1]

    c[lastField] = value

    for (let i = parsed.length - 2; i === 0; i--) {
        let p = {...c}
        c = {}
        c[parsed[i]] = {...p}
    }

    return c
}

const normalizeFilter = (filter: any) => {
    let props = Object.getOwnPropertyNames(filter)
    let f : any

    if (typeof filter === "string" || typeof filter === "number")
        return filter

    if (Array.isArray(filter)) {
        f = []
        for (let i = 0; i < filter.length ; i++) {
            f[i] = normalizeFilter(filter[i])
        }

    } else {
        f = {}
        for (let i = 0; i < props.length ; i++) {
            let propName: string = props[i].toString()
            let value: any = filter[propName]

            if (propName.includes("."))
                f = {...f, ...normalizeFilterStr(propName, value)}
            else
                f[propName] = normalizeFilter(value)
            
        }
    }

    return f
}


export const helperQuery = { normalizeSort, normalizeWhere }