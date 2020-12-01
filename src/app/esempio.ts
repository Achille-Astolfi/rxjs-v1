type Esempio = {
    [key: number]: string | number
}

type Esempio2 = {
    qualcosa?: string,
    stessaCosa: string | undefined
}

type IndexResponse = {
    "_links": {
        [_link: string] : {
            "href": string
        }
    }
}
